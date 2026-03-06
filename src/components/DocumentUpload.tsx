"use client";

import { DeleteIcon, DownloadIcon, EyeIcon, UploadSimpleIcon } from "@/assets";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { convertMediaUrl } from "@/utils/Constant";
import { isEmpty } from "@/utils/helper";
import { Tooltip } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";
import useDownloader from "react-use-downloader";
import { showToast } from "src/utils/helper";

const LabelField = dynamic(() => import("@/components/LabelField"), {
  ssr: false,
});

function setDeep<T>(obj: Record<string, any>, path: string, value: T): void {
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Target must be a non-null object");
  }

  if (typeof path !== "string") {
    throw new Error("Path must be a string");
  }

  const keys = path.split(".");
  let current: Record<string, any> = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key] || typeof current[key] !== "object") {
        current[key] = {};
      }
      current = current[key];
    }
  }
}

const DocumentUplaod = ({ onSelect, isViewOnly = false, doc_path = "", required = false }) => {
  const dispatch = useAppDispatch();
  const { download } = useDownloader();
  const vendorDocRef = useRef(null);
  // const [disabledOptions, setDisabledOptions] = useState([]);
  const [fileObj, setFileObj] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isEmpty(doc_path)) {
      setFileObj({
        name: doc_path?.split("/").pop(),
        type: "application/pdf",
        doc_path,
      });
    }
  }, [doc_path]);

  const selectFile = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      if (e.target.files[0].size <= 1024 * 1024 * 5) {
        setFileObj(e.target.files[0]);
        onSelect("doc_path", e.target.files[0]);
        setErrors((prevState) => {
          const newState = { ...prevState };
          setDeep(newState, "file", "");
          return newState;
        });
      } else {
        showToast("error", "File size can not exceed 5 MB");
      }
    }
  };

  return (
    <>
      <div className="mt-1 flex w-full flex-col gap-2 sm:mt-3">
        {isEmpty(fileObj) ? (
          !isViewOnly ? (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="document-upload" className="text-14-600 text-primary-600">
                Select File {required && <span className="text-xl text-red-500">*</span>}
              </label>
              <div
                className={`flex relative w-full gap-2.5 rounded-xl bg-primary-200 p-2.5 text-[14px] font-semibold text-primary-500 placeholder:text-[14px] placeholder:font-medium placeholder:leading-[24px] sm:p-4`}
              >
                <input className="w-full bg-inherit placeholder:text-[14px]" placeholder="Select File" value={fileObj?.name || ""} readOnly />
                <UploadSimpleIcon className="h-4 w-4" />
                <div>
                  <input
                    type="file"
                    name="file"
                    className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                    accept=".pdf*"
                    onChange={selectFile}
                  />
                </div>
              </div>
            </div>
          ) : null
        ) : (
          <div className="overflow-x-auto">
            <LabelField labelText="Document Uploaded" toolTipText="Document Uploaded" />
            <div className="max-h-[350px] w-full overflow-y-auto md:max-h-[500px]">
              <table className="w-full table-auto text-[14px] text-black-100" id="booking-table">
                <tbody className="divide-netral-20 divide-y pt-4 text-sm">
                  <tr>
                    <td className="whitespace-nowrap py-4">
                      <span className="text-14-600 w-full text-wrap text-primary-500">{fileObj?.name}</span>
                    </td>
                    <td className="mt-4 flex items-center justify-end gap-1.5 whitespace-nowrap sm:mt-2.5">
                      <Tooltip title="View" placement="top">
                        <Link href={convertMediaUrl(fileObj?.doc_path)} target="_blank" className="!flex rounded-lg p-1 text-green-300 sm:p-2">
                          <button className="rounded-lg">
                            <EyeIcon className="h-5 w-5" />
                          </button>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Download" placement="top">
                        <button
                          className="rounded-lg p-1 text-blue-300 sm:p-2"
                          onClick={async () => {
                            dispatch(setIsLoading(true));
                            await download(convertMediaUrl(fileObj?.doc_path), fileObj?.doc_path?.split("/")[fileObj?.doc_path?.split("/")?.length - 1]);
                            dispatch(setIsLoading(false));
                          }}
                        >
                          <DownloadIcon className="h-5 w-5" />
                        </button>
                      </Tooltip>
                      {!isViewOnly ? (
                        <Tooltip title="Delete" placement="top">
                          <button
                            className="rounded-lg p-1 text-red-300 sm:p-2"
                            onClick={() => {
                              onSelect("doc_path", "");
                              setFileObj(null);
                            }}
                          >
                            <DeleteIcon className="h-5 w-5" />
                          </button>
                        </Tooltip>
                      ) : null}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(DocumentUplaod);
