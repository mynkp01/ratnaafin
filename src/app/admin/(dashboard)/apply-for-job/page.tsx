"use client";
import { apiHandler } from "@/api/apiHandler";
import { DownloadIcon, EyeIcon } from "@/assets";
import CustomInput from "@/components/CustomInput";
import FetchDropdown from "@/components/FetchDropdown";
import Table from "@/components/Table";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { convertMediaUrl } from "@/utils/Constant";
import { Tooltip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useDownloader from "react-use-downloader";
import { showToast } from "src/utils/helper";

const Page = () => {
  const applyForJobColumns = [
    { name: "First Name", key: "firstName", sort: "firstName" },
    { name: "Last Name", key: "lastName", sort: "lastName" },
    { name: "Phone", key: "phone", sort: "phone" },
    { name: "Email", key: "email", sort: "email" },
    { name: "Job ", key: "job.title", tdClassName: "text-wrap" },
    {
      name: "Create Date",
      key: "createdAt",
      sort: "createdAt",
      isDate: true,
      format: "DD/MM/YYYY",
    },
  ];
  const { download } = useDownloader();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const limit = 20;
  const [searchKeys, setSearchKey] = useState({
    searchValue: "",
  });
  const [dropDownValues, setDropDownValues] = useState({
    jobTypeId: "",
    cityId: "",
    stateId: "",
  });
  const [applyForJobData, setApplyforJobData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecordCount, setTotalRecordCount] = useState(0);
  const [sort, setSort] = useState({
    sort_type: "createdAt",
    sort: -1,
  });

  const handleFetchDropdownChange = useCallback((name: string, value: unknown) => {
    setDropDownValues((prev) => ({
      ...prev,
      [name]: value?._id || "",
    }));
  }, []);

  const fetchApplyForJob = async (currentPage, keyword = "") => {
    try {
      dispatch(setIsLoading(true));
      const query = `sort_type=${sort.sort_type}&sort=${sort.sort}&page=${currentPage}&search=${keyword}&jobTypeId=${dropDownValues.jobTypeId}`;
      const { data, status } = await apiHandler.ApplyForJob.list(query);
      if (status === 200 || status === 201) {
        const formattedData = data?.data?.docs;

        setApplyforJobData(formattedData);
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
      const query = `sort_type=${sort.sort_type}&sort=${sort.sort}&page=${page}&search=${searchKeys.searchValue}&jobTypeId=${dropDownValues.jobTypeId}`;

      const { data, status } = await apiHandler.ApplyForJob.excel(query);

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
    fetchApplyForJob(newPage, searchKeys.searchValue);
  };

  const handleSort = (sortObj) => {
    setSort(sortObj);
  };
  const handleReset = () => {
    setSearchKey({
      searchValue: "",
    });
    setDropDownValues({
      jobTypeId: "",
      cityId: "",
      stateId: "",
    });
  };

  useEffect(() => {
    setPage(1);
    fetchApplyForJob(1, searchKeys.searchValue);
  }, [searchKeys.searchValue, sort.sort, sort.sort_type, dropDownValues.cityId, dropDownValues.jobTypeId, dropDownValues.stateId]);

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
        placeholder="Select Job"
        value={dropDownValues.jobTypeId}
        endPoints={apiHandler.job.lookup}
        filterStr="NA"
        func={handleFetchDropdownChange}
        objKey="jobTypeId"
        display="title"
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
        <h1 className="text-xl font-bold">Manage Applied Jobs</h1>
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
        columns={applyForJobColumns}
        data={applyForJobData}
        actions={{
          showUpdate: false,
          showView: false,
          showDelete: false,
          customAction: (appliedJobs) => (
            <>
              <Tooltip title="View" placement="top">
                <Link href={convertMediaUrl(appliedJobs?.doc_path)} target="_blank" className="!flex rounded-lg p-1 text-green-300 sm:p-2">
                  <button className="rounded-lg">
                    <EyeIcon className="h-5 w-5" />
                  </button>
                </Link>
              </Tooltip>
            </>
          ),
        }}
        totalPages={totalPages}
        // showActionsColumn={false}
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
