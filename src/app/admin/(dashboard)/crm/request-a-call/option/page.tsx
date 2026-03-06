"use client";
import { apiHandler } from "@/api/apiHandler";
import CustomInput from "@/components/CustomInput";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  submit_time: string;
}

const initialFormData: FormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  message: "",
  submit_time: "",
};

const Page = () => {
  const searchParams = useSearchParams();
  const requestCallId = searchParams.get("id");
  const isViewOnly = searchParams.get("view") === "1";
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const fetchApplyForJobDetails = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.wpForm.requestCallGet(requestCallId);

      if (status === 200) {
        const requestCallData = data.data;
        setFormData((prev) => ({
          ...prev,
          first_name: requestCallData?.first_name || "",
          last_name: requestCallData?.last_name || "",
          email: requestCallData?.email || "",
          phone: requestCallData?.phone || "",
          message: requestCallData?.message || "",
          submit_time: requestCallData?.submit_time || "",
        }));
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [requestCallId, dispatch]);

  useEffect(() => {
    if (requestCallId && isViewOnly) {
      fetchApplyForJobDetails();
    } else {
      window.close();
    }
  }, [requestCallId]);

  return (
    <div className="border-wh-300 flex flex-col items-center gap-4 rounded-2xl border bg-white">
      <div className="flex w-full flex-col gap-4 p-4 md:p-6">
        <h1 className="text-xl font-bold">{requestCallId ? (isViewOnly ? "View Request A Call" : "Edit Request A Call") : "Add New Request A Call"}</h1>
        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-3">
          <div className="flex-1">
            <CustomInput label="First Name" name="first_name" value={formData?.first_name} disabled={isViewOnly} required />
          </div>
          <div className="flex-1">
            <CustomInput label="Last Name" name="last_name" value={formData?.last_name} disabled={isViewOnly} required />
          </div>
          <div className="flex-1">
            <CustomInput label="Email" name="email" placeholder="Enter email" value={formData?.email} disabled={isViewOnly} required />
          </div>
          <div className="flex-1">
            <CustomInput label="Phone" name="phone" value={formData?.phone} disabled={isViewOnly} />
          </div>

          <div className="flex-1">
            <CustomInput label="Submit Time" name="submit_time" value={formData?.submit_time} disabled={isViewOnly} required />
          </div>
        </div>
        <div className="flex-1">
          <CustomInput label="Message" name="message" value={formData?.message} disabled={isViewOnly} isTextArea />
        </div>
      </div>
      <div className="mt-4 flex flex-row gap-4">
        <button
          type="button"
          onClick={() => window.close()}
          className="text-15-700 btn-fill-hover h-fit w-fit mb-2 rounded-xl border-2 border-blue-100 bg-blue-100 p-1.5 text-primary-100 sm:px-3 sm:py-2.5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Page;
