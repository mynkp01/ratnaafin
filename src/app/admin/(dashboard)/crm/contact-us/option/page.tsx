"use client";
import { apiHandler } from "@/api/apiHandler";
import CustomInput from "@/components/CustomInput";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

interface FormData {
  Type: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  mx_State: string;
  mx_City: string;
  Phone: string;
  mx_Pincode: string;
  Description: string;
  submit_time: string;
}

const initialFormData: FormData = {
  Type: "",
  FirstName: "",
  LastName: "",
  EmailAddress: "",
  mx_State: "",
  mx_City: "",
  Phone: "",
  mx_Pincode: "",
  Description: "",
  submit_time: "",
};

const Page = () => {
  const searchParams = useSearchParams();
  const contactUsId = searchParams.get("id");
  const isViewOnly = searchParams.get("view") === "1";
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const fetchApplyForJobDetails = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.wpForm.contactUsGet(contactUsId);

      if (status === 200) {
        const contactUsData = data.data;
        setFormData((prev) => ({
          ...prev,
          Type: contactUsData?.Type || "",
          FirstName: contactUsData?.FirstName || "",
          LastName: contactUsData?.LastName || "",
          EmailAddress: contactUsData?.EmailAddress || "",
          mx_State: contactUsData?.mx_State || "",
          mx_City: contactUsData?.mx_City || "",
          Phone: contactUsData?.Phone || "",
          mx_Pincode: contactUsData?.mx_Pincode || "",
          Description: contactUsData?.Description || "",
          submit_time: contactUsData?.submit_time || "",
        }));
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [contactUsId, dispatch]);

  useEffect(() => {
    if (contactUsId && isViewOnly) {
      fetchApplyForJobDetails();
    } else {
      window.close();
    }
  }, [contactUsId]);

  return (
    <div className="border-wh-300 flex flex-col items-center gap-4 rounded-2xl border bg-white">
      <div className="flex w-full flex-col gap-4 p-4 md:p-6">
        <h1 className="text-xl font-bold">{contactUsId ? (isViewOnly ? "View Contact Us" : "Edit Contact Us") : "Add New Contact Us"}</h1>
        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
          <div className="flex-1">
            <CustomInput label="First Name" name="FirstName" value={formData?.FirstName} disabled={isViewOnly} required />
          </div>
          <div className="flex-1">
            <CustomInput label="Last Name" name="LastName" value={formData?.LastName} disabled={isViewOnly} required />
          </div>
          <div className="flex-1">
            <CustomInput label="Email" name="EmailAddress" value={formData?.EmailAddress} disabled={isViewOnly} required />
          </div>
          <div className="flex-1">
            <CustomInput label="City" name="mx_City" value={formData?.mx_City} disabled={isViewOnly} />
          </div>
          <div className="flex-1">
            <CustomInput label="State" name="mx_State" value={formData?.mx_State} disabled={isViewOnly} />
          </div>
          <div className="flex-1">
            <CustomInput label="Pincode" name="mx_Pincode" value={formData?.mx_Pincode} disabled={isViewOnly} />
          </div>

          <div className="flex-1">
            <CustomInput label="Type" name="Type" value={formData?.Type} disabled={isViewOnly} required />
          </div>

          <div className="flex-1">
            <CustomInput label="Submit Time" name="submit_time" value={formData?.submit_time} disabled={isViewOnly} />
          </div>
        </div>
        <div className="flex-1">
          <CustomInput label="Description" isTextArea name="Description" value={formData?.Description} disabled={isViewOnly} required />
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
