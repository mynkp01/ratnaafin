"use client";
import { apiHandler } from "@/api/apiHandler";
import CustomInput from "@/components/CustomInput";
import Table from "@/components/Table";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { ROUTES } from "@/utils/Constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

const nachColumns = [
  { name: "Registered Number", key: "registered_number", sort: "registered_number" },
  { name: "Full Name", key: "full_name", sort: "full_name" },
  { name: "Loan Account Number", key: "loan_account_number", sort: "loan_account_number" },
  {
    name: "Create Date",
    key: "createdAt",
    sort: "createdAt",
    isDate: true,
    format: "DD-MM-YYYY HH:mm:ss",
  },
];
const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const limit = 20;
  const [searchKeys, setSearchKey] = useState({
    search: "",
    searchValue: "",
  });
  const [sort, setSort] = useState({
    sort_type: "registered_number",
    sort: 1,
  });
  const [nachData, setNachData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecordCount, setTotalRecordCount] = useState(0);

  const fetchNach = async (currentPage, keyword = "") => {
    try {
      dispatch(setIsLoading(true));
      const query = `sort_type=${sort.sort_type}&sort=${sort.sort}&page=${currentPage}&search=${keyword}`;
      const { data, status } = await apiHandler.nach.list(query);

      if (status === 200 || status === 201) {
        const formattedData = data?.data?.docs;

        setNachData(formattedData);
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

  const handleView = (nach) => {
    window.open(`${ROUTES.admin.nach}/option?id=${nach._id}&view=1`, "_blank", "noopener,noreferrer");
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchNach(newPage, searchKeys.search);
  };

  const handleSearch = (e) => {
    setSearchKey((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleSort = (sortObj) => {
    setSort(sortObj);
  };

  useEffect(() => {
    setPage(1);
    fetchNach(1, searchKeys.search);
  }, [searchKeys.search, sort.sort, sort.sort_type]);

  const handleReset = () => {
    setSearchKey({
      search: "",
      searchValue: "",
    });
    setSort({
      sort_type: "name",
      sort: 1,
    });
  };

  const filters = [
    <div key="searchKeys.searchValue" className="w-full sm:w-[30%] md:w-[20%]">
      <CustomInput
        value={searchKeys.searchValue}
        onChange={(e) => setSearchKey((prev) => ({ ...prev, searchValue: e.target.value }))}
        onKeyDown={handleSearch}
        onBlur={handleSearch}
        placeholder="Search..."
      />
    </div>,
    <div key="handleReset" className="w-full sm:w-fit">
      <button
        onClick={handleReset}
        className="text-15-700 btn-outline-hover h-fit w-full rounded-xl border border-blue-100 bg-primary-100 px-6 py-2 text-blue-100"
      >
        <span className="text-body-xs">Reset</span>
      </button>
    </div>,
  ];

  return (
    <div className="border-wh-300 flex flex-col !gap-4 rounded-2xl border bg-white !p-4 md:!p-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Manage NACH</h1>
      </div>
      <Table
        columns={nachColumns}
        data={nachData}
        actions={{
          showUpdate: false,
          onView: handleView,
          showDelete: false,
        }}
        totalPages={totalPages}
        currentPage={page}
        handlePageChange={handlePageChange}
        onSort={handleSort}
        filters={filters}
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
