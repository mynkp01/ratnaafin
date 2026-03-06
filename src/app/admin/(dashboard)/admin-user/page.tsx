"use client";
import { apiHandler } from "@/api/apiHandler";
import { PlusIcon } from "@/assets";
import CustomInput from "@/components/CustomInput";
import Table from "@/components/Table";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { ROUTES } from "@/utils/Constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

const Page = () => {
  const AdminColumns = [
    { name: "User Name", key: "userName", sort: "userName" },
    { name: "Email", key: "email", sort: "email" },
    { name: "Contact ", key: "contact" },
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
  const [adminData, setAdminData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecordCount, setTotalRecordCount] = useState(0);
  const [sort, setSort] = useState({
    sort_type: "createdAt",
    sort: -1,
  });

  const fetchAdmin = async (currentPage, keyword = "") => {
    try {
      dispatch(setIsLoading(true));
      const query = `sort_type=${sort.sort_type}&sort=${sort.sort}&page=${currentPage}&search=${keyword}`;
      const { data, status } = await apiHandler.admin.list(query);
      if (status === 200 || status === 201) {
        const formattedData = data?.data?.docs;
        setAdminData(formattedData);
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
  const handleView = (adminUser) => {
    window.open(`${ROUTES.admin.adminUser}/option?id=${adminUser._id}&view=1`, "_blank", "noopener,noreferrer");
    // router.push(`${ROUTES.admin.adminUser}/option?id=${adminUser._id}&view=1`);
  };

  const handleUpdate = (adminUser) => {
    window.open(`${ROUTES.admin.adminUser}/option?id=${adminUser._id}`, "_blank", "noopener,noreferrer");
    // router.push(`${ROUTES.admin.adminUser}/option?id=${adminUser._id}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchAdmin(newPage, searchKeys.searchValue);
  };

  const handleSort = (sortObj) => {
    setSort(sortObj);
  };
  const handleReset = () => {
    setSearchKey({
      searchValue: "",
    });
  };

  const handleDeleteUser = async (adminUser) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.admin.delete(adminUser._id);
      if (status === 200 || status === 204) {
        showToast("success", data?.message);
        fetchAdmin(page, searchKeys.searchValue);
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
    fetchAdmin(1, searchKeys.searchValue);
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
        <h1 className="text-xl font-bold">Manage Admin Users</h1>
        <button
          onClick={() => window.open(`${ROUTES.admin.adminUser}/option`, "_blank", "noopener,noreferrer")}
          className="text-15-700 btn-outline-hover flex h-fit w-fit justify-between rounded-xl border border-blue-100 bg-primary-100 px-1 py-1 text-blue-100 sm:px-3 sm:py-2"
        >
          <PlusIcon />
          <span className="text-body-xs ml-2">Add</span>
        </button>
      </div>
      <Table
        columns={AdminColumns}
        data={adminData}
        actions={{
          onUpdate: handleUpdate,
          onView: handleView,
          onDelete: handleDeleteUser,
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
