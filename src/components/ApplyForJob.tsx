"use client";
import { apiHandler } from "@/api/apiHandler";
import {
  Bhavesh,
  CloseLight,
  Coma,
  Deepali,
  DeepanshiLal,
  JoinusTodayImage,
  KrunalSoni,
  MansiShah,
  Mayank,
  Mic,
  PdfLogo,
  RaviBhambhani,
  SachinKakkad,
  VishalKukadiya,
} from "@/assets";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { EMAILS, handleKeyDown } from "@/utils/Constant";
import { isEmpty, showToast } from "@/utils/helper";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const FetchDropdown = dynamic(() => import("@/components/FetchDropdown"), {
  ssr: false,
});

const HappyCustomer = dynamic(() => import("@/components/HappyCustomer"), {
  ssr: false,
});

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  stateId: "",
  cityId: "",
  jobTypeId: "",
  doc_path: {},
  previewPdf: "",
};
const employeeTestimonialsData = [
  {
    id: 1,
    name: "Deepali Shah",
    role: "Executive Assistant to Director",
    icon: <Coma />,
    feedback:
      "My role allows me to engage with various teams, ensuring that our initiatives are executed seamlessly. I take pride in being the glue that holds our projects together, and it’s incredibly rewarding to contribute to our collective vision. Being a woman in this dynamic environment empowers me to express my ideas and challenge the status quo. Every day brings new opportunities for growth and learning, and I’m excited to be part of a team that celebrates innovation and collaboration. Together, we’re not just building a company; we’re shaping a future where everyone’s voice matters!",
    image: Deepali,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
  {
    id: 2,
    name: "Mayank Panchal",
    role: "Assistant Manager - Business Support & MIS",
    icon: <Coma />,
    feedback:
      "Our work place buzzes with energy and collaboration. I’m grateful for my team; we always support each other, whether it's coordinating with the ground team or updating the business head on daily progress. Even on tough days, we turn challenges into opportunities and keep the spirit high. It truly makes our work environment special!",
    image: Mayank,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
  {
    id: 3,
    name: "Bhavesh Patel",
    role: "Vice President - Operations",
    icon: <Coma />,
    feedback:
      "I embrace the weight of responsibility that comes with my role, but the thrill of closing big deals makes it all worthwhile. Having worked here for the past 3-4 years, I've grown tremendously, thanks to the knowledge and guidance I've received along the way. The energy in our office is truly inspiring, and I appreciate how we all collaborate to achieve great things while building strong relationships. This adaptability to change has been key to our success, and I’m proud to be part of such a dynamic team!",
    image: Bhavesh,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-center",
  },
  {
    id: 4,
    name: "Deepanshi Lal",
    role: "Sr. Manager - Compliance",
    icon: <Coma />,
    feedback:
      "When I think about my five years at Ratnaafin, the first thing that comes to mind is the feeling of family. From day one, I was struck by how incredibly approachable and supportive everyone is, from the senior leadership to my own colleagues. It's this environment that gave me the confidence to not only learn the complexities of construction finance from scratch, but to thrive. To go from a trainee to a team lead in five years has been an incredible experience, and it’s all thanks to the people and the innovative culture we share.",
    image: DeepanshiLal,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
  {
    id: 5,
    name: "Krunal Soni",
    role: "Vice President II - Retail Underwriting",
    icon: <Coma />,
    feedback:
      "As a Chartered Accountant with a background in banking, I joined Ratnaafin three and a half years ago to lead our retail underwriting verticals. Honestly, I thought the journey would be straightforward. However, it was here that I learned the real meaning of underwriting. I discovered that true expertise isn't just about learning; it's about having the courage to unlearn and then relearn. With incredible support from my seniors, especially when facing new challenges, we've been able to foster a culture where we don't just face obstacles-we work together to turn every stone into a milestone.",
    image: KrunalSoni,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
  {
    id: 6,
    name: "Mansi Shah",
    role: "Senior Manager - HRM",
    icon: <Coma />,
    feedback:
      "In the five years I've been with Ratnaafin, I’ve seen our team grow from 50 to over 500 and my own career has followed a similar, incredible path. I began as an individual contributor and now lead a team of more than five. For me, this is the magic of Ratnaafin: growth isn't just a business metric; it's a personal journey that the organization empowers you to take. I am profoundly grateful to the management for trusting me with this opportunity.",
    image: MansiShah,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
  {
    id: 7,
    name: "Ravi Bhambhani",
    role: "Vice President II - Business",
    icon: <Coma />,
    feedback:
      "As the Vice President for our Business Loan, LAP, and Micro Loan verticals, my experience at RCPL has been incredibly enriching. My entire career before this was with large, established banks where the brand name did much of the heavy lifting. Joining RCPL opened my eyes. It taught me how to build a business from the ground up, based on pure strategy and execution. I discovered that when you move beyond a big brand, you have to master the real game: the art and science of distribution. That journey-from focusing on product analytics to mastering the market is a journey I completed right here. Today, I'm proud to say we are the number one service provider in our space, and we're now ready to take this successful model beyond the borders of Gujarat.",
    image: RaviBhambhani,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
  {
    id: 8,
    name: "Sachin Kakkad",
    role: "Cluster Business Manager",
    icon: <Coma />,
    feedback:
      "My journey with Ratnaafin over the past four and a half years has been one of incredible transformation. I began in our Advisory department with a very small team. Coming from a background in analytics, Ratnaafin gave me a remarkable opportunity to move directly into a client-facing role in asset syndication. It was a huge learning experience, and from that small beginning, I watched everything grow—our team grew, the company grew, and I was fortunate enough to grow right alongside it. Today, I have the privilege of heading our business for the Saurashtra, Kutch, and MP regions, including Indore and Bhopal. It’s been a truly rewarding journey.",
    image: SachinKakkad,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
  {
    id: 9,
    name: "Vishal Kukadiya",
    role: "Cluster Business Manager",
    icon: <Coma />,
    feedback:
      "Since joining Ratnaafin in April 2021, it’s been a fantastic learning curve for me. I came from a different background and had to master a new product, which was a great experience. But for me, that’s only half the story. What truly defines this company is its culture. It’s a culture that feels like family, where the company genuinely cares for the well-being of each and every employee. At the end of the day, business happens everywhere in the market. But a company that truly takes care of its people? That’s the most important thing, and that’s what we have here.",
    image: VishalKukadiya,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
];

function ApplyForJob({ selectedJob = "" }) {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    setForm((prev) => ({ ...prev, jobTypeId: selectedJob }));
  }, [selectedJob]);

  const validateFields = useCallback((name: string, value: string) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (isEmpty(value)) {
          error = "Please enter a first name";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          error = "Please enter only letters and numbers in first name";
        }
        break;
      case "lastName":
        if (isEmpty(value)) {
          error = "Please enter a last name";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          error = "Please enter only letters and numbers in last name";
        }
        break;
      case "email":
        if (!value.trim()) return "Please enter a email address.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Enter a valid email address.";
        break;
      case "phone":
        if (!value.trim()) return "Please enter a phone number.";
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) return "Enter a valid 10-digit phone number.";
        break;
      case "jobTypeId":
        if (isEmpty(value)) return "Please select job";
        break;
      case "doc_path":
        if (!(value instanceof File && value.name) && !(typeof value === "string" && value.trim() !== "")) {
          error = "Please upload resume";
        }
        break;

      default:
        break;
    }

    return error;
  }, []);

  const handleFetchDropdownChange = useCallback((name: string, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value?._id || "" }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async () => {
    const newErrors = {};
    const requiredFields = ["firstName", "lastName", "email", "phone", "jobTypeId", "doc_path"];
    requiredFields.forEach((field) => {
      const error = validateFields(field, form[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      dispatch(setIsLoading(true));
      const fd = new FormData();
      fd.append("firstName", form.firstName);
      fd.append("lastName", form.lastName);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("jobTypeId", form.jobTypeId);
      fd.append("doc_path", form.doc_path);
      if (form.cityId) fd.append("cityId", form.cityId);
      if (form.stateId) fd.append("stateId", form.stateId);

      const { data, status } = await apiHandler.ApplyForJob.post(fd);

      if ([200, 201].includes(status)) {
        showToast("success", data?.message);
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

  const handleFiles = useCallback((e: ChangeEvent<HTMLInputElement>, field: string, previewField: string) => {
    const files = e.target.files;

    if (files?.[0]) {
      console.log("fielddd", field);
      console.log("previewField", previewField);

      setForm((prev) => ({
        ...prev,
        [field]: files[0],
        [previewField]: URL.createObjectURL(files[0]),
      }));
      setErrors((prev) => ({
        ...prev,
        [field]: validateFields(field, files?.[0]),
      }));
    }
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Files dropped:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
      <div className="w-full bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-2xl p-6 flex flex-col gap-6">
        <h4 className="text-xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Join us Today</h4>
        <div className="grid lg:grid-cols-2 gap-4 ">
          <Image loading="lazy" src={JoinusTodayImage} alt="Contact Us Ratnaafin" className="!object-cover" />
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="FirstName" className="block mb-2 text-sm font-semibold text-quinary-100">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Enter first name"
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInputChange}
                  className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                />
                {errors?.firstName && <p className="error-text mt-1 text-sm text-red-500">{errors?.firstName}</p>}
              </div>
              <div>
                <label htmlFor="LastName" className="block mb-2 text-sm font-semibold text-quinary-100">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Enter last name"
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleInputChange}
                  className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                />
                {errors?.lastName && <p className="error-text mt-1 text-sm text-red-500">{errors?.lastName}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="joinustoday">
              <div>
                <label htmlFor="EmailAddress" className="block mb-2 text-sm font-semibold text-quinary-100">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Enter email address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                />
                {errors?.email && <p className="error-text mt-1 text-sm text-red-500">{errors?.email}</p>}
              </div>
              <div>
                <label htmlFor="MobileNumber" className="block mb-2 text-sm font-semibold text-quinary-100">
                  Mobile Number<span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Enter mobile number"
                  type="number"
                  name="phone"
                  value={form?.phone}
                  maxLength={10}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                />
                {errors?.phone && <p className="error-text mt-1 text-sm text-red-500">{errors?.phone}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <label htmlFor="state" className="block mb-2 text-sm font-semibold text-quinary-100">
                  State
                </label>

                <FetchDropdown
                  placeholder="Select state"
                  value={form.stateId}
                  endPoints={apiHandler.job.stateLookup}
                  filterStr="NA"
                  func={handleFetchDropdownChange}
                  objKey="stateId"
                  display="state"
                />
              </div>
              <div className="w-full">
                <label htmlFor="state" className="block mb-2 text-sm font-semibold text-quinary-100">
                  City
                </label>
                <FetchDropdown
                  placeholder="Select city"
                  value={form.cityId}
                  endPoints={apiHandler.job.cityLookup}
                  filterStr={`stateId=${form.stateId}`}
                  func={handleFetchDropdownChange}
                  objKey="cityId"
                  display="city"
                />
              </div>
            </div>
            <div>
              <label htmlFor="state" className="block mb-2 text-sm font-semibold text-quinary-100">
                Job Title
              </label>

              <FetchDropdown
                placeholder="Select job title"
                value={form.jobTypeId}
                endPoints={apiHandler.job.lookup}
                filterStr="NA"
                func={handleFetchDropdownChange}
                objKey="jobTypeId"
                display="title"
              />

              {errors?.jobTypeId && <p className="error-text mt-1 text-sm text-red-500">{errors?.jobTypeId}</p>}
            </div>
            <div
              {...getRootProps()}
              className="border-2 border-dashed cursor-pointer border-gray-300 rounded-md p-10 text-center flex flex-col items-center justify-center bg-white"
            >
              {!(form.doc_path instanceof File && form.doc_path.name) ? (
                <>
                  <input
                    {...getInputProps()}
                    accept="application/pdf"
                    onChange={(e) => {
                      handleFiles(e, "doc_path", "previewPdf");
                    }}
                  />
                  <p className="text-tertiary-500 font-medium mb-1">Upload Your Resume</p>
                </>
              ) : (
                <div className="flex gap-2 items-center w-full">
                  <PdfLogo />
                  <p className="text-left">{form.doc_path.name}</p>
                  <button className="ml-auto" onClick={() => setForm((prev) => ({ ...prev, previewPdf: "", doc_path: {} }))}>
                    <CloseLight />
                  </button>
                </div>
              )}
            </div>
            {errors?.doc_path && <p className="error-text mt-1 text-sm text-red-500">{errors?.doc_path}</p>}

            <button
              onClick={handleSubmit}
              className="rounded-full w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
            >
              <span className="relative z-10">Submit</span>
            </button>
          </div>
        </div>
      </div>
      {/* testimonial section */}
      <div className="flex flex-col gap-10" id="testimonial">
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Employee Testimonial</h3>
          <p className="text-center xl:w-1/2 w-full text-sm sm:text-base text-tertiary-500">Empowered Voices, Real Stories</p>
        </div>
        <HappyCustomer testimonials={employeeTestimonialsData} />
      </div>
      {/* newslatter section */}
      <div className="grid lg:grid-cols-5 lg:bg-gradient-to-r bg-gradient-to-t from-secondary-600 to-primary-400 rounded-2xl">
        <div className="flex flex-col gap-8 justify-center lg:col-span-3 p-5 sm:p-10 lg:p-14 lg:pr-0">
          <div className="flex flex-col gap-3">
            <p className="text-white font-semibold text-xl md:text-3xl sm:text-4xl">Didn’t Find the Job You’re Looking For?</p>
            <p className="text-white text-sm sm:text-base">
              We’re always on the lookout for talented individuals. If a current role doesn’t match your skill set, no need to worry! Send us your resume, and
              we’ll keep your profile in our talent pool for future opportunities that align with your strengths.
            </p>
            <p className="text-white text-sm sm:text-base">We’ll get in touch when a role that matches your profile opens up!</p>
          </div>
          <Link
            href={`mailto:${EMAILS.CAREERS}`}
            className="rounded-full w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
          >
            <span className="relative z-10">Email Us</span>
          </Link>
        </div>
        <div className="lg:col-span-2 w-full p-5 sm:p-8 md:p-14 flex justify-center items-center !pb-0">
          <Image loading="lazy" src={Mic.src} width={500} height={500} className="w-full h-full !object-cover" alt="mic" />
        </div>
      </div>
    </div>
  );
}

export default memo(ApplyForJob);
