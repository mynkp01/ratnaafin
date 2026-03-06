"use client";
import { selectScreen, setScreen } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";

const ThankYouModal = dynamic(() => import("@/components/ThankYouModal"), {
  ssr: false,
});
const YouTubeModal = dynamic(() => import("@/components/YouTubeModal"), {
  ssr: false,
});

export const Canonicals = memo(() => {
  const pathname = usePathname();
  return <link rel="canonical" href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${pathname}`} />;
});

Canonicals.displayName = "Canonicals";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const currentScreen = useSelector(selectScreen);
  const theme = createTheme({
    typography: {
      fontFamily: "inherit !important",
    },
  });

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          const yOffset = -240;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        } else {
          // Retry after DOM is loaded
          setTimeout(() => {
            const retryElement = document.querySelector(hash);
            if (retryElement) {
              const yOffset = -240;
              const y = retryElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }, 100);
        }
      }
    };

    // Initial delay to allow page content to load
    setTimeout(handleHashScroll, 500);
    // }, [window?.location?.hash]);
  }, []);

  useEffect(() => {
    let rafId: number;
    const reSizeScreen = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        dispatch(
          setScreen({
            isXS: window.matchMedia("(max-width: 639px)").matches,
            isSM: window.matchMedia("(min-width: 640px)").matches,
            isMD: window.matchMedia("(min-width: 768px)").matches,
            isLG: window.matchMedia("(min-width: 1024px)").matches,
            isXL: window.matchMedia("(min-width: 1280px)").matches,
            is2XL: window.matchMedia("(min-width: 1536px)").matches,
          })
        );
      });
    };

    requestAnimationFrame(reSizeScreen);
    window.addEventListener("resize", reSizeScreen);

    const safeRequestIdleCallback = (callback, timeout) => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(callback, { timeout });
      } else {
        // Fallback for browsers that don't support requestIdleCallback, like Safari
        setTimeout(callback, timeout);
      }
    };

    // Use requestIdleCallback for non-critical CSS loading
    safeRequestIdleCallback(() => {
      Promise.all([
        import("swiper/css"),
        import("swiper/css/autoplay"),
        import("ckeditor5/ckeditor5.css"),
        import("react-toastify/dist/ReactToastify.css"),
      ]).catch(() => null);
    }, 2000);

    return () => {
      window.removeEventListener("resize", reSizeScreen);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        {currentScreen?.isXS || currentScreen?.isSM || currentScreen?.isMD || currentScreen?.isLG || currentScreen?.isXL || currentScreen?.is2XL
          ? children
          : null}
      </ThemeProvider>
      <YouTubeModal />
      <ThankYouModal />
    </>
  );
}
