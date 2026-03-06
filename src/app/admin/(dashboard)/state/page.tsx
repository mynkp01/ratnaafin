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
  const stateColumns = [
    { name: "State", key: "state" },
    { name: "Country", key: "countryId.name" },
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
    countryId: "",
  });
  const [stateData, setStateData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecordCount, setTotalRecordCount] = useState(0);
  const [sort, setSort] = useState({
    sort_type: "state",
    sort: -1,
  });

  const handleFetchDropdownChange = useCallback((name: string, value: unknown) => {
    setDropDownValues((prev) => ({
      ...prev,
      [name]: value?._id || "",
    }));
  }, []);

  const fetchState = async (currentPage, keyword = "") => {
    try {
      dispatch(setIsLoading(true));
      const query = `sort_type=${sort.sort_type}&sort=${sort.sort}&page=${currentPage}&search=${keyword}&countryId=${dropDownValues.countryId}`;
      const { data, status } = await apiHandler.state.list(query);
      if (status === 200 || status === 201) {
        const formattedData = data?.data?.docs;

        setStateData(formattedData);
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

  const handleView = (state) => {
    window.open(`${ROUTES.admin.state}/option?id=${state._id}&view=1`, "_blank", "noopener,noreferrer");

    // router.push(`${ROUTES.admin.state}/option?id=${state._id}&view=1`);
  };

  const handleUpdate = (state) => {
    window.open(`${ROUTES.admin.state}/option?id=${state._id}`, "_blank", "noopener,noreferrer");
    // router.push(`${ROUTES.admin.state}/option?id=${state._id}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchState(newPage, searchKeys.searchValue);
  };

  const handleSort = (sortObj) => {
    setSort(sortObj);
  };
  const handleReset = () => {
    setSearchKey({
      searchValue: "",
    });
    setDropDownValues({
      countryId: "",
    });
  };

  useEffect(() => {
    setPage(1);
    fetchState(1, searchKeys.searchValue);
  }, [searchKeys.searchValue, sort.sort, sort.sort_type, dropDownValues.countryId]);

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
        placeholder="Select country"
        value={dropDownValues.countryId}
        endPoints={apiHandler.country.lookup}
        filterStr="NA"
        func={handleFetchDropdownChange}
        objKey="countryId"
        display="name"
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
        <h1 className="text-xl font-bold">Manage States</h1>
        <button
          onClick={
            () => window.open(`${ROUTES.admin.state}/option`, "_blank", "noopener,noreferrer")

            // router.push(`${ROUTES.admin.state}/option`)
          }
          className="text-15-700 btn-outline-hover flex h-fit w-fit justify-between rounded-xl border border-blue-100 bg-primary-100 px-1 py-1 text-blue-100 sm:px-3 sm:py-2"
        >
          <PlusIcon />
          <span className="text-body-xs ml-2">Add</span>
        </button>
      </div>
      <Table
        columns={stateColumns}
        data={stateData}
        actions={{
          onUpdate: handleUpdate,
          onView: handleView,
          showDelete: false,
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
