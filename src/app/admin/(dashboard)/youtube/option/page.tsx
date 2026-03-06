"use client";
import { apiHandler } from "@/api/apiHandler";
import CustomInput from "@/components/CustomInput";
import FetchDropdown from "@/components/FetchDropdown";
import InputImage from "@/components/InputImage";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { generateValueCode } from "@/utils/Constant";
import { isEmpty } from "@/utils/helper";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

interface FormData {
  link: string;
  keyword: string;
  iframe: string;
  typeId: string;
  doc_path: unknown;
  previewImg: string;
}

const initialFormData: FormData = {
  link: "",
  keyword: "",
  iframe: "",
  typeId: "",
  doc_path: "",
  previewImg: "",
};

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const ytId = searchParams.get("id");
  const isViewOnly = searchParams.get("view") === "1";
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const fetchStateDetails = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.youtube.get(ytId);

      if (status === 200 || status === 201) {
        const youtube = data.data;
        setFormData((prev) => ({
          ...prev,
          link: youtube?.link || "",
          keyword: youtube?.keyword || "",
          iframe: youtube?.iframe || "",
          typeId: youtube?.typeId || "",
          doc_path: youtube?.doc_path || "",
        }));
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [ytId, dispatch]);

  useEffect(() => {
    if (ytId) {
      fetchStateDetails();
    }
  }, [ytId]);

  const validateFields = useCallback((name: string, value: string) => {
    let error = "";

    switch (name) {
      case "link":
        if (isEmpty(value)) error = "Please enter a link";
        break;
      case "keyword":
        if (isEmpty(value)) error = "Please select keyword";
        break;
      case "iframe":
        if (isEmpty(value)) error = "Please enter a iframe";
        break;
      case "typeId":
        if (isEmpty(value)) error = "Please select typeId";
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
        ...(name === "state" && !ytId ? { value_code: generateValueCode(value) } : {}),
      }));
      setErrors((prev) => ({
        ...prev,
        [name]: validateFields(name, value),
      }));
    },
    [validateFields, ytId]
  );

  const handleFetchDropdownChange = useCallback((name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value?._id || "" }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const removeImage = useCallback((field: string, previewField: string) => {
    setFormData((prev) => ({ ...prev, [field]: "", [previewField]: "" }));
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

  const handleSubmit = useCallback(async () => {
    if (isViewOnly) return;

    const newErrors: Record<string, string> = {};
    const requiredFields = ["typeId", "iframe", "keyword", "link"];

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
      const fd = new FormData();
      fd.append("keyword", formData.keyword);
      fd.append("iframe", formData.iframe);
      fd.append("typeId", formData.typeId);
      fd.append("link", formData.link);
      if (formData?.doc_path instanceof File) fd.append("doc_path", formData.doc_path);

      const { data, status } = ytId ? await apiHandler.youtube.patch(ytId, fd) : await apiHandler.youtube.post(fd);

      if ([200, 201].includes(status)) {
        showToast("success", data?.message);
        // router.push(ROUTES.admin.youtube);
        window.close();
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [isViewOnly, formData, validateFields, ytId, dispatch, router]);

  return (
    <div className="border-wh-300 flex flex-col items-center gap-4 rounded-2xl border bg-white">
      <div className="flex w-full flex-col gap-4 p-4 md:p-6">
        <h1 className="text-xl font-bold">{ytId ? (isViewOnly ? "View Youtube Video" : "Edit Youtube Video") : "Add New Youtube Video"}</h1>
        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
          <div className="flex-1">
            <CustomInput
              label="Keyword"
              name="keyword"
              placeholder="Enter keyword"
              value={formData?.keyword}
              onChange={handleInputChange}
              disabled={isViewOnly}
              required
            />
            <div className="flex-1">{errors.keyword && <p className="error-text mt-1 text-sm text-red-500">{errors.keyword}</p>}</div>
          </div>
          <div className="flex-1">
            <FetchDropdown
              label="Type"
              placeholder="Select type"
              containerClass="!mt-0"
              value={formData.typeId}
              endPoints={apiHandler.value.lookup}
              filterStr={`value=YOUTUBE`}
              func={handleFetchDropdownChange}
              objKey="typeId"
              display="name"
              required
              isComponentDisabled={isViewOnly}
            />
            <div className="flex-1">{errors.typeId && <p className="error-text mt-1 text-sm text-red-500">{errors.typeId}</p>}</div>
          </div>
        </div>
        <div className="flex-1">
          <CustomInput label="Link" name="link" placeholder="Enter link" value={formData?.link} onChange={handleInputChange} disabled={isViewOnly} required />
          <div className="flex-1">{errors.link && <p className="error-text mt-1 text-sm text-red-500">{errors.link}</p>}</div>
        </div>
        <div className="flex-1">
          <CustomInput
            label="iframe"
            name="iframe"
            placeholder="Enter iframe"
            value={formData?.iframe}
            onChange={handleInputChange}
            disabled={isViewOnly}
            isTextArea
            required
          />
          <div className="flex-1">{errors.iframe && <p className="error-text mt-1 text-sm text-red-500">{errors.iframe}</p>}</div>
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
          <div className="flex-1">{errors.iframe && <p className="error-text mt-1 text-sm text-red-500">{errors.iframe}</p>}</div>
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
              {ytId ? "Update" : "Add"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
