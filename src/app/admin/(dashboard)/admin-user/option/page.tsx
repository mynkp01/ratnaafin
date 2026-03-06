"use client";
import { apiHandler } from "@/api/apiHandler";
import CustomInput from "@/components/CustomInput";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { isEmpty } from "@/utils/helper";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

interface FormData {
  userName: string;
  email: string;
  contact: string;
  password: string;
}

const initialFormData: FormData = {
  userName: "",
  email: "",
  contact: "",
  password: "",
};

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const adminId = searchParams.get("id");
  const isViewOnly = searchParams.get("view") === "1";
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const fetchAdminUserDetails = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.admin.get(adminId);

      if (status === 200) {
        const adminData = data.data;
        setFormData((prev) => ({
          ...prev,
          userName: adminData.userName || "",
          email: adminData.email || "",
          contact: adminData.contact || "",
          password: "",
        }));
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [adminId, dispatch]);

  useEffect(() => {
    if (adminId) {
      fetchAdminUserDetails();
    }
  }, [adminId]);

  const validateFields = useCallback((name: string, value: string) => {
    let error = "";

    switch (name) {
      case "userName":
        if (isEmpty(value)) error = "Please enter a branch name";
        break;
      case "email":
        if (!value.trim()) return "Please enter a email.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Enter a valid email address.";
        break;
      case "password":
        if (!value.trim()) return "Please enter a password.";
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
        if (!passwordRegex.test(value))
          return "Password must be at least 8 characters long and include at least one letter, one number, and one special character.";
        break;
      case "contact":
        if (isEmpty(value)) error = "Please enter a phone number";
        break;
    }
    return error;
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev) => ({
        ...prev,
        [name]: validateFields(name, value),
      }));
    },
    [validateFields, adminId]
  );

  const handleSubmit = useCallback(async () => {
    if (isViewOnly) return;

    const newErrors: Record<string, string> = {};
    const requiredFields = ["userName", "email", "contact"];
    if (!adminId) requiredFields.push("password");

    requiredFields.forEach((field) => {
      const error = validateFields(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors)?.length) {
      setErrors(newErrors);
      return;
    }

    try {
      dispatch(setIsLoading(true));
      const { data, status } = adminId ? await apiHandler.admin.patch(adminId, formData) : await apiHandler.admin.post(formData);
      if ([200, 201].includes(status)) {
        showToast("success", data?.message);
        window.close();
        // router.push(ROUTES.admin.adminUser);
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [isViewOnly, formData, validateFields, adminId, dispatch, router]);

  return (
    <div className="border-wh-300 flex flex-col items-center gap-4 rounded-2xl border bg-white">
      <div className="flex w-full flex-col gap-4 p-4 md:p-6">
        <h1 className="text-xl font-bold">{adminId ? (isViewOnly ? "View Admin User" : "Edit Admin User") : "Add New Admin User"}</h1>
        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-3">
          <div className="flex-1">
            <CustomInput
              label="User Name"
              name="userName"
              placeholder="Enter user name"
              value={formData?.userName}
              onChange={handleInputChange}
              disabled={isViewOnly}
              required
            />
            {errors?.userName && <p className="error-text mt-1 text-sm text-red-500">{errors?.userName}</p>}
          </div>
          <div className="flex-1">
            <CustomInput
              label="Email"
              name="email"
              placeholder="Enter email"
              value={formData?.email}
              onChange={handleInputChange}
              disabled={isViewOnly}
              required
            />
            {errors.email && <p className="error-text mt-1 text-sm text-red-500">{errors?.email}</p>}
          </div>
          <div className="flex-1">
            <CustomInput
              label="Phone Number"
              name="contact"
              maxLength={10}
              type="number"
              placeholder="Enter phone number"
              value={formData?.contact}
              onChange={handleInputChange}
              disabled={isViewOnly}
            />
            {errors.contact && <p className="error-text mt-1 text-sm text-red-500">{errors.contact}</p>}
          </div>
          <div className="flex-1">
            <CustomInput
              label="Password"
              name="password"
              placeholder="Enter password"
              value={formData?.password}
              onChange={handleInputChange}
              disabled={isViewOnly}
            />
            {errors.password && <p className="error-text mt-1 text-sm text-red-500">{errors.password}</p>}
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
          {!isViewOnly && (
            <button
              type="button"
              onClick={handleSubmit}
              className="shadow-outer h-fit w-fit rounded-xl border border-blue-100 bg-primary-100 p-1.5 text-blue-100 sm:px-3 sm:py-2.5"
            >
              {adminId ? "Update" : "Add"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
