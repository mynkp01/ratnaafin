"use client";
import { apiHandler } from "@/api/apiHandler";
import { PlusIcon } from "@/assets";
import CustomInput from "@/components/CustomInput";
import FetchDropdown from "@/components/FetchDropdown";
import HideModel from "@/components/HideModel";
import Table from "@/components/Table";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { LOOKUP_VALUES, ROUTES } from "@/utils/Constant";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

const Page = () => {
  const JobColumns = [
    { name: "Title", key: "title", sort: "title", tdClassName: "text-wrap" },
    { name: "Experience", key: "experience" },
    { name: "Work Type", key: "workType" },
    { name: "Job Type", key: "jobType" },
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
    jobTypeId: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [job, setJob] = useState<{ _id?: string; status?: boolean }>({});

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

  const fetchJobs = async (currentPage, keyword = "") => {
    try {
      dispatch(setIsLoading(true));
      const query = `sort_type=${sort.sort_type}&sort=${sort.sort}&page=${currentPage}&search=${keyword}&jobTypeId=${dropDownValues.jobTypeId}`;
      const { data, status } = await apiHandler.job.list(query);
      if (status === 200 || status === 201) {
        const formattedData = data?.data?.docs;

        setJobData(formattedData);
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

  const handleView = (job) => {
    window.open(`${ROUTES.admin.job}/option?id=${job._id}&view=1`, "_blank", "noopener,noreferrer");

    // router.push(`${ROUTES.admin.job}/option?id=${job._id}&view=1`);
  };

  const handleUpdate = (job) => {
    window.open(`${ROUTES.admin.job}/option?id=${job._id}`, "_blank", "noopener,noreferrer");

    // router.push(`${ROUTES.admin.job}/option?id=${job._id}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchJobs(newPage, searchKeys.searchValue);
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
    });
  };

  useEffect(() => {
    setPage(1);
    fetchJobs(1, searchKeys.searchValue);
  }, [searchKeys.searchValue, sort.sort, sort.sort_type, dropDownValues.jobTypeId]);

  const handleHide = (job) => {
    setJob(job);
    setIsModalOpen(true);
  };

  const handleHideJob = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.job.updateStatus(job._id);
      if (status === 200 || status === 204) {
        showToast("success", data?.message);
        fetchJobs(page, searchKeys.searchValue);
      } else {
        showToast("error", data?.message);
      }
    } catch (error) {
      showToast("error", error?.message);
    } finally {
      dispatch(setIsLoading(false));
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (job) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.job.delete(job._id);
      if (status === 200 || status === 204) {
        showToast("success", data?.message);
        fetchJobs(page, searchKeys.searchValue);
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
        placeholder="Select job type"
        value={dropDownValues.jobTypeId}
        endPoints={apiHandler.value.lookup}
        filterStr={`value=${LOOKUP_VALUES.JOB_TYPE}`}
        func={handleFetchDropdownChange}
        objKey="jobTypeId"
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
        <h1 className="text-xl font-bold">Manage Job</h1>
        <button
          onClick={
            () => window.open(`${ROUTES.admin.job}/option`, "_blank", "noopener,noreferrer")

            // router.push(`${ROUTES.admin.job}/option`)
          }
          className="text-15-700 btn-outline-hover flex h-fit w-fit justify-between rounded-xl border border-blue-100 bg-primary-100 px-1 py-1 text-blue-100 sm:px-3 sm:py-2"
        >
          <PlusIcon />
          <span className="text-body-xs ml-2">Add</span>
        </button>
      </div>
      <Table
        columns={JobColumns}
        data={jobData}
        actions={{
          onUpdate: handleUpdate,
          onView: handleView,
          onDelete: handleDelete,
          customAction: (job) => (
            <>
              <button
                className="flex items-center justify-center rounded-md border bg-gray-200 px-3 py-1 text-sm font-bold text-black transition-all duration-300 hover:!border-gray-400 hover:!bg-primary-100 hover:!text-black"
                onClick={() => handleHide(job)}
              >
                {job?.status ? "Hide" : "Unhide"}
              </button>
            </>
          ),
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
      <HideModel
        open={isModalOpen}
        heading={`Are you sure want to ${job?.status ? "hide" : "unhide"} this Job`}
        subHeading={`You can ${job?.status ? "unhide" : "hide"} it whenever needed`}
        btnTitle={job?.status ? "Hide" : "Unhide"}
        setOpen={setIsModalOpen}
        func={handleHideJob}
      />
    </div>
  );
};

export default Page;
