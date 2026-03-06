"use client";
import { AccordionIcon } from "@/assets";
import { memo, useEffect, useRef, useState } from "react";

const ScrollToTop = () => {
  const scrollToTopRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowScrollTop(true);
        scrollToTopRef.current?.classList.add("opacity-100");
      } else {
        setShowScrollTop(false);
        scrollToTopRef.current?.classList.remove("opacity-0");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {showScrollTop ? (
        <div
          ref={scrollToTopRef}
          tabIndex={0}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-24 right-8 z-40 flex size-8 rotate-180 cursor-pointer items-center justify-center rounded-lg bg-quinary-100 p-2.5 text-center text-sm text-white opacity-0 transition-all duration-200 hover:scale-110`}
        >
          <AccordionIcon className="h-5 min-h-5 w-5 min-w-5 text-white rotate-45 transform transition-transform duration-300" />
        </div>
      ) : null}
    </>
  );
};

export default memo(ScrollToTop);
