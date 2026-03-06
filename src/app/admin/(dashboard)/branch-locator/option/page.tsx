"use client";
import { apiHandler } from "@/api/apiHandler";
import CustomInput from "@/components/CustomInput";
import FetchDropdown from "@/components/FetchDropdown";
import InputImage from "@/components/InputImage";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { isEmpty } from "@/utils/helper";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

interface FormData {
  address: string;
  phoneNumber: string;
  email: string;
  status: boolean;
  branchName: string;
  doc_path: string;
  previewImg: string;
  countryId: string;
  stateId: string;
  cityId: string;
  iframe: string;
}

const initialFormData: FormData = {
  address: "",
  phoneNumber: "",
  email: "",
  status: true,
  branchName: "",
  doc_path: "",
  previewImg: "",
  countryId: "",
  stateId: "",
  cityId: "",
  iframe: "",
};

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const branchLocatorId = searchParams.get("id");
  const isViewOnly = searchParams.get("view") === "1";
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const fetchBranchLocationDetails = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.branchLocator.get(branchLocatorId);

      if (status === 200) {
        const branchLocation = data.data;
        setFormData((prev) => ({
          ...prev,
          address: branchLocation?.address || "",
          phoneNumber: branchLocation?.phoneNumber || "",
          email: branchLocation?.email || "",
          status: branchLocation?.status || true,
          branchName: branchLocation?.branchName || "",
          doc_path: branchLocation?.doc_path || "",
          countryId: branchLocation?.countryId || "",
          stateId: branchLocation?.stateId || "",
          cityId: branchLocation?.cityId || "",
          iframe: branchLocation?.iframe || "",
        }));
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [branchLocatorId, dispatch]);

  useEffect(() => {
    if (branchLocatorId) {
      fetchBranchLocationDetails();
    }
  }, [branchLocatorId]);

  const validateFields = useCallback((name: string, value: string) => {
    let error = "";

    switch (name) {
      case "branchName":
        if (isEmpty(value)) error = "Please enter a branch name";
        break;
      case "email":
        if (!value.trim()) return "Please enter a email.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Enter a valid email address.";
        break;
      case "phoneNumber":
        if (isEmpty(value)) error = "Please enter a phone number";
        break;
      case "address":
        if (isEmpty(value)) error = "Please enter a address";
        break;
      case "iframe":
        if (isEmpty(value)) error = "Please enter a iframe";
        break;
      // case "doc_path":
      //   if (isEmpty(value)) error = "Please upload image";
      //   break;
      case "doc_path":
        if (!(value instanceof File && value.name) && !(typeof value === "string" && value.trim() !== "")) {
          error = "Please upload image";
        }
        break;

      case "countryId":
        if (isEmpty(value.trim())) error = "Please select a country";
        break;
      case "stateId":
        if (isEmpty(value.trim())) error = "Please select a state";
        break;
      case "cityId":
        if (isEmpty(value.trim())) error = "Please select a city";
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
    [validateFields, branchLocatorId]
  );

  const handleFetchDropdownChange = useCallback((name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value?._id || "" }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleFiles = useCallback((e: ChangeEvent<HTMLInputElement>, field: string, previewField: string) => {
    const files = e.target.files;
    if (files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        [field]: files[0],
        [previewField]: URL.createObjectURL(files[0]),
      }));
    }
  }, []);

  const removeImage = useCallback((field: string, previewField: string) => {
    setFormData((prev) => ({ ...prev, [field]: "", [previewField]: "" }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isViewOnly) return;

    const newErrors: Record<string, string> = {};
    const requiredFields = ["branchName", "email", "phoneNumber", "address", "iframe", "doc_path", "countryId", "stateId", "cityId"];

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

    const fd = new FormData();
    fd.append("address", formData.address);
    fd.append("branchName", formData.branchName);
    fd.append("cityId", formData.cityId);
    fd.append("countryId", formData.countryId);
    fd.append("email", formData.email);
    fd.append("iframe", formData.iframe);
    fd.append("phoneNumber", formData.phoneNumber);
    fd.append("stateId", formData.stateId);
    if (formData.doc_path) fd.append("doc_path", formData.doc_path);

    try {
      dispatch(setIsLoading(true));

      const { data, status } = branchLocatorId ? await apiHandler.branchLocator.patch(branchLocatorId, fd) : await apiHandler.branchLocator.post(fd);

      if ([200, 201].includes(status)) {
        showToast("success", data?.message);
        window.close();
        // router.push(ROUTES.admin.branchLocator);
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [isViewOnly, formData, validateFields, branchLocatorId, dispatch, router]);

  return (
    <div className="border-wh-300 flex flex-col items-center gap-4 rounded-2xl border bg-white">
      <div className="flex w-full flex-col gap-4 p-4 md:p-6">
        <h1 className="text-xl font-bold">{branchLocatorId ? (isViewOnly ? "View Branch" : "Edit Branch") : "Add New Branch"}</h1>
        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-3">
          <div className="flex-1">
            <CustomInput
              label="Branch Name"
              name="branchName"
              placeholder="Enter branch name"
              value={formData?.branchName}
              onChange={handleInputChange}
              disabled={isViewOnly}
              required
            />
            {errors?.branchName && <p className="error-text mt-1 text-sm text-red-500">{errors?.branchName}</p>}
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
              name="phoneNumber"
              placeholder="Enter phone number"
              value={formData?.phoneNumber}
              onChange={handleInputChange}
              disabled={isViewOnly}
              required
            />
            {errors.phoneNumber && <p className="error-text mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
          </div>
          <div className="flex-1">
            <FetchDropdown
              label="Country"
              placeholder="Select country"
              containerClass="!mt-0"
              value={formData?.countryId}
              endPoints={apiHandler.country.lookup}
              filterStr={`NA`}
              func={handleFetchDropdownChange}
              objKey="countryId"
              display="name"
              required
              isComponentDisabled={isViewOnly}
            />
            {errors.countryId && <p className="error-text mt-1 text-sm text-red-500">{errors.countryId}</p>}
          </div>

          <div className="flex-1">
            <FetchDropdown
              label="State"
              placeholder="Select state"
              containerClass="!mt-0"
              value={formData.stateId}
              endPoints={apiHandler.state.lookup}
              filterStr={`NA`}
              func={handleFetchDropdownChange}
              objKey="stateId"
              display="state"
              required
              isComponentDisabled={isViewOnly || isEmpty(formData.countryId)}
            />
            {errors.stateId && <p className="error-text mt-1 text-sm text-red-500">{errors.stateId}</p>}
          </div>
          <div className="flex-1">
            <FetchDropdown
              label="City"
              placeholder="Select City"
              containerClass="!mt-0"
              value={formData.cityId}
              endPoints={apiHandler.city.lookup}
              filterStr={`NA`}
              func={handleFetchDropdownChange}
              objKey="cityId"
              display="city"
              required
              isComponentDisabled={isViewOnly || isEmpty(formData.stateId)}
            />
            {errors.cityId && <p className="error-text mt-1 text-sm text-red-500">{errors.cityId}</p>}
          </div>

          <div className="col-span-full flex-1">
            <CustomInput
              label="Address"
              name="address"
              placeholder="Enter address"
              value={formData?.address}
              onChange={handleInputChange}
              disabled={isViewOnly}
              isTextArea
              required
            />
            {errors.address && <p className="error-text mt-1 text-sm text-red-500">{errors.address}</p>}
          </div>
          <div className="col-span-full flex-1">
            <CustomInput
              label="Iframe"
              name="iframe"
              placeholder="Enter iframe"
              value={formData?.iframe}
              onChange={handleInputChange}
              disabled={isViewOnly}
              isTextArea
              required
            />
            {errors.iframe && <p className="error-text mt-1 text-sm text-red-500">{errors.iframe}</p>}
          </div>
          <div className="flex-1">
            <InputImage
              labelText="Image"
              placeholderText="Upload Image"
              doc_path={formData.doc_path}
              previewImg={formData.previewImg}
              removeImage={() => removeImage("doc_path", "previewImg")}
              handleFiles={(e) => handleFiles(e, "doc_path", "previewImg")}
              isViewOnly={isViewOnly}
            />
            {errors.doc_path && <p className="error-text mt-1 text-sm text-red-500">{errors.doc_path}</p>}
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
              {branchLocatorId ? "Update" : "Add"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
