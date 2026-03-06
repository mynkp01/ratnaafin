import { logout } from "@/redux/slices/authSlice";
import { store } from "@/redux/store/store";
import { ROUTES } from "@/utils/Constant";
import { decrypt, isAdminRoute } from "@/utils/helper";
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export const apiClient = axios.create({ baseURL });
apiClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject({
      error,
      message: error?.response?.data?.message || "Something Went Wrong !!",
    });
  },
);
apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject({
      error,
      message: error?.response?.data?.message || "Something Went Wrong !!",
    });
  },
);

export const adminApiClient = axios.create({ baseURL });
adminApiClient.interceptors.request.use(
  function (config) {
    const token = decrypt(Cookies.get("token") || "");

    if (!config.headers.Authorization) {
      if (isAdminRoute()) {
        config.headers.Authorization = token ? `Bearer ${token}` : null;
      }
    }

    return config;
  },

  function (error) {
    return Promise.reject({
      error,
      message: error?.response?.data?.message || "Something Went Wrong !!",
    });
  },
);
adminApiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      if (isAdminRoute()) {
        Cookies.remove("token");
        store.dispatch(logout());
      }

      if (window) {
        window.location.href = ROUTES.admin.signIn;
      }
    }
    return Promise.reject({
      error,
      message: error?.response?.data?.message || "Something Went Wrong !!",
    });
  },
);
