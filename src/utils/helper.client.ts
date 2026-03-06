"use client";
import { useEffect, useState } from "react";
import { MICRO_PAGES_META_DATA } from "./Constant";

export const useSidebarState = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const sidebar = document.getElementById("sidebar");

    const checkSidebarState = () => {
      if (sidebar) {
        setIsSidebarOpen(sidebar.classList.contains("lg:w-full"));
      }
    };

    checkSidebarState();
    const observer = new MutationObserver(checkSidebarState);
    if (sidebar) {
      observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => observer.disconnect();
  }, []);

  return isSidebarOpen;
};

export const copyToClipboard = async (text: string = ""): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;

    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }

    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const updateMetaTags = (slug: string, from: "machineryLoan" | "businessLoan") => {
  const meta = MICRO_PAGES_META_DATA[from][slug];
  if (!meta) return;

  // Update title
  document.title = meta.title;

  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", meta.description);
  } else {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    metaDescription.setAttribute("content", meta.description);
    document.head.appendChild(metaDescription);
  }

  // Update Open Graph tags
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute("content", meta.title);
  } else {
    ogTitle = document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.setAttribute("content", meta.title);
    document.head.appendChild(ogTitle);
  }

  let ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute("content", meta.description);
  } else {
    ogDescription = document.createElement("meta");
    ogDescription.setAttribute("property", "og:description");
    ogDescription.setAttribute("content", meta.description);
    document.head.appendChild(ogDescription);
  }

  // Update Twitter Card tags
  let twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute("content", meta.title);
  } else {
    twitterTitle = document.createElement("meta");
    twitterTitle.setAttribute("name", "twitter:title");
    twitterTitle.setAttribute("content", meta.title);
    document.head.appendChild(twitterTitle);
  }

  let twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) {
    twitterDescription.setAttribute("content", meta.description);
  } else {
    twitterDescription = document.createElement("meta");
    twitterDescription.setAttribute("name", "twitter:description");
    twitterDescription.setAttribute("content", meta.description);
    document.head.appendChild(twitterDescription);
  }
};
