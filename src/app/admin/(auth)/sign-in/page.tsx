"use client";
import { apiHandler } from "@/api/apiHandler";
import { Logo } from "@/assets";
import { setUser } from "@/redux/slices/authSlice";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { ROUTES } from "@/utils/Constant";
import { encrypt, isEmpty, showToast } from "@/utils/helper";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminSignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const onChangeText = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const validateFields = (label: string, value: string) => {
    let error = "";

    switch (label) {
      case "email":
        if (!value.trim()) error = "Please enter your email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid Email!";
        break;
      case "password":
        if (!value.trim()) error = "Please enter your password";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [label]: error }));
    return { ...errors, [label]: error };
  };

  const handleSubmit = async () => {
    let newErrors = {};
    const requiredFields = ["email", "password"];

    requiredFields.forEach((field) => {
      const err = validateFields(field, details[field]);
      if (err[field]) {
        newErrors[field] = err[field];
      }
    });

    if (Object.keys(newErrors)?.length === 0) {
      try {
        dispatch(setIsLoading(true));
        const res = await apiHandler.admin.signIn(details);
        if ((res.status === 200 || res.status === 201) && !isEmpty(res?.data.data)) {
          showToast("success", res?.data.message);
          const data = res?.data?.data;

          Cookies.set("token", encrypt(data?.token), { expires: 30 });
          dispatch(setUser(data));
          router.push(ROUTES.admin.adminUser);
        }
      } catch (error) {
        showToast("error", error.response?.data?.message || error.message);
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  };

  return (
    <div
      className="flex h-full min-h-screen w-full items-center justify-center bg-cover bg-[center_center] sm:p-5 sm:px-3 sm:py-5"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col">
        <div className="h-full w-full rounded-[20px] bg-slate-50 p-10 shadow-loginContainerShadow md:w-[60vw] lg:p-16 xl:w-[40vw]">
          <div className="flex flex-col justify-center">
            <div className="mr-auto sm:mb-10">
              <Logo className="h-32 w-32 sm:h-full sm:w-full" />
            </div>
            <h3 className="mb-4 text-4xl font-semibold tracking-[-2px] text-primary-800 lg:text-5xl">Welcome to Admin Panel</h3>

            <div
              className="flex w-full flex-col gap-4"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            >
              <div className="flex flex-col gap-1">
                <label className="m-1 font-medium">Email :</label>
                <input
                  placeholder="Email Address"
                  id="email"
                  value={details.email}
                  onChange={onChangeText}
                  name="email"
                  className="rounded-md bg-white w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                />
                {errors?.email ? <p className="error-text">{errors?.email}</p> : null}
              </div>
              <div className="flex flex-col gap-1">
                <label className="m-1 font-medium">Password :</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={details.password}
                    onChange={(e) => {
                      onChangeText(e);
                    }}
                    placeholder="Please enter your password"
                    className="rounded-md bg-white w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 right-4 flex items-center ${errors?.password ? "" : ""}`}
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                  {errors?.password ? <p className="error-text">{errors?.password}</p> : null}
                </div>
              </div>

              {/* <div className="mt-8 flex w-full flex-col items-center gap-2 lg:mt-12 lg:flex-row lg:gap-"> */}
              <button className={`text-15-700 text-blue-700 border-blue-700 w-full rounded-xl border  px-4 py-2  lg:w-24`} onClick={handleSubmit}>
                <p>Sign In</p>
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
