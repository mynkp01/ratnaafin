"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface InfoCard {
  title: string;
  items: string[];
  steps?: string;
}

interface InfoSectionProps {
  data?: {
    image?: any;
    header?: {
      title?: string;
      description?: string;
    };
    cards?: InfoCard[];
  };
}

export default function LoanApplicationProcess({ data }: InfoSectionProps) {
  const header = data?.header ?? {};
  const cards = data?.cards ?? [];
  const image = data?.image;

  const lineRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!lineRef.current || stepsRef.current.length === 0) return;

    // Reset
    gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top" });

    // Vertical progress line animation
    gsap.to(lineRef.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: stepsRef.current[0],
        start: "top 65%",
        endTrigger: stepsRef.current[stepsRef.current.length - 1],
        end: "bottom 65%",
        scrub: true,
      },
    });

    // Step dots animation
    stepsRef.current.forEach((step) => {
      const dot = step.querySelector(".bg-green-500");
      if (!dot) return;

      gsap.fromTo(
        dot,
        { scale: 0.5, opacity: 0.3 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top center+=50",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [cards]);

  return (
    <section className="w-full flex flex-col gap-8">
      <div className="container mx-auto 2xl:px-8 flex flex-col gap-8 px-4">
        {header?.title && (
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-quinary-100 text-center lg:text-left">{header.title}</h3>
            {header.description && <p className="text-sm sm:text-base text-tertiary-500 text-center lg:text-left">{header.description}</p>}
          </div>
        )}
      </div>

      <div className="container mx-auto 2xl:px-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start bg-white p-6 rounded-xl shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
          <div className="relative flex flex-col gap-10 pt-10">
            <div className="absolute left-[71px] top-0 bottom-2 w-1 bg-primary-200 rounded-full" />
            <div ref={lineRef} className="absolute left-[71px] top-0 bottom-2 w-1 bg-green-500 rounded-full" />

            {cards.map((block, index) => (
              <div key={index} ref={(el) => el && (stepsRef.current[index] = el)} className="relative flex gap-6 items-start">
                <div className="relative flex items-start gap-3 min-w-[80px]">
                  <p className="font-semibold text-quinary-100">{block.steps}</p>

                  <div className="absolute top-1 left-16 border bg-white p-1 rounded-full z-10">
                    <p className="h-2 w-2 rounded-full bg-green-500" />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className="text-lg font-bold text-quinary-100">{block.title}</h4>

                  <ul className="flex flex-col gap-2">
                    {block.items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-tertiary-500 text-sm sm:text-base">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-tertiary-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky image from dataset */}
          <div className="sticky top-52">
            <div className="relative w-full rounded-xl overflow-hidden shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
              {image && <Image src={image} alt="Loan approved" className="object-cover" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
