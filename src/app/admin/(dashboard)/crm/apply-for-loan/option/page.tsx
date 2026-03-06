"use client";
import { apiHandler } from "@/api/apiHandler";
import CustomInput from "@/components/CustomInput";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

interface FormData {
  productType: string;
  FullName: string;
  Email: string;
  LoanAmount: string;
  Pincode: string;
  submitted_from: string;
  submit_time: string;
}

const initialFormData: FormData = {
  productType: "",
  FullName: "",
  Email: "",
  LoanAmount: "",
  Pincode: "",
  submitted_from: "",
  submit_time: "",
};

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const applyForJobId = searchParams.get("id");
  const isViewOnly = searchParams.get("view") === "1";
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const fetchApplyForJobDetails = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.wpForm.applyForLoanGet(applyForJobId);

      if (status === 200) {
        const applyForJobData = data.data;
        setFormData((prev) => ({
          ...prev,
          productType: applyForJobData?.productType || "",
          FullName: applyForJobData?.FullName || "",
          Email: applyForJobData?.Email || "",
          LoanAmount: applyForJobData?.LoanAmount || "",
          Pincode: applyForJobData?.Pincode || "",
          submitted_from: applyForJobData?.submitted_from || "",
          submit_time: applyForJobData?.submit_time || "",
        }));
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [applyForJobId, dispatch]);

  useEffect(() => {
    if (applyForJobId && isViewOnly) {
      fetchApplyForJobDetails();
    } else {
      window.close();
    }
  }, [applyForJobId]);

  return (
    <div className="border-wh-300 flex flex-col items-center gap-4 rounded-2xl border bg-white">
      <div className="flex w-full flex-col gap-4 p-4 md:p-6">
        <h1 className="text-xl font-bold">{applyForJobId ? (isViewOnly ? "View Apply For Loan" : "Edit Apply For Loan") : "Add New Apply For Loan"}</h1>
        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-3">
          <div className="flex-1">
            <CustomInput label="Full Name" name="FullName" value={formData?.FullName} disabled={isViewOnly} required />
          </div>
          <div className="flex-1">
            <CustomInput label="Email" name="email" placeholder="Enter email" value={formData?.Email} disabled={isViewOnly} required />
          </div>
          <div className="flex-1">
            <CustomInput label="Pincode" name="Pincode" value={formData?.Pincode} disabled={isViewOnly} />
          </div>

          <div className="flex-1">
            <CustomInput label="Product Type" name="productType" value={formData?.productType} disabled={isViewOnly} required />
          </div>
          <div className="flex-1">
            <CustomInput
              label="Loan Amount"
              name="LoanAmount"
              value={
                formData?.LoanAmount
                  ? Number(formData?.LoanAmount)?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    })
                  : ""
              }
              disabled={isViewOnly}
            />
          </div>
          <div className="flex-1">
            <CustomInput label="Submit Time" name="submit_time" value={formData?.submit_time} disabled={isViewOnly} />
          </div>
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
