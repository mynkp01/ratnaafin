"use client";
import { apiHandler } from "@/api/apiHandler";
import { PlusIcon } from "@/assets";
import CustomInput from "@/components/CustomInput";
import FetchDropdown from "@/components/FetchDropdown";
import Table from "@/components/Table";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { LOOKUP_VALUES, ROUTES } from "@/utils/Constant";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

const Page = () => {
  const disclosureColumns = [
    { name: "Title", key: "title", sort: "title", tdClassName: "text-wrap" },
    { name: "Category", key: "categoryId.name", tdClassName: "text-wrap" },
    { name: "Language", key: "languageId.name" },
    {
      name: "Create Date",
      key: "createdAt",
      sort: "createdAt",
      isDate: true,
      format: "DD/MM/YYYY",
    },
    {
      name: "Update Date",
      key: "updatedAt",
      sort: "updatedAt",
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
    categoryId: "",
    languageId: "",
  });
  const [disclosureData, setDisclosureData] = useState([]);
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

  const fetchDisclosure = async (currentPage, keyword = "") => {
    try {
      dispatch(setIsLoading(true));
      const query = `sort_type=${sort.sort_type}&sort=${sort.sort}&page=${currentPage}&search=${keyword}&languageId=${dropDownValues.languageId}&categoryId=${dropDownValues.categoryId}`;
      const { data, status } = await apiHandler.disclosure.list(query);
      if (status === 200 || status === 201) {
        const formattedData = data?.data?.docs;

        setDisclosureData(formattedData);
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

  const handleView = (disclosure) => {
    window.open(`${ROUTES.admin.disclosure}/option?id=${disclosure._id}&view=1`, "_blank", "noopener,noreferrer");

    // router.push(`${ROUTES.admin.disclosure}/option?id=${disclosure._id}&view=1`);
  };

  const handleUpdate = (disclosure) => {
    window.open(`${ROUTES.admin.disclosure}/option?id=${disclosure._id}`, "_blank", "noopener,noreferrer");
    // router.push(`${ROUTES.admin.disclosure}/option?id=${disclosure._id}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchDisclosure(newPage, searchKeys.searchValue);
  };

  const handleSort = (sortObj) => {
    setSort(sortObj);
  };
  const handleReset = () => {
    setSearchKey({
      searchValue: "",
    });
    setDropDownValues({
      categoryId: "",
      languageId: "",
    });
  };

  const handleDelete = async (disclosure) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.disclosure.delete(disclosure._id);
      if (status === 200 || status === 204) {
        showToast("success", data?.message);
        fetchDisclosure(page, searchKeys.searchValue);
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
    fetchDisclosure(1, searchKeys.searchValue);
  }, [searchKeys.searchValue, sort.sort, sort.sort_type, dropDownValues.categoryId, dropDownValues.languageId]);

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
        placeholder="Select Category"
        value={dropDownValues.categoryId}
        endPoints={apiHandler.value.lookup}
        filterStr={`value=${LOOKUP_VALUES.DISCLOSURE}&sort_type=sort_order&sort=1`}
        func={handleFetchDropdownChange}
        objKey="categoryId"
        display="name"
      />
    </div>,
    <div key="dropDownValues.cityId" className="w-full sm:w-[30%] md:w-[20%]">
      <FetchDropdown
        placeholder="Select Language"
        value={dropDownValues.languageId}
        endPoints={apiHandler.value.lookup}
        filterStr={`value=${LOOKUP_VALUES.LANGUAGE}`}
        func={handleFetchDropdownChange}
        objKey="languageId"
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
        <h1 className="text-xl font-bold">Manage Disclosures</h1>
        <button
          onClick={
            () => window.open(`${ROUTES.admin.disclosure}/option`, "_blank", "noopener,noreferrer")
            // router.push(`${ROUTES.admin.disclosure}/option`)
          }
          className="text-15-700 btn-outline-hover flex h-fit w-fit justify-between rounded-xl border border-blue-100 bg-primary-100 px-1 py-1 text-blue-100 sm:px-3 sm:py-2"
        >
          <PlusIcon />
          <span className="text-body-xs ml-2">Add</span>
        </button>
      </div>
      <Table
        columns={disclosureColumns}
        data={disclosureData}
        actions={{
          onUpdate: handleUpdate,
          onView: handleView,
          onDelete: handleDelete,
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
