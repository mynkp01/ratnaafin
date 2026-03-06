"use client";
import { DeleteIcon, EditIcon, EyeIcon, SortByIcon } from "@/assets";
import { isEmpty } from "@/utils/helper";
import { Pagination } from "@mui/material";
import moment from "moment";
import dynamic from "next/dynamic";
import { memo, useState } from "react";

const DeleteModal = dynamic(() => import("@/components/DeleteModal"), {
  ssr: false,
});

const getValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : "";
  }, obj);
};

const Table = ({
  columns,
  data,
  actions = {},
  totalPages,
  currentPage,
  handlePageChange,
  onSort,
  filters = [],
  filterClass = "",
  isResultElement = null,
  showActionsColumn = true,
}) => {
  const { showView = true, showUpdate = true, showDelete = true } = actions;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState(null);

  const [sort, setSort] = useState({
    sort_type: columns?.[0]?.sort,
    sort: 1,
  });

  const handleSort = (sort_type: string) => {
    let sortObj = { ...sort };
    if (sort_type === sort.sort_type) {
      sortObj = { sort_type: sort.sort_type, sort: sort.sort === 1 ? -1 : 1 };
    } else {
      sortObj = { sort_type: sort_type, sort: 1 };
    }
    setSort(sortObj);
    if (onSort) onSort(sortObj);
  };

  return (
    <div>
      {!isEmpty(filters) ? (
        <div className={`mb-4 flex w-full grid-cols-12 flex-col items-center justify-end gap-2 sm:flex-row ${filterClass || ""}`}>
          {filters?.map((filter) => filter)}
        </div>
      ) : null}
      <div className="table-container relative max-h-[350px] overflow-y-auto md:max-h-[500px]">
        <table className="w-full table-auto border-separate border-spacing-y-0">
          <thead className="sticky top-0 z-10 bg-primary-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`whitespace-nowrap p-3 text-left font-bold ${isEmpty(column?.sort) ? "cursor-default" : "cursor-pointer"}`}
                  onClick={() => (!isEmpty(column?.sort) ? handleSort(column.sort) : {})}
                >
                  <div className="flex w-full items-center gap-1">
                    {column?.sort ? (
                      <SortByIcon
                        className="h-4"
                        fillUpperArrow={sort.sort === 1 && sort.sort_type === column.sort ? "black" : "#CBD5E0"}
                        fillLowerArrow={sort.sort === -1 && sort.sort_type === column.sort ? "black" : "#CBD5E0"}
                      />
                    ) : null}
                    <span className="font-satoshi-medium select-none text-xs font-bold text-black-100 sm:text-sm">{column.name}</span>
                  </div>
                </th>
              ))}
              {showActionsColumn && actions && (
                <th className="whitespace-nowrap p-3 font-bold">
                  <span className="font-satoshi-medium text-xs font-bold text-black-100 sm:text-sm">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item) => (
                <tr key={item?._id}>
                  {columns.map((column) => {
                    const value = getValue(item, column.key);
                    return (
                      <td key={column.key} className={`whitespace-nowrap p-3 text-left text-wrap ${column?.tdClassName || ""}`}>
                        <span className="font-satoshi-medium text-xs font-medium text-black-100 sm:text-sm">
                          {column?.isDate && moment(value).isValid() ? moment(value).format(column?.format || "YYYY") : value}
                        </span>
                      </td>
                    );
                  })}
                  {showActionsColumn && (actions && typeof actions?.showActions === "function" ? actions?.showActions?.(item) : true) && actions && (
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        {showView ? (
                          <button className="flex items-center justify-center rounded-md p-2 text-green-300" onClick={() => actions.onView(item)}>
                            <EyeIcon className="h-5 w-5" />
                          </button>
                        ) : null}
                        {showUpdate ? (
                          <button className="flex items-center justify-center rounded-md p-2 text-blue-300" onClick={() => actions.onUpdate(item)}>
                            <EditIcon className="h-4 w-4" />
                          </button>
                        ) : null}
                        {showDelete ? (
                          <button
                            className="flex items-center justify-center rounded-md p-2 text-red-300"
                            onClick={() => {
                              setItem(item);
                              setIsModalOpen(true);
                            }}
                          >
                            <DeleteIcon className="h-5 w-5" />
                          </button>
                        ) : null}
                        {actions?.customAction?.(item)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns?.length + (actions ? 1 : 0)} className="p-3 text-center">
                  <span className="font-satoshi-medium text-xs font-medium text-gray-500 sm:text-sm">No data available</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex w-full justify-between text-nowrap">
        {isResultElement}
        <div className="flex w-full justify-end">
          <Pagination shape="rounded" count={totalPages || 1} page={currentPage || 1} onChange={(e, v) => handlePageChange(v)} boundaryCount={2} size="small" />
          {/* <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>

            {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${page === currentPage ? "bg-blue-500 text-white" : ""}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= (totalPages || 1)}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div> */}
        </div>
      </div>
      <DeleteModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        func={() => {
          if (showDelete && showActionsColumn) {
            actions.onDelete(item);
            setIsModalOpen(false);
          }
        }}
      />
    </div>
  );
};

export default memo(Table);
