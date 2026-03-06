"use client";
import { apiHandler } from "@/api/apiHandler";
import CustomInput from "@/components/CustomInput";
import DocumentUplaod from "@/components/DocumentUpload";
import FetchDropdown from "@/components/FetchDropdown";
import LabelField from "@/components/LabelField";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { LOOKUP_VALUES } from "@/utils/Constant";
import { isEmpty } from "@/utils/helper";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

interface FormData {
  title: string;
  doc_path: string;
  categoryId: string;
  subCategoryId?: string;
  status: boolean;
  previewImg: string;
  languageId: string;
  date?: Date | null;
}

const initialFormData: FormData = {
  title: "",
  doc_path: "",
  categoryId: "",
  status: true,
  previewImg: "",
  languageId: "",
  subCategoryId: "",
  date: null,
};

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const disclosureId = searchParams.get("id");
  const isViewOnly = searchParams.get("view") === "1";
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const fetchDisclosureDetails = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.disclosure.get(disclosureId);

      if (status === 200) {
        const disclosure = data.data;
        setFormData({
          title: disclosure?.title || "",
          doc_path: disclosure?.doc_path || "",
          categoryId: disclosure?.categoryId || "",
          subCategoryId: disclosure?.subCategoryId || "",
          status: true,
          languageId: disclosure?.languageId || "",
          date: disclosure?.date ? dayjs(disclosure?.date) : null,
          previewImg: disclosure?.previewImg || "",
        });
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [disclosureId, dispatch]);

  useEffect(() => {
    if (disclosureId) {
      fetchDisclosureDetails();
    }
  }, [disclosureId]);

  const validateFields = useCallback((name: string, value: string) => {
    let error = "";

    switch (name) {
      case "title":
        if (isEmpty(value)) error = "Please enter a title";
        break;
      case "categoryId":
        if (isEmpty(value)) error = "Please enter a category";
        break;
      case "languageId":
        if (isEmpty(value)) error = "Please enter a language";
        break;
      case "doc_path":
        if (!(value instanceof File && value.name) && !(typeof value === "string" && value.trim() !== "")) {
          error = "Please upload PDF";
        }
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
    [validateFields, disclosureId]
  );

  const handleFetchDropdownChange = useCallback((name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value?._id || "" }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleFiles = useCallback((field: string, file) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isViewOnly) return;

    const newErrors: Record<string, string> = {};
    const requiredFields = ["title", "categoryId", "languageId", "doc_path"];

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
      fd.append("title", formData.title);
      fd.append("categoryId", formData.categoryId);
      fd.append("languageId", formData.languageId);
      fd.append("doc_path", formData.doc_path);
      if (formData.date) fd.append("date", dayjs(formData.date).date(2).toISOString());
      if (formData.subCategoryId) fd.append("subCategoryId", formData.subCategoryId);
      const { data, status } = disclosureId ? await apiHandler.disclosure.patch(disclosureId, fd) : await apiHandler.disclosure.post(fd);

      if ([200, 201].includes(status)) {
        showToast("success", data?.message);
        window.close();
        // router.push(ROUTES.admin.disclosure);
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [isViewOnly, formData, validateFields, disclosureId, dispatch, router]);

  return (
    <div className="border-wh-300 flex flex-col items-center gap-4 rounded-2xl border bg-white">
      <div className="flex w-full flex-col gap-4 p-4 md:p-6">
        <h1 className="text-xl font-bold">{disclosureId ? (isViewOnly ? "View Disclosure" : "Edit Disclosure") : "Add New Disclosure"}</h1>
        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-3">
          <div className="flex-1">
            <CustomInput
              label="Title"
              name="title"
              className="!h-[52px]"
              placeholder="Enter title"
              value={formData?.title}
              onChange={handleInputChange}
              disabled={isViewOnly}
              required
            />
            {errors?.title && <p className="error-text mt-1 text-sm text-red-500">{errors?.title}</p>}
          </div>
          <div className="flex-1">
            <FetchDropdown
              label="Category"
              placeholder="Select Category"
              containerClass="!mt-0"
              value={formData?.categoryId}
              endPoints={apiHandler.value.lookup}
              filterStr={`value=${LOOKUP_VALUES.DISCLOSURE}&sort_type=sort_order&sort=1 `}
              func={handleFetchDropdownChange}
              objKey="categoryId"
              display="name"
              required
              isComponentDisabled={isViewOnly}
            />
            {errors.categoryId && <p className="error-text mt-1 text-sm text-red-500">{errors.categoryId}</p>}
          </div>
          <div className="flex-1">
            <FetchDropdown
              label="Sub Category"
              placeholder="Select Sub Category"
              containerClass="!mt-0"
              value={formData?.subCategoryId}
              endPoints={apiHandler.value.lookup}
              filterStr={`parent_category_id=${formData.categoryId}`}
              func={handleFetchDropdownChange}
              objKey="subCategoryId"
              display="name"
              isComponentDisabled={isViewOnly || !formData.categoryId ? true : false}
            />
          </div>

          <div className="flex-1 mt-1 flex w-full flex-col gap-2 sm:mt-3">
            <FetchDropdown
              label="Language"
              placeholder="Select language"
              containerClass="!mt-0"
              textMenuSx={(oldSx) => ({
                ...oldSx,
                "& .MuiInputBase-root": {
                  ...oldSx?.["& .MuiInputBase-root"],
                  height: "52px !important",
                },
              })}
              value={formData.languageId}
              endPoints={apiHandler.value.lookup}
              filterStr={`value=${LOOKUP_VALUES.LANGUAGE}`}
              func={handleFetchDropdownChange}
              objKey="languageId"
              display="name"
              required
              isComponentDisabled={isViewOnly}
            />
            {errors.languageId && <p className="error-text mt-1 text-sm text-red-500">{errors.languageId}</p>}
          </div>
          <div className="flex-1">
            <div className="mt-1 flex w-full flex-col gap-2 sm:mt-3">
              <div className="flex flex-col gap-1.5">
                <LabelField labelText={"Date"} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{
                      marginTop: "4px",
                      "& .MuiPickersInputBase-root": {
                        borderRadius: "inherit",
                        backgroundColor: "inherit",
                        ".MuiPickersOutlinedInput-notchedOutline": { border: "none" },
                        fontSize: "14px",
                        height: "52px",
                        // border: "1px solid #e1e1e1",
                        "& .MuiSelect-select": {
                          padding: 0,
                        },
                        "& .MuiInputBase-input": {
                          padding: 0,
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "2px 16px",
                        },
                      },
                    }}
                    className="w-full bg-primary-200 rounded-xl"
                    // label={"Month/Year"}
                    views={["month", "year"]}
                    value={formData?.date}
                    maxDate={dayjs()}
                    onChange={(newValue) => {
                      setFormData((prev) => ({ ...prev, date: newValue }));
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <DocumentUplaod required onSelect={(field, file) => handleFiles(field, file)} isViewOnly={isViewOnly} doc_path={formData.doc_path} />
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
              {disclosureId ? "Update" : "Add"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
