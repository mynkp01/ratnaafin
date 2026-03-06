"use client";
import { apiHandler } from "@/api/apiHandler";
import { PlusIcon } from "@/assets";
import Table from "@/components/Table";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "src/utils/Constant";
import { showToast } from "src/utils/helper";

const Page = () => {
  const lookupCategoryColumns = [
    { name: "Name", key: "name", sort: "name" },
    { name: "Category Code", key: "category_code", sort: "category_code" },
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
  const [categoryData, setCategoryData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecordCount, setTotalRecordCount] = useState(0);
  const [searchKeys, setSearchKey] = useState({
    searchValue: "",
  });
  const [sort, setSort] = useState({
    sort_type: "name",
    sort: 1,
  });

  useEffect(() => {
    setPage(1);
    fetchCategories(1, searchKeys.searchValue);
  }, [1, sort.sort, sort.sort_type, searchKeys.searchValue]);

  const fetchCategories = async (currentPage, keyword = "") => {
    try {
      dispatch(setIsLoading(true));
      const query = `sort_type=${sort.sort_type}&sort=${sort.sort}&page=${currentPage}&search=${keyword}`;
      const { data, status } = await apiHandler.category.list(query);
      if (status === 200 || status === 201) {
        setCategoryData(data?.data?.data);
        setTotalPages(data?.data?.totalPages || 1);
        setTotalRecordCount(data?.data?.totalRecords);
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

  const handleView = (category) => {
    window.open(`${ROUTES.admin.lookupCategory}/option?id=${category._id}&view=1`, "_blank", "noopener,noreferrer");
  };

  const handleUpdate = (category) => {
    // router.push(`${ROUTES.admin.lookupCategory}/option?id=${category._id}`);
    window.open(`${ROUTES.admin.lookupCategory}/option?id=${category._id}`, "_blank", "noopener,noreferrer");
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchCategories(newPage, searchKeys.searchValue);
  };

  const handleSort = (sortObj) => {
    setSort(sortObj);
  };

  return (
    <div className="border-wh-300 flex flex-col !gap-4 rounded-2xl border bg-white !p-4 md:!p-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Manage Lookup Categories</h1>
        <button
          onClick={() => window.open(`${ROUTES.admin.lookupCategory}/option`, "_blank", "noopener,noreferrer")}
          className="text-15-700 btn-outline-hover flex h-fit w-fit justify-between rounded-xl border border-blue-100 bg-primary-100 px-1 py-1 text-blue-100 sm:px-3 sm:py-2"
        >
          <PlusIcon />
          <span className="text-body-xs ml-2 flex">Add</span>
        </button>
      </div>
      <Table
        columns={lookupCategoryColumns}
        data={categoryData}
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
      />
    </div>
  );
};

export default Page;
