"use client";
import { apiHandler } from "@/api/apiHandler";
import { ContactBanner, ContactMobileBanner, Location, MailIcon, Phone } from "@/assets";
import { selectScreen, setIsLoading, setThankYouModal } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { EMAILS, handleKeyDown, ipAddress, ROUTES, TELS, URLS } from "@/utils/Constant";
import { isEmpty, showToast } from "@/utils/helper";
import { Box, Checkbox, FormControl, MenuItem, Select } from "@mui/material";
import moment from "moment";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BreadCrum = dynamic(() => import("@/components/BreadCrum"), {
  ssr: false,
});

const initialForm = {
  Type: "",
  FirstName: "",
  LastName: "",
  EmailAddress: "",
  Mx_State: "",
  Mx_City: "",
  Phone: "",
  Mx_Pincode: "",
  Terms_agree: "",
  Description: "",
  submit_time: "",
  ipAddress: "",
};

const typeDropDown = ["Inquiry", "Complaint", "Feedback"];

function ContactUs() {
  const dispatch = useAppDispatch();
  const currentScreen = useSelector(selectScreen);

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [filterObj, setFilterObj] = useState({
    stateId: "",
  });

  useEffect(() => {
    fetchState();
    fetchCity();
  }, [form.Mx_State]);

  const fetchCity = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.city.lookup(`stateId=${filterObj.stateId}`);

      if (status === 200 || status === 201) {
        setCities(data?.data);
      } else {
        showToast("error", data?.message);
      }
    } catch (err: any) {
      showToast("error", err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const fetchState = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.state.lookup();

      if (status === 200 || status === 201) {
        setStates(data?.data);
      } else {
        showToast("error", data?.message);
      }
    } catch (err: any) {
      showToast("error", err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const validateFields = useCallback((name: string, value: string) => {
    let error = "";

    switch (name) {
      case "Type":
        if (isEmpty(value)) {
          error = "Please select a type";
        }
        break;
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
        if (!emailRegex.test(value)) return "Enter valid email address.";
        break;
      case "Phone":
        if (!value.trim()) return "Please enter phone number.";
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) return "Enter valid 10-digit phone number.";
        break;
      case "Mx_Pincode":
        if (!value.trim()) return "Please enter pin code.";
        const pincodeRegex = new RegExp(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/);
        if (!pincodeRegex.test(value)) return "Enter valid pin code.";
        break;
      case "Terms_agree":
        console.log(value);

        if (!value.trim()) return "Please read and accept teams and conditions.";
        break;
      default:
        break;
    }

    return error;
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, maxLength } = e.target;

    if (type === "number") {
      if (Number(value) < 0 || value?.length > maxLength) return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: name === "Terms_agree" ? (e.target.checked ? "1" : "") : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateFields(name, name === "Terms_agree" ? (e.target.checked ? "1" : "") : value),
    }));
  }, []);

  const handleSubmit = async () => {
    const obj = { ...form },
      newErrors = {};
    obj.EmailAddress = obj.EmailAddress.trim().toLocaleLowerCase();
    obj.submit_time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    const requiredFields = ["Type", "FirstName", "LastName", "EmailAddress", "Phone", "Terms_agree"];

    requiredFields.forEach((field) => {
      const error = validateFields(field, obj[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    obj.ipAddress = await ipAddress();

    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.wpForm.contactUs(obj);

      if (status === 200 || status === 201) {
        setForm(initialForm);
        dispatch(setThankYouModal({ open: true, formType: "contact us", url: "" }));
        setErrors({});
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
    <div className="flex flex-col gap-12">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r sm:from-black/60 from-black/70 sm:via-transparent via-black/30 to-black/0"></div>
        {currentScreen?.isXS ? (
          <Image fetchPriority="high" loading="eager" priority={true} src={ContactMobileBanner} alt="Contact Us Ratnaafin" className="!object-cover !w-full" />
        ) : (
          <Image
            fetchPriority="high"
            loading="eager"
            priority={true}
            src={ContactBanner}
            alt="Contact Us Ratnaafin"
            className=" !object-cover object-right w-full"
          />
        )}
        <div className="absolute inset-0 2xl:px-8 px-4 container mx-auto flex 2xl:h-fit 2xl:top-1/4 items-end sm:bottom-0 bottom-5 sm:items-center sm:justify-start">
          <div className="clip-custom flex flex-col gap-3 md:gap-6 lg:gap-12 sm:bg-black/15 w-full sm:max-w-[480px] lg:max-w-[680px] xl:max-w-[750px] sm:border sm:border-white/10 sm:backdrop-blur-[5px] rounded-l-2xl rounded-tr-[110px] md:rounded-tr-[130px] xl:rounded-tr-[125px] sm:p-4 md:p-6 lg:p-10">
            <div className="sm:block hidden">
              <BreadCrum />
            </div>
            <div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
              <h2 className="text-white text-[22px] md:text-3xl lg:text-4xl font-bold">
                Need Financial Guidance?
                <br />
                Contact Us Today!
              </h2>
              <h1 className="text-white">Get expert financial advice tailored to your needs - reach out now!</h1>
            </div>
            <div>
              <button
                className="bg-secondary-600 hover:bg-white md:text-base text-xs text-white hover:text-quinary-100 transition-all px-4 py-2 rounded-full"
                onClick={() => {
                  const section = document.getElementById("get-in-touch-form");

                  if (section) {
                    const yOffset = -190;
                    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

                    window.scrollTo({
                      top: y,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                Request a Callback
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-senary-100 py-10">
        <div className="container mx-auto grid lg:grid-cols-2 gap-5 2xl:px-8 px-4 items-center">
          <div className="flex flex-col gap-8 lg:gap-4">
            <div className="flex flex-col gap-3 justify-center">
              <p className="text-quinary-100 font-bold text-xl sm:text-3xl md:text-4xl">We’d Love to Hear from You</p>
              <p className="text-black text-sm sm:text-base">
                We’re happy to assist you with any query, request or complaint you may have. Kindly fill out the form by selecting your query type. Our team
                will get in touch with you to get it resolved at the earliest.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-quinary-100 text-lg sm:text-2xl">Communication Address</p>
              <Link href={URLS.MAPS_THE_RIDGE} target="_blank" className="flex gap-2 sm:text-base text-sm">
                <Location />
                2nd and 3rd Floor, The Ridge, Opposite <br /> Novotel, Iscon Char Rasta, Ahmedabad, <br /> Gujarat - 380060
              </Link>
              <p className="text-base font-semibold">Corporate Inquiries:</p>
              <div className="flex gap-2">
                <Link href={`tel:${TELS.CON_INFO}`} className="flex gap-2 sm:text-base text-sm">
                  <Phone />
                  {TELS.CON_INFO}
                </Link>{" "}
                |
                <Link href={`mailto:${EMAILS.CON_INFO}`} className="flex gap-2 sm:text-base text-sm">
                  <MailIcon />
                  {EMAILS.CON_INFO}
                </Link>
              </div>
              <p className="text-base font-semibold">Service Inquiries:</p>
              <div className="flex gap-2">
                <Link href={`tel:${TELS.INFO}`} className="flex gap-2 sm:text-base text-sm">
                  <Phone />
                  {TELS.INFO}
                </Link>{" "}
                |
                <Link href={`mailto:${EMAILS.INFO}`} className="flex gap-2 sm:text-base text-sm">
                  <MailIcon />
                  {EMAILS.INFO}
                </Link>
              </div>
            </div>
            {/* <div className="flex flex-col gap-3">
              <p className="font-semibold text-quinary-100 text-lg sm:text-2xl">Grievance Redressal Officer</p>
              <Link href={URLS.MAPS_THE_RIDGE} target="_blank" className="flex gap-2 text-sm sm:text-base">
                <Location />
                3rd Floor, The Ridge, Opposite <br /> Novotel, Iscon Char Rasta,
                <br />
                Ahmedabad, Gujarat - 380060
              </Link>
              <Link href={`mailto:${EMAILS.GRIEVANCE}`} className="flex gap-2 text-sm sm:text-base">
                <MailIcon />
                {EMAILS.GRIEVANCE}
              </Link>
              <Link href={`tel:${TELS.GRIEVANCE}`} className="flex gap-2 text-sm sm:text-base">
                <Phone />
                {TELS.GRIEVANCE}
              </Link>
            </div> */}
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col gap-6" id="get-in-touch-form">
            <div>
              <h2 className="text-xl md:text-3xl sm:text-4xl text-quinary-100 font-bold mb-2">Get in Touch</h2>
              <p className="text-sm sm:text-base text-tertiary-500">Have questions or need support? We are just a call away!</p>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <FormControl
                  sx={{
                    minWidth: 140,
                    width: "100%",
                    borderRadius: "5px",
                    backgroundColor: "#f3f4f6",
                  }}
                >
                  <Select
                    labelId="Type"
                    id="Type"
                    name="Type"
                    value={form.Type}
                    onChange={handleInputChange}
                    displayEmpty
                    renderValue={(value) => <span style={{ color: value ? "inherit" : "#777" }}>{value || "How may we help you?"}</span>}
                    classes={{
                      root: "!w-full",
                    }}
                    sx={{
                      borderRadius: "25px",
                      "& .MuiSelect-select": {
                        padding: "8px 12px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#777",
                      },
                    }}
                  >
                    {typeDropDown.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors?.Type && <p className="error-text mt-1 text-sm text-red-500">{errors?.Type}</p>}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormControl
                    sx={{
                      minWidth: 140,
                      borderRadius: "5px",
                      backgroundColor: "#f3f4f6",
                      height: "fit-content",
                    }}
                  >
                    <Select
                      labelId="state-label"
                      id="state"
                      name="Mx_State"
                      value={form.Mx_State}
                      onChange={(e) => {
                        setFilterObj((prev) => ({
                          ...prev,
                          stateId: states.find((item) => item?.state?.toLowerCase() === e.target.value?.toLowerCase())?._id,
                        }));
                        setForm((prev) => ({
                          ...prev,
                          Mx_City: "",
                        }));
                        handleInputChange(e);
                      }}
                      displayEmpty
                      renderValue={(value) => <span style={{ color: value ? "inherit" : "#777" }}>{value || "Select State"}</span>}
                      sx={{
                        borderRadius: "25px",
                        "& .MuiSelect-select": {
                          padding: "9.25px 12px",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#777",
                        },
                      }}
                    >
                      {states.map((item) => (
                        <MenuItem key={item?._id} value={item?.state}>
                          {item?.state}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    sx={{
                      minWidth: 140,
                      borderRadius: "5px",
                      backgroundColor: "#f3f4f6",
                      height: "fit-content",
                    }}
                    disabled={!form.Mx_State}
                  >
                    <Select
                      labelId="city-label"
                      id="city"
                      name="Mx_City"
                      value={form.Mx_City}
                      onChange={handleInputChange}
                      displayEmpty
                      renderValue={(value) => <span style={{ color: value ? "inherit" : "#777" }}>{value || "Select City"}</span>}
                      sx={{
                        borderRadius: "25px",
                        "& .MuiSelect-select": {
                          padding: "9.25px 12px",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#777",
                        },
                      }}
                    >
                      {cities.map((item) => (
                        <MenuItem key={item?._id} value={item?.city}>
                          {item?.city}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    placeholder="Phone Number *"
                    type="number"
                    name="Phone"
                    value={form?.Phone}
                    maxLength={10}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  />
                  {errors?.Phone && <p className="error-text mt-1 text-sm text-red-500">{errors?.Phone}</p>}
                </div>
                <div>
                  <input
                    placeholder="Pincode"
                    type="number"
                    name="Mx_Pincode"
                    value={form.Mx_Pincode}
                    maxLength={6}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  />
                  {errors?.Mx_Pincode && <p className="error-text mt-1 text-sm text-red-500">{errors?.Mx_Pincode}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1  gap-4">
                <div>
                  <textarea
                    rows="4"
                    placeholder="Write a Message"
                    type="textarea"
                    name="Description"
                    value={form.Description}
                    onChange={handleInputChange}
                    className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="gap-2 flex-col">
              <div className="gap-2 flex">
                <Checkbox
                  disableRipple
                  sx={{
                    padding: 0,
                  }}
                  id="terms"
                  name="Terms_agree"
                  checked={form.Terms_agree == "1" ? true : false}
                  onChange={handleInputChange}
                  icon={
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        border: "1.5px solid #525252",
                        borderRadius: "4px",
                        backgroundColor: "#ffffff",
                      }}
                    />
                  }
                  checkedIcon={
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        border: "1.5px solid #1EB259",
                        borderRadius: "4px",
                        backgroundColor: "#E6F7EC",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="#1EB259" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Box>
                  }
                />
                <label htmlFor="terms" className="block text-tertiary-500 text-sm cursor-pointer">
                  I here by confirm that I have read, understood and agree to the{" "}
                  <Link href={ROUTES.client.termsAndConditions} className="text-secondary-600">
                    T&C
                  </Link>{" "}
                  and{" "}
                  <Link href={ROUTES.client.privacyPolicy} className="text-secondary-600">
                    Privacy Policy
                  </Link>
                  , and I agree to receive communications and authorize Ratnaafin Capital to contact me through SMS, Email, RCS and WhatsApp (this shall
                  override any registration done by myself under DNC/NDNC)
                </label>
              </div>
              {errors?.Terms_agree && <p className="error-text mt-1 text-sm text-red-500">{errors?.Terms_agree}</p>}
            </div>

            <button
              onClick={handleSubmit}
              className="rounded-full w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
            >
              <span className="relative z-10">Submit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ContactUs);
