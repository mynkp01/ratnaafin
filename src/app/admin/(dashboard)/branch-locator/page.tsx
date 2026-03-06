"use client";
import { apiHandler } from "@/api/apiHandler";
import { PlusIcon } from "@/assets";
import CustomInput from "@/components/CustomInput";
import FetchDropdown from "@/components/FetchDropdown";
import Table from "@/components/Table";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { ROUTES } from "@/utils/Constant";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

const Page = () => {
  const branchColumns = [
    { name: "Branch Name", key: "branchName", sort: "branchName", tdClassName: "text-wrap" },
    { name: "Phone Number", key: "phoneNumber" },
    { name: "Email", key: "email" },
    { name: "City", key: "city" },
    { name: "State", key: "state" },
    {
      name: "Create Date",
      key: "createdAt",
      sort: "createdAt",
      isDate: true,
      format: "DD/MM/YYYY",
    },
  ];

  const router = useRouter();
  const dispatch = useAppDispatch();
  const limit = 20;
  const [searchKeys, setSearchKey] = useState({
    searchValue: "",
  });
  const [dropDownValues, setDropDownValues] = useState({
    cityId: "",
    stateId: "",
  });
  const [branchLocatorData, setBranchLocatorData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecordCount, setTotalRecordCount] = useState(0);
  const [sort, setSort] = useState({
    sort_type: "createdAt",
    sort: -1,
  });

  const handleFetchDropdownChange = useCallback((name: string, value: any) => {
    setDropDownValues((prev) => ({
      ...prev,
      [name]: value?._id || "",
    }));
  }, []);

  const fetchBranchLocator = async (currentPage, keyword = "") => {
    try {
      dispatch(setIsLoading(true));
      const query = `sort_type=${sort.sort_type}&sort=${sort.sort}&page=${currentPage}&search=${keyword}&stateId=${dropDownValues.stateId}&cityId=${dropDownValues.cityId}`;
      const { data, status } = await apiHandler.branchLocator.list(query);
      if (status === 200 || status === 201) {
        const formattedData = data?.data?.docs;

        setBranchLocatorData(formattedData);
        setTotalPages(data?.data?.totalPages || 1);
        setTotalRecordCount(data?.data?.totalDocs);
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      if (err?.error?.status === 406) {
        showToast("error", err.message);
        return router.back();
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleView = (branchLocator) => {
    window.open(`${ROUTES.admin.branchLocator}/option?id=${branchLocator._id}&view=1`, "_blank", "noopener,noreferrer");
    // router.push(`${ROUTES.admin.branchLocator}/option?id=${branchLocator._id}&view=1`);
  };

  const handleUpdate = (branchLocator) => {
    window.open(`${ROUTES.admin.branchLocator}/option?id=${branchLocator._id}`, "_blank", "noopener,noreferrer");
    // router.push(`${ROUTES.admin.branchLocator}/option?id=${branchLocator._id}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchBranchLocator(newPage, searchKeys.searchValue);
  };

  const handleSort = (sortObj) => {
    setSort(sortObj);
  };
  const handleReset = () => {
    setSearchKey({
      searchValue: "",
    });
    setDropDownValues({
      cityId: "",
      stateId: "",
    });
  };

  const handleDeleteBranchLocator = async (branchLocator) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.branchLocator.delete(branchLocator._id);
      if (status === 200 || status === 204) {
        showToast("success", data?.message);
        fetchBranchLocator(page, searchKeys.searchValue);
      } else {
        showToast("error", data?.message);
      }
    } catch (error) {
      showToast("error", error?.message);
    } finally {
      dispatch(setIsLoading(false));
      // setIsModalOpen(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchBranchLocator(1, searchKeys.searchValue);
  }, [searchKeys.searchValue, sort.sort, sort.sort_type, dropDownValues.stateId, dropDownValues.cityId]);

  const filters = [
    <div key="searchKeys.searchValue" className="w-full sm:w-[30%] md:w-[20%]">
      <CustomInput
        value={searchKeys.searchValue}
        onChange={(e) => setSearchKey((prev) => ({ ...prev, searchValue: e.target.value }))}
        placeholder="Search..."
      />
    </div>,
    <div key="dropDownValues.stateId" className="w-full sm:w-[30%] md:w-[20%]">
      <FetchDropdown
        placeholder="Select state"
        value={dropDownValues.stateId}
        endPoints={apiHandler.state.lookup}
        filterStr="NA"
        func={handleFetchDropdownChange}
        objKey="stateId"
        display="state"
      />
    </div>,
    <div key="dropDownValues.cityId" className="w-full sm:w-[30%] md:w-[20%]">
      <FetchDropdown
        placeholder="Select city"
        value={dropDownValues.cityId}
        endPoints={apiHandler.city.lookup}
        filterStr={`stateId=${dropDownValues.stateId}`}
        func={handleFetchDropdownChange}
        objKey="cityId"
        display="city"
      />
    </div>,
    <button
      key="handleReset"
      className="text-15-700 btn-outline-hover mt-2 flex h-12 px-10  w-full sm:w-fit items-center justify-center rounded-xl border border-blue-100 bg-primary-100 text-blue-100 "
      onClick={handleReset}
    >
      <span className="text-body-xs">Reset</span>
    </button>,
  ];

  return (
    <div className="border-wh-300 flex flex-col !gap-4 rounded-2xl border bg-white !p-4 md:!p-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Manage Branches</h1>
        <button
          onClick={
            () => window.open(`${ROUTES.admin.branchLocator}/option`, "_blank", "noopener,noreferrer")
            // router.push(`${ROUTES.admin.branchLocator}/option`)
          }
          className="text-15-700 btn-outline-hover flex h-fit w-fit justify-between rounded-xl border border-blue-100 bg-primary-100 px-1 py-1 text-blue-100 sm:px-3 sm:py-2"
        >
          <PlusIcon />
          <span className="text-body-xs ml-2">Add</span>
        </button>
      </div>
      <Table
        columns={branchColumns}
        data={branchLocatorData}
        actions={{
          onUpdate: handleUpdate,
          onView: handleView,
          onDelete: handleDeleteBranchLocator,
        }}
        totalPages={totalPages}
        currentPage={page}
        handlePageChange={handlePageChange}
        onSort={handleSort}
        isResultElement={
          totalRecordCount ? (
            <p className="text-xs text-grey-1300 md:text-sm">{`Showing ${page * limit - limit + 1} – ${
              page === totalPages || totalRecordCount <= limit ? totalRecordCount : page * limit
            } of ${totalRecordCount} results`}</p>
          ) : null
        }
        filters={filters}
      />
    </div>
  );
};

export default Page;
