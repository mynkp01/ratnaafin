"use client";
import { apiHandler } from "@/api/apiHandler";
import CustomInput from "@/components/CustomInput";
import FetchDropdown from "@/components/FetchDropdown";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { generateValueCode } from "@/utils/Constant";
import { isEmpty } from "@/utils/helper";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

interface FormData {
  state: string;
  value_code: string;
  countryId: string;
}

const initialFormData: FormData = {
  state: "",
  value_code: "",
  countryId: "",
};

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const stateId = searchParams.get("id");
  const isViewOnly = searchParams.get("view") === "1";
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const fetchStateDetails = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.state.get(stateId);

      if (status === 200 || status === 201) {
        const state = data.data;
        setFormData((prev) => ({
          ...prev,
          state: state.state || "",
          value_code: state.value_code || "",
          countryId: state.countryId || "",
        }));
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [stateId, dispatch]);

  useEffect(() => {
    if (stateId) {
      fetchStateDetails();
    }
  }, [stateId]);

  const validateFields = useCallback((name: string, value: string) => {
    let error = "";

    switch (name) {
      case "state":
        if (isEmpty(value)) error = "Please enter a state";
        break;
      case "countryId":
        if (isEmpty(value)) error = "Please select countryId";
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
        ...(name === "state" && !stateId ? { value_code: generateValueCode(value) } : {}),
      }));
      setErrors((prev) => ({
        ...prev,
        [name]: validateFields(name, value),
      }));
    },
    [validateFields, stateId]
  );

  const handleFetchDropdownChange = useCallback((name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value?._id || "" }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isViewOnly) return;

    const newErrors: Record<string, string> = {};
    const requiredFields = ["state", "countryId"];

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

      const { data, status } = stateId ? await apiHandler.state.patch(stateId, formData) : await apiHandler.state.post(formData);

      if ([200, 201].includes(status)) {
        showToast("success", data?.message);
        // router.push(ROUTES.admin.state);
        window.close();
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [isViewOnly, formData, validateFields, stateId, dispatch, router]);

  return (
    <div className="border-wh-300 flex flex-col items-center gap-4 rounded-2xl border bg-white">
      <div className="flex w-full flex-col gap-4 p-4 md:p-6">
        <h1 className="text-xl font-bold">{stateId ? (isViewOnly ? "View State" : "Edit State") : "Add New State"}</h1>
        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-3">
          <div className="flex-1">
            <CustomInput
              label="State"
              name="state"
              placeholder="Enter state"
              value={formData?.state}
              onChange={handleInputChange}
              disabled={isViewOnly}
              required
            />
            {errors?.state && <p className="error-text mt-1 text-sm text-red-500">{errors?.state}</p>}
          </div>
          <div className="flex-1">
            <CustomInput
              label="Value Code"
              name="value_code"
              toolTipText="This is an internal reference code that cannot be modified after creation. It is used for backend operations only and will not be displayed elsewhere."
              placeholder="Value code will be auto-generated"
              value={formData.value_code}
              onChange={handleInputChange}
              disabled={isViewOnly}
              required
            />
            {errors.value_code && <p className="error-text mt-1 text-sm text-red-500">{errors.value_code}</p>}
          </div>
          <div className="flex-1">
            <FetchDropdown
              label="Country"
              placeholder="Select country"
              containerClass="!mt-0"
              value={formData.countryId}
              endPoints={apiHandler.country.lookup}
              filterStr="NA"
              func={handleFetchDropdownChange}
              objKey="countryId"
              display="name"
              required
              isComponentDisabled={isViewOnly}
            />
            {errors.countryId && <p className="error-text mt-1 text-sm text-red-500">{errors.countryId}</p>}
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
              {stateId ? "Update" : "Add"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
