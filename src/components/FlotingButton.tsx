"use client";
import { apiHandler } from "@/api/apiHandler";
import { setIsLoading, setThankYouModal } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { handleKeyDown, ipAddress, LoanSolutions, ROUTES } from "@/utils/Constant";
import { isEmpty, showToast } from "@/utils/helper";
import { Box, Checkbox } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";

interface FormData {
  productType: string;
  FullName: string;
  Email: string;
  LoanAmount?: string;
  PhoneNo?: string;
  Pincode?: string;
  Terms_agree: string;
  ipAddress: string;
  submit_time: string;
}

const initialFormData: FormData = {
  productType: "",
  FullName: "",
  Email: "",
  LoanAmount: "",
  PhoneNo: "",
  Pincode: "",
  Terms_agree: "",
  ipAddress: "",
  submit_time: "",
};

function FlotingButton({ ref = null, className = "", id = "", selectLoan = "", loanEMI = null, disable = false, loanAmount = "" }) {
  const searchParams = useSearchParams();
  const affClickId = searchParams.get("aff_click_id");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setFormData((prev) => ({ ...prev, productType: selectLoan, LoanAmount: loanEMI ? loanEMI?.loan?.amount || "" : loanAmount ? loanAmount : "" }));
  }, [selectLoan, loanEMI]);

  const validateFields = useCallback((name: string, value: any) => {
    let error = "";

    switch (name) {
      case "productType":
        if (isEmpty(value)) error = "Please select loan type";
        break;
      case "FullName":
        if (isEmpty(value)) error = "Please enter full name";
        break;
      case "Email":
        if (!value.trim()) return "Please enter email address.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Enter a valid email address.";
        break;
      case "LoanAmount":
        if (!value || value <= 0) error = "Please enter loan amount";
        break;
      case "Pincode":
        if (isEmpty(value)) error = "Please enter pin code";
        if (value.length !== 6) error = "Please enter pin code";
        break;
      case "PhoneNo":
        if (isEmpty(value)) error = "Please enter Phone Number";
        break;
      case "Terms_agree":
        if (isEmpty(value)) error = "Please select T&C";
        break;
    }

    return error;
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, maxLength } = e.target;

      if (type === "number" && maxLength !== -1) {
        if (Number(value) < 0 || value?.length > maxLength) return;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev) => ({
        ...prev,
        [name]: validateFields(name, value),
      }));
    },
    [validateFields]
  );

  const handleFetchDropdownChange = useCallback((name: string, value) => {
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = async () => {
    const obj = { ...formData },
      newErrors: Record<string, string> = {};
    obj.productType = LoanSolutions.find((item) => item.key === obj.productType)?.key;
    obj.Email = obj.Email.trim().toLocaleLowerCase();
    obj.submit_time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    obj.LoanAmount = obj.LoanAmount.toString();

    const requiredFields = ["productType", "FullName", "Email", "LoanAmount", "Pincode", "Terms_agree", "PhoneNo", "ipAddress", "submit_time"];

    requiredFields.forEach((field) => {
      const error = validateFields(field, obj[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors)?.length) {
      setErrors(newErrors);
      return;
    }

    obj.ipAddress = await ipAddress();

    try {
      dispatch(setIsLoading(true));

      const { data, status } = await apiHandler.wpForm.applyForLoan(obj);

      if ([200, 201].includes(status)) {
        setFormData({ ...initialFormData, productType: disable ? selectLoan : "" });
        const productRoute = Object.values(ROUTES.product).includes(window?.location?.pathname);

        dispatch(setThankYouModal({ open: true, formType: "apply loan", url: productRoute ? window?.location?.pathname : "" }));
        if (productRoute) router.push(`${window?.location?.pathname}/thank-you${affClickId ? `?aff_click_id=${affClickId}` : ""}`);
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div ref={ref} className={`bg-white p-6 rounded-2xl shadow-md ${className}`} id={id || "floating-button"}>
      <h2 className="text-3xl sm:text-4xl text-quinary-100 font-bold mb-2 text-center lg:text-left">Apply for Loan</h2>
      <p className="text-base text-tertiary-500 mb-4 text-center lg:text-left">
        Quick and easy loan application process. Get the funds you need without the hassle.
      </p>
      <div className="mb-4">
        <div className="relative">
          <select
            value={formData.productType}
            name="productType"
            onChange={(e) => {
              handleFetchDropdownChange("productType", e.target.value);
            }}
            disabled={disable}
            id="loanType"
            className="appearance-none cursor-pointer rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
          >
            <option value="">Choose Loan Type *</option>
            {LoanSolutions.map((item) => (
              <option key={item.key} value={item.key}>
                {item.title}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-quinary-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {errors.productType && <p className="error-text mt-1 text-sm text-red-500">{errors.productType}</p>}
        </div>
      </div>
      <div className="mb-4">
        <input
          placeholder="Full Name *"
          name="FullName"
          value={formData.FullName}
          onChange={handleInputChange}
          type="text"
          id="fullName"
          className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
        />
        {errors.FullName && <p className="error-text mt-1 text-sm text-red-500">{errors.FullName}</p>}
      </div>
      <div className="mb-4">
        <input
          placeholder="Email Address *"
          value={formData.Email}
          onChange={handleInputChange}
          type="Email"
          name="Email"
          id="emailAddress"
          className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
        />
        {errors.Email && <p className="error-text mt-1 text-sm text-red-500">{errors.Email}</p>}
      </div>
      <div className="mb-4">
        <input
          placeholder="Loan Amount *"
          value={formData.LoanAmount}
          name="LoanAmount"
          onChange={handleInputChange}
          type="number"
          id="LoanAmountRequired"
          onKeyDown={handleKeyDown}
          className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
        />
        {errors.LoanAmount && <p className="error-text mt-1 text-sm text-red-500">{errors.LoanAmount}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <input
            placeholder="Pincode *"
            value={formData.Pincode}
            name="Pincode"
            onChange={handleInputChange}
            type="number"
            maxLength={6}
            onKeyDown={handleKeyDown}
            id="pincode"
            className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
          />
          {errors.Pincode && <p className="error-text mt-1 text-sm text-red-500">{errors.Pincode}</p>}
        </div>
        <div>
          <input
            placeholder="Phone Number *"
            type="number"
            value={formData.PhoneNo}
            name="PhoneNo"
            onChange={handleInputChange}
            id="phoneNumber"
            maxLength={10}
            onKeyDown={handleKeyDown}
            className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
          />
          {errors.PhoneNo && <p className="error-text mt-1 text-sm text-red-500">{errors.PhoneNo}</p>}
        </div>
      </div>
      <div className="mb-4 gap-2 flex">
        <Checkbox
          disableRipple
          sx={{
            padding: 0,
          }}
          checked={formData.Terms_agree == "1" ? true : false}
          id="terms"
          onChange={() => {
            setFormData((prev) => ({ ...prev, Terms_agree: prev.Terms_agree == "1" ? "" : "1" }));
            setErrors((prev) => ({
              ...prev,
              Terms_agree: "",
            }));
          }}
          icon={
            <Box
              sx={{
                width: 20,
                height: 20,
                border: "1.5px solid #525252",
                borderRadius: "4px",
                backgroundColor: "#ffffff",
              }}
            />
          }
          checkedIcon={
            <Box
              sx={{
                width: 20,
                height: 20,
                border: "1.5px solid #1EB259",
                borderRadius: "4px",
                backgroundColor: "#E6F7EC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="#1EB259" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Box>
          }
        />
        <label htmlFor="terms" className="block text-tertiary-500 text-sm text-left cursor-pointer">
          I agree to the{" "}
          <Link href={ROUTES.client.termsAndConditions} target="_blank" className="text-primary-400">
            T&C{" "}
          </Link>{" "}
          and{" "}
          <Link href={ROUTES.client.privacyPolicy} target="_blank" className="text-primary-400">
            Privacy Policy
          </Link>{" "}
          and authorize Ratnaafin Capital to contact me via SMS, Email, and WhatsApp, overriding any DNC/NDNC registration.
        </label>
      </div>
      {errors.Terms_agree && <p className="error-text mt-1 text-sm text-red-500">{errors.Terms_agree}</p>}
      <div className="w-full flex justify-end">
        <button
          className="rounded-full w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
          onClick={handleSubmit}
        >
          <span className="relative z-10">Submit</span>
        </button>
      </div>
    </div>
  );
}

export default memo(FlotingButton);
