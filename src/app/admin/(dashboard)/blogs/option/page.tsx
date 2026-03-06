"use client";
import { apiHandler } from "@/api/apiHandler";
import CustomInput from "@/components/CustomInput";
import FetchDropdown from "@/components/FetchDropdown";
import InputImage from "@/components/InputImage";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { LOOKUP_VALUES } from "@/utils/Constant";
import { isEmpty } from "@/utils/helper";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { showToast } from "src/utils/helper";

const CKEditorComp = dynamic(() => import("@/components/CKEditorComp"), {
  ssr: false,
});
const FAQManager = dynamic(() => import("./FAQManager"), {
  ssr: false,
});

interface FAQ {
  question: string;
  answer: string;
  order: number;
}

interface FormData {
  title: string;
  Url: string;
  content: string;
  doc_path: string;
  previewImg: string;
  meta_title: string;
  meta_description: string;
  alt_text: string;
  meta_keyword: string;
  categoryId: string[];
  faqs: FAQ[];
  doc_paths?: string[];
}

const initialFormData: FormData = {
  title: "",
  Url: "",
  content: "",
  doc_path: "",
  previewImg: "",
  meta_title: "",
  meta_description: "",
  alt_text: "",
  meta_keyword: "",
  categoryId: [],
  faqs: [],
  doc_paths: [],
};

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const isViewOnly = searchParams.get("view") === "1";
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const fetchblog = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.blog.get(blogId);
      if (status === 200) {
        const blog = data.data;
        setFormData((prev) => ({
          ...prev,
          title: blog?.title || "",
          Url: blog?.Url || "",
          content: blog?.content || "",
          doc_path: blog?.doc_path || "",
          previewImg: blog?.previewImg || "",
          meta_title: blog?.meta_title || "",
          meta_description: blog?.meta_description || "",
          categoryId: blog?.categoryId || [],
          alt_text: blog?.alt_text || "",
          meta_keyword: blog?.meta_keyword || "",
          faqs: blog?.faqs || [],
          doc_paths: blog?.doc_paths || [],
        }));
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [blogId, dispatch]);

  useEffect(() => {
    if (blogId) {
      fetchblog();
    }
  }, [blogId]);

  const validateFields = useCallback((name: string, value: any) => {
    let error = "";

    switch (name) {
      case "title":
        if (isEmpty(value)) error = "Please enter a title";
        break;
      case "Url":
        if (isEmpty(value)) error = "Please enter a url";
        break;
      case "content":
        if (isEmpty(value)) error = "Please enter a content";
        break;
      case "meta_title":
        if (isEmpty(value)) error = "Please enter a meta title";
        break;
      case "meta_description":
        if (isEmpty(value)) error = "Please enter a meta description";
        break;
      case "categoryId":
        if (isEmpty(value)) error = "Please select a category";
        break;
      case "alt_text":
        if (isEmpty(value)) error = "Please enter alternative image text";
        break;
      case "alt_text":
        if (isEmpty(value)) error = "Please enter alternative image text";
        break;
      case "meta_keyword":
        if (isEmpty(value)) error = "Please enter meta keyword";
        break;
      case "doc_path":
        if (!(value instanceof File && value.name) && !(typeof value === "string" && value.trim() !== "")) {
          error = "Please upload image";
        }
        break;
    }

    return error;
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // eslint-disable-next-line prefer-const
      let { name, value } = e.target;

      if (name === "Url") {
        value = value.toLocaleLowerCase().trim();
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
    [validateFields, blogId],
  );

  const handleFetchDropdownChange = useCallback((name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: Array.isArray(value) ? value.map((item) => item._id) : value?._id || "" }));
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
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: validateFields(e.target.name, ""),
      }));
    }
  }, []);

  const handleDeletedBlogFile = useCallback(async (doc_paths: string[]) => {
    setFormData((prev) => ({
      ...prev,
      doc_paths: doc_paths || [],
    }));
  }, []);

  const removeImage = useCallback((field: string, previewField: string) => {
    setFormData((prev) => ({ ...prev, [field]: "", [previewField]: "" }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isViewOnly) return;

    const newErrors: Record<string, string> = {};
    const requiredFields = ["title", "Url", "content", "meta_title", "meta_description", "doc_path", "alt_text", "meta_keyword"];

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
    fd.append("title", formData.title);
    fd.append("Url", formData.Url);
    fd.append("categoryId", formData?.categoryId?.toString());
    fd.append("content", formData.content);
    fd.append("meta_title", formData.meta_title);
    fd.append("meta_description", formData.meta_description);
    fd.append("doc_path", formData.doc_path);
    fd.append("meta_keyword", formData.meta_keyword);
    fd.append("alt_text", formData.alt_text);
    fd.append("faqs", JSON.stringify(formData?.faqs));
    fd.append("doc_paths", JSON.stringify(formData?.doc_paths));

    try {
      dispatch(setIsLoading(true));

      const { data, status } = blogId ? await apiHandler.blog.patch(blogId, fd) : await apiHandler.blog.post(fd);

      if ([200, 201].includes(status)) {
        showToast("success", data?.message);
        // router.push(ROUTES.admin.blog);
        window.close();
      } else {
        showToast("error", data?.message);
      }
    } catch (err) {
      showToast("error", err?.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [isViewOnly, formData, validateFields, blogId, dispatch, router]);

  return (
    <div className="border-wh-300 flex flex-col items-center gap-4 rounded-2xl border bg-white">
      <div className="flex w-full flex-col gap-4 p-4 md:p-6">
        <h1 className="text-xl font-bold">{blogId ? (isViewOnly ? "View Blog" : "Edit Blog") : "Add New Blog"}</h1>
        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
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
            <CustomInput label="URL" name="Url" placeholder="Enter url" value={formData?.Url} onChange={handleInputChange} disabled={isViewOnly} required />
            {errors.Url && <p className="error-text mt-1 text-sm text-red-500">{errors?.Url}</p>}
          </div>
          <div className="flex-1">
            <FetchDropdown
              label="Category"
              placeholder="Select Category"
              containerClass="!mt-0"
              value={formData.categoryId}
              endPoints={apiHandler.value.lookup}
              filterStr={`value=${LOOKUP_VALUES.BLOGS_CATEGORY}`}
              func={handleFetchDropdownChange}
              objKey="categoryId"
              display="name"
              multiple
              isComponentDisabled={isViewOnly}
            />
            {errors.categoryId && <p className="error-text mt-1 text-sm text-red-500">{errors.categoryId}</p>}
          </div>
          <div className="flex-1">
            <CustomInput
              label="Meta title"
              name="meta_title"
              placeholder="Enter meta title"
              value={formData?.meta_title}
              onChange={handleInputChange}
              disabled={isViewOnly}
              required
            />
            {errors.meta_title && <p className="error-text mt-1 text-sm text-red-500">{errors.meta_title}</p>}
          </div>
          <div className="flex-1">
            <CustomInput
              label="Meta keyword"
              name="meta_keyword"
              placeholder="Enter meta keyword"
              value={formData?.meta_keyword}
              onChange={handleInputChange}
              disabled={isViewOnly}
              required
            />
            {errors.meta_keyword && <p className="error-text mt-1 text-sm text-red-500">{errors.meta_keyword}</p>}
          </div>
          <div className="flex-1">
            <CustomInput
              label="Alternative image text"
              name="alt_text"
              placeholder="Enter alternative image text"
              value={formData?.alt_text}
              onChange={handleInputChange}
              disabled={isViewOnly}
              required
            />
            {errors.alt_text && <p className="error-text mt-1 text-sm text-red-500">{errors.alt_text}</p>}
          </div>

          <div className="col-span-full flex-1">
            <CustomInput
              label="Meta description"
              name="meta_description"
              placeholder="Enter meta description"
              value={formData?.meta_description}
              onChange={handleInputChange}
              disabled={isViewOnly}
              isTextArea
              required
            />
            {errors.meta_description && <p className="error-text mt-1 text-sm text-red-500">{errors.meta_description}</p>}
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
              value={formData.content}
              handleDeletedBlogFile={handleDeletedBlogFile}
              showImageUpload
              onChange={(data) => {
                setFormData((prev) => ({ ...prev, content: data }));
                setErrors((prev) => ({
                  ...prev,
                  content: "",
                }));
              }}
            />
            {errors.content && <p className="error-text mt-1 text-sm text-red-500">{errors.content}</p>}
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

          <FAQManager faqs={formData.faqs} onChange={(faqs) => setFormData((prev) => ({ ...prev, faqs }))} disabled={isViewOnly} />
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
              {blogId ? "Update" : "Add"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
