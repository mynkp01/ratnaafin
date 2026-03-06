"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

interface InfoCard {
  image?: string;
  description?: string;
  line1?: string;
  line2?: string;
  number?: number;
}
interface InfoSectionProps {
  data?: {
    header?: {
      title?: string;
      description?: string;
    };
    cards?: InfoCard[];
  };
}

gsap.registerPlugin(ScrollTrigger);

export default function LoanEmiProcess({ data }: InfoSectionProps) {
  const { header } = data;

  const sectionRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const progress = progressLineRef.current;
    const items = itemsRef.current;

    if (!section || !progress || !items.length) return;

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;

    // RESET
    gsap.set(progress, {
      scaleX: isMobile ? 1 : 0,
      scaleY: isMobile ? 0 : 1,
      transformOrigin: isMobile ? "top center" : "left center",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 70%",
        scrub: true,
      },
    });

    // Progress animation
    tl.to(progress, {
      scaleX: isMobile ? 1 : 1,
      scaleY: isMobile ? 1 : 1,
      ease: "none",
      duration: 1.5,
    });

    items.forEach((item, i) => {
      const circle = item.querySelector(".icon-circle");
      const icon = item.querySelector(".icon-inner");

      tl.to(circle, { backgroundColor: "#2FBF68", duration: 0.3 }, i / (items.length - 1));

      tl.to(icon, { color: "#ffffff", duration: 0.3 }, i / (items.length - 1));
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="container mx-auto 2xl:px-8 flex flex-col gap-8 px-4">
      {header && (
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-quinary-100 text-center lg:text-left">{header?.title}</h3>
          {header.description ? <p className="text-sm sm:text-base text-tertiary-500 text-center lg:text-left">{header?.description}</p> : null}
        </div>
      )}
      <div ref={sectionRef} className="relative w-full py-4 overflow-x-auto ">
        <div className="relative flex flex-col lg:flex-row gap-10 lg:gap-0 min-w-full justify-between">
          <div className="hidden lg:block absolute top-[100px] border-t border-dashed border-quinary-100" style={{ left: "12%", width: "76%" }} />

          <div
            ref={progressLineRef}
            className="hidden lg:block absolute top-[100px] border-t-2 border-primary-400 origin-left scale-x-0"
            style={{ left: "12%", width: "76%" }}
          />
          <div className="lg:hidden absolute left-1/2 top-0 h-full border-l border-dashed border-quinary-100" />

          <div ref={progressLineRef} className="lg:hidden absolute left-1/2 top-0 h-full border-l-2 border-primary-400 origin-top scale-y-0" />

          {data?.cards?.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className="relative w-full lg:w-[24%] flex flex-col  items-center text-center"
            >
              <h4 className={`mb-6 text-lg font-bold leading-snug text-center lg:block hidden ${index === 0 ? "text-green" : "text-quinary-100"}`}>
                {item?.line1}
                <br />
                {item?.line2}
              </h4>

              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute h-20 w-20 rounded-full border border-dashed border-quinary-100 z-0 bg-white" />
                <div className="icon-circle flex h-14 w-14 items-center justify-center rounded-full bg-quinary-100 z-10 transition-colors duration-300">
                  <span className="icon-inner text-white text-lg transition-colors duration-300">{String(item?.number).padStart(2, "0")}</span>
                </div>
              </div>
              <div className="lg:space-y-0 space-y-4 bg-white rounded-xl xl:h-[160px] lg:h-[175px] shadow-[0_2px_5px_rgba(0,0,0,0.1)] p-5">
                {item?.line1 && (
                  <h4 className={`text-lg font-bold leading-snug text-center lg:hidden ${index === 0 ? "text-green" : "text-quinary-100"}`}>
                    {item?.line1}
                    <br />
                    {item?.line2}
                  </h4>
                )}
                <div className="text-sm md:text-base text-quinary-100">{item?.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
