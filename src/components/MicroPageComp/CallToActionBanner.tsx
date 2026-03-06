"use client";
import { apiHandler } from "@/api/apiHandler";
import { CallToActionImage } from "@/assets";
import { selectShowRequestCallbackForm, setIsLoading, setShowRequestCallbackForm, setThankYouModal } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { handleKeyDown, ipAddress, ROUTES } from "@/utils/Constant";
import { isEmpty, showToast } from "@/utils/helper";
import { Modal } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";

const initialForm = {
  FirstName: "",
  LastName: "",
  EmailAddress: "",
  Phone: "",
  Terms_agree: "",
  Description: "",
  ipAddress: "",
  submit_time: "",
};

export const RequestCallbackForm = memo(() => {
  const showRequestCallbackForm = useSelector(selectShowRequestCallbackForm);
  const [form, setForm] = useState(initialForm);

  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleClose = () => {
    setErrors({});
    setForm(initialForm);
    dispatch(setShowRequestCallbackForm(false));
  };

  const validateFields = useCallback((name: string, value: string) => {
    let error = "";

    switch (name) {
      case "FirstName":
        if (isEmpty(value)) {
          error = "Please enter first name";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          error = "Please enter only letters and numbers in first name";
        }
        break;
      case "LastName":
        if (isEmpty(value)) {
          error = "Please enter last name";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          error = "Please enter only letters and numbers in last name";
        }
        break;
      case "EmailAddress":
        if (!value.trim()) return "Please enter email address.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Enter a valid email address.";
        break;
      case "Phone":
        if (!value.trim()) return "Please enter phone number.";
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) return "Enter a valid 10-digit phone number.";
        break;
      case "Terms_agree":
        if (!value.trim()) return "Please read and accept teams and conditions.";
        break;
      default:
        break;
    }

    return error;
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const maxLength = (e.target as HTMLInputElement).maxLength;
    const type = (e.target as HTMLInputElement).type;

    if (type === "number") {
      if (Number(value) < 0 || value?.length > maxLength) return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateFields(name, value),
    }));
  }, []);

  const handleSubmit = async () => {
    const obj = { ...form },
      newErrors = {};
    obj.EmailAddress = obj.EmailAddress.trim().toLocaleLowerCase();
    obj.submit_time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    const requiredFields = ["FirstName", "LastName", "EmailAddress", "Phone", "Terms_agree"];
    requiredFields.forEach((field) => {
      const error = validateFields(field, obj[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors)?.length > 0) {
      return setErrors(newErrors);
    }

    obj.ipAddress = await ipAddress();

    try {
      dispatch(setIsLoading(true));

      const { data, status } = await apiHandler.wpForm.requestCall(obj);

      if (status === 200 || status === 201) {
        dispatch(setShowRequestCallbackForm(false));
        dispatch(setThankYouModal({ open: true, formType: "request call", url: "" }));
        setForm(initialForm);
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
    <>
      <Modal open={showRequestCallbackForm} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <div className="absolute overflow-y-auto top-1/2 left-1/2 w-[320px] h-[400px] xs:w-[400px] md:min-w-[650px] md:min-h-fit -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-2xl outline-none">
          <div id="modal-modal-title" className="p-4 md:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between border-b pb-4">
                <h4 className="text-quinary-100 font-bold text-xl sm:text-3xl">Request a Call Back</h4>
                <button onClick={handleClose} className="text-quinary-100 focus:outline-none" aria-label="Close modal">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    placeholder="First Name *"
                    type="text"
                    name="FirstName"
                    value={form.FirstName}
                    onChange={handleInputChange}
                    className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  />
                  {errors?.FirstName && <p className="error-text mt-1 text-sm text-red-500">{errors?.FirstName}</p>}
                </div>
                <div>
                  <input
                    placeholder="Last Name *"
                    type="text"
                    name="LastName"
                    value={form.LastName}
                    onChange={handleInputChange}
                    className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  />
                  {errors?.LastName && <p className="error-text mt-1 text-sm text-red-500">{errors?.LastName}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    placeholder="Email Address *"
                    type="email"
                    name="EmailAddress"
                    value={form.EmailAddress}
                    onChange={handleInputChange}
                    className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  />
                  {errors?.EmailAddress && <p className="error-text mt-1 text-sm text-red-500">{errors?.EmailAddress}</p>}
                </div>
                <div>
                  <input
                    placeholder="Phone Number *"
                    type="number"
                    name="Phone"
                    value={form.Phone}
                    maxLength={10}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  />
                  {errors?.Phone && <p className="error-text mt-1 text-sm text-red-500">{errors?.Phone}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <textarea
                    rows={4}
                    placeholder="Write a Message"
                    type="textarea"
                    name="Description"
                    value={form.Description}
                    onChange={handleInputChange}
                    className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  />
                </div>
              </div>
              <div className="gap-2 flex-col">
                <div className="gap-2 flex">
                  <input
                    type="checkbox"
                    value={form.Terms_agree == "1" ? true : false}
                    id="terms1"
                    className="form-checkbox h-8 w-8 text-green-600 rounded focus:ring-green-500 cursor-pointer"
                    onChange={() => setForm((prev) => ({ ...prev, Terms_agree: prev.Terms_agree === "" ? "1" : "" }))}
                  />
                  <label htmlFor="terms1" className="block text-tertiary-500 text-sm cursor-pointer">
                    I hereby confirm that I have read, understood and agree to the{" "}
                    <Link href={ROUTES.client.termsAndConditions} target="_blank" className="text-secondary-600">
                      T&C
                    </Link>{" "}
                    and{" "}
                    <Link href={ROUTES.client.privacyPolicy} target="_blank" className="text-secondary-600">
                      Privacy Policy
                    </Link>
                    , and I agree to receive communications and authorize Ratnaafin Capital to contact me through SMS, Email, and WhatsApp (this shall override
                    any registration done by myself under DNC/NDNC)
                  </label>
                </div>
                {errors?.Terms_agree && <p className="error-text mt-1 text-sm text-red-500">{errors?.Terms_agree}</p>}
              </div>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="rounded-full w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10">Submit</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
});

RequestCallbackForm.displayName = "RequestCallbackForm";

function CallToActionBanner({ title, description, button1, button2 }) {
  const dispatch = useAppDispatch();

  return (
    <div className="container mx-auto 2xl:px-8 px-4">
      <div className="relative lg:bg-gradient-to-r bg-gradient-to-t from-secondary-600 to-primary-400 rounded-2xl  overflow-hidden">
        <div className="flex flex-col gap-8 justify-center p-5 sm:p-8 lg:p-14 relative z-10">
          <div className="flex flex-col gap-3">
            <p className="text-white font-semibold text-xl md:text-3xl sm:text-4xl">{title}</p>
            <p className="text-white text-sm sm:text-base md:w-2/3">{description}</p>
          </div>
          <div className="sm:flex grid gap-3">
            {button1 ? (
              <button
                onClick={() => dispatch(setShowRequestCallbackForm(true))}
                className="rounded-full w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10">{button1}</span>
              </button>
            ) : null}
            {button2 ? (
              <Link
                href={ROUTES.client.branchLocator}
                target="_blank"
                className="rounded-full w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-white hover:text-white text-quinary-100 transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10">{button2}</span>
              </Link>
            ) : null}
          </div>
        </div>
        <div className="absolute right-0 bottom-0 -z-0">
          <Image loading="lazy" src={CallToActionImage.src} width={500} height={300} alt="" className="object-cover object-center" />
        </div>
        <RequestCallbackForm />
      </div>
    </div>
  );
}

export default memo(CallToActionBanner);
