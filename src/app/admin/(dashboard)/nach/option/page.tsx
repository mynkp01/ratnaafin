"use client";
import { apiHandler } from "@/api/apiHandler";
import CustomInput from "@/components/CustomInput";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

const Page = () => {
  const searchParams = useSearchParams();
  const nachId = searchParams.get("id");
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    registered_number: "",
    full_name: "",
    loan_account_number: "",
    message: "",
  });

  const fetchNachDetails = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.nach.get(nachId);
      if (status === 200) {
        const nachData = data.data;
        setFormData({
          registered_number: nachData?.registered_number ? nachData?.registered_number : "",
          full_name: nachData?.full_name ? nachData?.full_name : "",
          loan_account_number: nachData?.loan_account_number ? nachData?.loan_account_number : "",
          message: nachData?.message ? nachData?.message : "",
        });
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    if (nachId) {
      fetchNachDetails();
    }
  }, [nachId]);

  return (
    <div className="border-wh-300 flex flex-col items-center gap-4 rounded-2xl border bg-white">
      <div className="flex w-full flex-col gap-4 p-4 md:p-6">
        <h1 className="text-xl font-bold">{"View Lookup Value"} </h1>
        <div className="flex flex-col gap-[10px] md:flex-row">
          <div className="flex-1">
            <CustomInput label="Registered Number" name="registered_number" placeholder="Enter registered number" value={formData.registered_number} disabled />
          </div>
          <div className="flex-1">
            <CustomInput label="Full Name" name="full_name" placeholder="Enter full name" value={formData.full_name} disabled />
          </div>
          <div className="flex-1">
            <CustomInput
              label="Loan Account Number"
              name="loan_account_number"
              placeholder="Enter loan account number"
              value={formData.loan_account_number}
              disabled
            />
          </div>
        </div>
        <div className="flex flex-col gap-[10px] md:flex-row">
          <div className="flex-1">
            <CustomInput label="Message" name="message" placeholder="Enter message" value={formData.message} disabled isTextArea />
          </div>
        </div>
        <div className="mt-4 flex flex-row gap-4">
          <button
            type="button"
            onClick={() => window.close()}
            className="text-15-700 btn-fill-hover h-fit w-fit rounded-xl border-2 border-blue-100 bg-blue-100 p-1.5 text-primary-100 sm:px-3 sm:py-2.5"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
