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
  const blogColumns = [
    { name: "Title", key: "title", sort: "title", tdClassName: "text-wrap" },
    { name: "URL", key: "Url", tdClassName: "text-wrap" },
    { name: "Category", key: "category", tdClassName: "text-wrap" },
    { name: "CreatedBy", key: "user.userName", tdClassName: "text-wrap" },
    {
      name: "Create Date",
      key: "createdAt",
      sort: "createdAt",
      isDate: true,
      format: "DD/MM/YYYY",
      tdClassName: "text-wrap",
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
  });
  const [blogsData, setBlogsData] = useState([]);
  const [page, setPage] = useState(1);
  const [blog, setBlog] = useState<{ _id?: string; status?: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const fetchBlog = async (currentPage, keyword = "") => {
    try {
      dispatch(setIsLoading(true));
      const query = `sort_type=${sort.sort_type}&sort=${sort.sort}&page=${currentPage}&search=${keyword}&categoryId=${dropDownValues.categoryId}`;
      const { data, status } = await apiHandler.blog.list(query);
      if (status === 200 || status === 201) {
        const formattedData = data?.data?.docs?.map((Element) => {
          Element.category = Element.category
            .map((ele) => {
              ele = ele.name;
              return ele;
            })
            .join(", ");

          return Element;
        });

        setBlogsData(formattedData);
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

  const handleView = (blog) => {
    window.open(`${ROUTES.admin.blogs}/option?id=${blog._id}&view=1`, "_blank", "noopener,noreferrer");
    // router.push(`${ROUTES.admin.blog}/option?id=${blog._id}&view=1`);
  };

  const handleUpdate = (blog) => {
    window.open(`${ROUTES.admin.blogs}/option?id=${blog._id}`, "_blank", "noopener,noreferrer");

    // router.push(`${ROUTES.admin.blog}/option?id=${blog._id}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchBlog(newPage, searchKeys.searchValue);
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
    });
  };

  const handleHide = (blog) => {
    setBlog(blog);
    setIsModalOpen(true);
  };

  const handleHideBlog = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.blog.updateStatus(blog._id);
      if (status === 200 || status === 204) {
        showToast("success", data?.message);
        fetchBlog(page, searchKeys.searchValue);
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
  const handleDeleteBlog = async (blogData) => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.blog.delete(blogData._id);
      if (status === 200 || status === 204) {
        showToast("success", data?.message);
        fetchBlog(page, searchKeys.searchValue);
      } else {
        showToast("error", data?.message);
      }
    } catch (error) {
      showToast("error", error?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    setPage(1);
    fetchBlog(1, searchKeys.searchValue);
  }, [searchKeys.searchValue, sort.sort, sort.sort_type, dropDownValues.categoryId]);

  const filters = [
    <div key="searchKeys.searchValue" className="w-full sm:w-[30%] md:w-[20%]">
      <CustomInput
        value={searchKeys.searchValue}
        onChange={(e) => setSearchKey((prev) => ({ ...prev, searchValue: e.target.value }))}
        placeholder="Search..."
      />
    </div>,
    <div key="dropDownValues.categoryId" className="w-full sm:w-[30%] md:w-[20%]">
      <FetchDropdown
        placeholder="Select Category"
        value={dropDownValues.categoryId}
        endPoints={apiHandler.value.lookup}
        filterStr={`value=${LOOKUP_VALUES.BLOGS_CATEGORY}`}
        func={handleFetchDropdownChange}
        objKey="categoryId"
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
        <h1 className="text-xl font-bold">Manage Blogs</h1>
        <button
          onClick={() => window.open(`${ROUTES.admin.blogs}/option`, "_blank", "noopener,noreferrer")}
          className="text-15-700 btn-outline-hover flex h-fit w-fit justify-between rounded-xl border border-blue-100 bg-primary-100 px-1 py-1 text-blue-100 sm:px-3 sm:py-2"
        >
          <PlusIcon />
          <span className="text-body-xs ml-2">Add</span>
        </button>
      </div>
      <Table
        columns={blogColumns}
        data={blogsData}
        actions={{
          onUpdate: handleUpdate,
          onView: handleView,
          onDelete: handleDeleteBlog,
          customAction: (blog) => (
            <>
              <button
                className="flex items-center justify-center rounded-md border bg-gray-200 px-3 py-1 text-sm font-bold text-black transition-all duration-300 hover:!border-gray-400 hover:!bg-primary-100 hover:!text-black"
                onClick={() => handleHide(blog)}
              >
                {blog?.status ? "Hide" : "Unhide"}
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
        heading={`Are you sure want to ${blog?.status ? "hide" : "unhide"} this blog`}
        subHeading={`You can ${blog?.status ? "unhide" : "hide"} it whenever needed`}
        btnTitle={blog?.status ? "Hide" : "Unhide"}
        setOpen={setIsModalOpen}
        func={handleHideBlog}
      />
    </div>
  );
};

export default Page;
