import CryptoJS from "crypto-js";
import { toast, ToastOptions } from "react-toastify";

const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
const iv = process.env.NEXT_PUBLIC_IV_KEY;
/* eslint-disable @typescript-eslint/no-explicit-any */
const defaultEncodingMap: any = {
  _: "__",
  "-": "_",
  " ": "-",
};

export const customDecodeURIComponent = (str?: string): string => {
  let decodedString = decodeURIComponent(str!);

  Object.keys(defaultEncodingMap)
    ?.reverse()
    ?.forEach((key) => {
      decodedString = decodedString?.replaceAll(defaultEncodingMap[key], key);
    });

  return decodedString;
};

const defaultToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const showToast = (type: "success" | "error" | "info" | "warning" | "default", content: string | React.ReactNode, options: ToastOptions = {}): void => {
  const toastOptions = { ...defaultToastOptions, ...options };

  switch (type) {
    case "success":
      toast.success(content, toastOptions);
      break;
    case "error":
      toast.error(content, toastOptions);
      break;
    case "info":
      toast.info(content, toastOptions);
      break;
    case "warning":
      toast.warning(content, toastOptions);
      break;
    default:
      toast(content, toastOptions);
  }
};

export function timeAgo(date: string) {
  const now: any = new Date();
  const past: any = new Date(date);
  const seconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return count === 1 ? `a ${interval.label} ago` : `${count} ${interval.label}s ago`;
    }
  }

  return "just now";
}

export const isAdminRoute = () => {
  return window.location.pathname.includes("/admin");
};

export const encrypt = (data) => {
  const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Hex.parse(key), {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
};

export const decrypt = (encryptedData) => {
  const decrypted = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Hex.parse(encryptedData) }, CryptoJS.enc.Hex.parse(key), {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const moveToApplyLoan = (id: string) => {
  const section = document.getElementById(id);

  if (section) {
    const yOffset = -190;
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }
};

export const formatKey = (str: string) => {
  const formatStr = str.replace(/_/g, " ");
  return formatStr
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const isEmpty = (value: any): boolean => {
  // Null or undefined
  if (value == null) return true;

  // Boolean or Number (not empty)
  if (typeof value === "boolean" || typeof value === "number") return false;

  // String or Array-like
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0;
  }

  // Map or Set
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  // ArrayBuffer or TypedArray
  if (ArrayBuffer.isView(value)) {
    return value.byteLength === 0;
  }

  // Object
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  return false;
};

export const generateSchema = (payload = []) => {
  return (
    payload?.map((item) => {
      const cleanAnswer = Array.isArray(item?.answer)
        ? item?.answer
            ?.join(" ")
            ?.replace(/&lt;[^&gt;]+&gt;/g, "")
            ?.replace(/<[^>]+>/g, "")
            ?.trim()
        : item?.answer
            ?.replace(/&lt;[^&gt;]+&gt;/g, "")
            ?.replace(/<[^>]+>/g, "")
            ?.trim();

      return {
        name: item?.question,
        question: item?.question,
        acceptedAnswer: cleanAnswer,
        answer: cleanAnswer,
      };
    }) || []
  );
};
