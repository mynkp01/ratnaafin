"use client";
import { apiHandler } from "@/api/apiHandler";
import { DownloadIcon } from "@/assets";
import CustomInput from "@/components/CustomInput";
import Table from "@/components/Table";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { ROUTES } from "@/utils/Constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useDownloader from "react-use-downloader";
import { showToast } from "src/utils/helper";

const Page = () => {
  const requestCallColumns = [
    { name: "First Name", key: "first_name", tdClassName: "text-wrap", sort: "first_name" },
    { name: "Last Name", key: "last_name", tdClassName: "text-wrap", sort: "last_name" },
    { name: "Email", key: "email", sort: "email" },
    { name: "Phone", key: "phone", sort: "phone" },
    { name: "Submit Time", key: "createdAt", isDate: true, format: "DD-MM-YYYY HH:mm:ss", sort: "createdAt" },
  ];

  const { download } = useDownloader();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const limit = 20;
  const [searchKeys, setSearchKey] = useState({
    searchValue: "",
  });
  const [requestCallData, setRequestACallData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecordCount, setTotalRecordCount] = useState(0);
  const [sort, setSort] = useState({
    sort_type: "createdAt",
    sort: -1,
  });

  const fetchApplyForLoan = async (currentPage, keyword = "") => {
    try {
      dispatch(setIsLoading(true));
      const query = `sort_type=${sort.sort_type}&sort=${sort.sort}&page=${currentPage}&search=${keyword}`;
      const { data, status } = await apiHandler.wpForm.requestCallList(query);
      if (status === 200 || status === 201) {
        const formattedData = data?.data?.docs;
        setRequestACallData(formattedData);
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

  const handleExcel = async () => {
    try {
      dispatch(setIsLoading(true));
      const query = `sort_type=${sort.sort_type}&sort=${sort.sort}&page=${page}&search=${searchKeys.searchValue}`;
      const { data, status } = await apiHandler.wpForm.requestCallExcel(query);

      if (status === 200 || status === 201) {
        await download(
          data?.data,

          data?.data?.split("/")[data?.data?.split("/")?.length - 1]
        );
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchApplyForLoan(newPage, searchKeys.searchValue);
  };

  const handleSort = (sortObj) => {
    setSort(sortObj);
  };
  const handleReset = () => {
    setSearchKey({
      searchValue: "",
    });

    setSort({
      sort_type: "createdAt",
      sort: -1,
    });
  };

  const handleView = (requestCall) => {
    window.open(`${ROUTES.admin.requestCall}/option?id=${requestCall._id}&view=1`, "_blank", "noopener,noreferrer");
    // router.push(`${ROUTES.admin.branchLocator}/option?id=${branchLocator._id}&view=1`);
  };

  useEffect(() => {
    setPage(1);
    fetchApplyForLoan(1, searchKeys.searchValue);
  }, [searchKeys.searchValue, sort.sort, sort.sort_type]);

  const filters = [
    <div key="searchKeys.searchValue" className="w-full sm:w-[30%] md:w-[20%]">
      <CustomInput
        value={searchKeys.searchValue}
        onChange={(e) => setSearchKey((prev) => ({ ...prev, searchValue: e.target.value }))}
        placeholder="Search..."
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
        <h1 className="text-xl font-bold">Manage Request A Call Forms</h1>
        <button
          key="handleReset"
          onClick={() => handleExcel()}
          className="text-15-700 btn-outline-hover flex h-fit w-fit justify-between rounded-xl border border-green-300 bg-green-50 px-1 py-1 text-green-300 sm:px-3 sm:py-2"
        >
          <DownloadIcon className={"h-6 w-6"} />
          <span className="text-body-xs ml-2">Export</span>
        </button>
      </div>
      <Table
        columns={requestCallColumns}
        data={requestCallData}
        totalPages={totalPages}
        currentPage={page}
        actions={{
          showUpdate: false,
          onView: handleView,
          showDelete: false,
        }}
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
