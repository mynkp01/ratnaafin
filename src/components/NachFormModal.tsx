"use client";
import { apiHandler } from "@/api/apiHandler";
import { selectIsLoading, setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { ipAddress } from "@/utils/Constant";
import { isEmpty, showToast } from "@/utils/helper";
import { Modal } from "@mui/material";
import { KeyboardEventHandler, memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import ScreenLoader from "./Loader";
const initialForm = {
  registered_number: "",
  full_name: "",
  message: "",
  loan_account_number: "",
};

function NachFormModal({ isOpen, setIsOpen }) {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleClose = () => {
    setErrors({});
    setForm(initialForm);
    setIsOpen(false);
  };

  const validateFields = useCallback((name: string, value: string) => {
    let error = "";

    switch (name) {
      case "registered_number":
        if (isEmpty(value)) {
          error = "Please enter registered number";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          error = "Please enter only letters and numbers in registered number";
        }
        break;
      case "full_name":
        if (isEmpty(value)) {
          error = "Please enter full name";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          error = "Please enter only letters and numbers in full name";
        }
        break;
      case "loan_account_number":
        if (isEmpty(value)) {
          error = "Please enter loan account number";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          error = "Please enter only letters and numbers in loan account number";
        }
        break;
      default:
        break;
    }

    return error;
  }, []);
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, maxLength } = e.target;

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

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const numberDisallowedKeys = ["ArrowUp", "ArrowDown", "-", "+", "e", "E"];

    if (numberDisallowedKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }
  };

  const handleSubmit = async () => {
    try {
      dispatch(setIsLoading(true));
      const obj = { ...form, ipAddress: await ipAddress() },
        newErrors = {};
      const requiredFields = ["registered_number", "full_name", "message", "loan_account_number"];
      requiredFields.forEach((field) => {
        const error = validateFields(field, obj[field]);
        if (error) {
          newErrors[field] = error;
        }
      });
      if (Object.keys(newErrors)?.length > 0) {
        return setErrors(newErrors);
      }
      const { data, status } = await apiHandler.nach.post(obj);
      if (status === 200 || status === 201) {
        setForm(initialForm);
        setIsOpen(false);
        showToast("success", data?.message);
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
    <div>
      <Modal open={isOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <>
          {isLoading && <ScreenLoader />}
          <div className="absolute overflow-y-auto top-1/2 left-1/2 w-[320px]  xs:w-[400px] md:min-w-[650px] md:min-h-fit -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-2xl outline-none">
            <div id="modal-modal-title" className="p-4 md:p-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between border-b pb-4">
                  <h4 className="text-quinary-100 font-bold text-lg sm:text-2xl">Requests related to NACH mandate</h4>
                  <button onClick={handleClose} className="text-quinary-100 focus:outline-none" aria-label="Close modal">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div>
                    <input
                      placeholder="Full name *"
                      type="text"
                      name="full_name"
                      value={form.full_name}
                      onChange={(e) => {
                        if (/^\d*[a-zA-Z][a-zA-Z\d\s]*$/.test(e.target.value)) handleInputChange(e);
                        else if (e.target.value === "") handleInputChange(e);
                      }}
                      className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    />
                    {errors?.full_name && <p className="error-text mt-1 text-sm text-red-500">{errors?.full_name}</p>}
                  </div>
                  <div>
                    <input
                      placeholder="Registered number *"
                      type="number"
                      name="registered_number"
                      value={form.registered_number}
                      maxLength={10}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    />
                    {errors?.registered_number && <p className="error-text mt-1 text-sm text-red-500">{errors?.registered_number}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div>
                    <input
                      placeholder="Loan account number *"
                      type="text"
                      name="loan_account_number"
                      value={form.loan_account_number}
                      onChange={handleInputChange}
                      className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    />
                    {errors?.loan_account_number && <p className="error-text mt-1 text-sm text-red-500">{errors?.loan_account_number}</p>}
                  </div>
                  <div>
                    <textarea
                      placeholder="Enter message *"
                      rows={3}
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    />
                    {errors?.message && <p className="error-text mt-1 text-sm text-red-500">{errors?.message}</p>}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-full w-fit relative px-6 py-2 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
                >
                  <span className="relative z-10">Submit</span>
                </button>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
}

export default memo(NachFormModal);
