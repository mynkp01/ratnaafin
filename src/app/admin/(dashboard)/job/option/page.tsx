"use client";
import { apiHandler } from "@/api/apiHandler";
import CustomInput from "@/components/CustomInput";
import FetchDropdown from "@/components/FetchDropdown";
import FetchStyledDropdown from "@/components/FetchStyledDropdown";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { LOOKUP_VALUES } from "@/utils/Constant";
import { isEmpty } from "@/utils/helper";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

const CKEditorComp = dynamic(() => import("@/components/CKEditorComp"), {
  ssr: false,
});

interface FormData {
  title: string;
  description: string;
  experience: string;
  jobTypeId: string;
  cityId: string[];
  status: boolean;
  workType: string;
}

const initialFormData: FormData = {
  title: "",
  description: "",
  experience: "",
  jobTypeId: "",
  cityId: [],
  status: true,
  workType: "",
};

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");
  const isViewOnly = searchParams.get("view") === "1";
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const workTypeArr = [
    { _id: "Full Time", name: "Full Time" },
    { _id: "Part Time", name: "Part Time" },
  ];
  const fetchBranchLocationDetails = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.job.get(jobId);

      if (status === 200) {
        const job = data.data;
        setFormData((prev) => ({
          ...prev,
          title: job?.title || "",
          description: job?.description || "",
          experience: job?.experience || "",
          jobTypeId: job?.jobTypeId || "",
          cityId: job?.cityId || [],
          status: true,
          workType: job?.workType || "",
        }));
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [jobId, dispatch]);

  useEffect(() => {
    if (jobId) {
      fetchBranchLocationDetails();
    }
  }, [jobId]);

  const validateFields = useCallback((name: string, value: string) => {
    let error = "";

    switch (name) {
      case "title":
        if (isEmpty(value)) error = "Please enter a title";
        break;
      case "description":
        if (!value.trim()) return "Please enter a description";
        break;
      case "experience":
        if (isEmpty(value)) error = "Please enter a experience";
        break;
      case "jobTypeId":
        if (isEmpty(value)) error = "Please select job type";
        break;
      case "workType":
        if (isEmpty(value)) error = "Please select work type";
        break;
      case "cityId":
        if (isEmpty(value)) error = "Please select city";
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
    [validateFields, jobId]
  );

  const handleFetchDropdownChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: Array.isArray(value) ? value.map((item) => item._id) : value?._id || "",
    }));

    setErrors((prevState) => {
      const newState = { ...prevState };
      newState[name] = "";
      return newState;
    });
  };

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

    try {
      dispatch(setIsLoading(true));

      const { data, status } = jobId ? await apiHandler.job.patch(jobId, formData) : await apiHandler.job.post(formData);

      if ([200, 201].includes(status)) {
        showToast("success", data?.message);
        // router.push(ROUTES.admin.job);
        window.close();
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [isViewOnly, formData, validateFields, jobId, dispatch, router]);

  return (
    <div className="border-wh-300 flex flex-col items-center gap-4 rounded-2xl border bg-white">
      <div className="flex w-full flex-col gap-4 p-4 md:p-6">
        <h1 className="text-xl font-bold">{jobId ? (isViewOnly ? "View Job" : "Edit Job") : "Add New Job"}</h1>
        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-3">
          <div className="flex-1">
            <CustomInput
              label="Title"
              name="title"
              placeholder="Enter title"
              value={formData?.title}
              onChange={handleInputChange}
              disabled={isViewOnly}
              required
            />
            {errors?.title && <p className="error-text mt-1 text-sm text-red-500">{errors?.title}</p>}
          </div>
          <div className="flex-1">
            <CustomInput
              label="Experience"
              name="experience"
              placeholder="Enter experience"
              value={formData?.experience}
              onChange={handleInputChange}
              disabled={isViewOnly}
              required
            />
            {errors.experience && <p className="error-text mt-1 text-sm text-red-500">{errors?.experience}</p>}
          </div>
          <div className="flex-1">
            <FetchDropdown
              label="Job Type"
              placeholder="Select job type"
              containerClass="!mt-0"
              value={formData.jobTypeId}
              endPoints={apiHandler.value.lookup}
              filterStr={`value=${LOOKUP_VALUES.JOB_TYPE}`}
              func={handleFetchDropdownChange}
              objKey="jobTypeId"
              display="name"
              required
              isComponentDisabled={isViewOnly}
            />
            {errors.jobTypeId && <p className="error-text mt-1 text-sm text-red-500">{errors.jobTypeId}</p>}
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-[10px] col-span-full">
            <div>
              <FetchDropdown
                label="City"
                placeholder="Select city"
                containerClass="!mt-0"
                value={formData?.cityId}
                endPoints={apiHandler.city.lookup}
                filterStr={`NA`}
                func={handleFetchDropdownChange}
                objKey="cityId"
                display="city"
                required
                multiple
                isComponentDisabled={isViewOnly}
              />
              {errors.cityId && <p className="error-text mt-1 text-sm text-red-500">{errors.cityId}</p>}
            </div>
            {/* <div key="dropDownValues?.status?._id" className="w-full sm:w-[30%] md:w-[20%]"> */}
            <div key="dropDownValues?.status?._id">
              <FetchStyledDropdown
                label="Work Type"
                containerClass="!mt-0"
                placeholder="Select Work type"
                func={handleFetchDropdownChange}
                display="name"
                arr={workTypeArr}
                objKey="workType"
                required
                value={formData.workType}
                isComponentDisabled={isViewOnly}
                multiple={false}
              />
            </div>
          </div>
          <div className="col-span-full">
            <style>
              {`
                .ck-editor__editable {
                  height: 300px !important;
                }
              `}
            </style>
            <CKEditorComp
              value={formData.description}
              onChange={(data) => {
                setFormData((prev) => ({ ...prev, description: data }));
              }}
              // maxChars={500}
            />
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
              {jobId ? "Update" : "Add"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
