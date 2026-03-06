"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

interface InfoCard {
  title?: string;
  image?: any;
  items?: { heading?: string; text?: string }[];
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

export default function ApprovalTipsStickySection({ data }: InfoSectionProps) {
  const { header, cards = [] } = data || {};

  const [activeIndex, setActiveIndex] = useState(0);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      ScrollTrigger.create({
        trigger: card,
        start: "top 60%",
        end: "bottom 60%",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!imageWrapperRef.current) return;

    gsap.fromTo(
      imageWrapperRef.current,
      {
        opacity: 0,
        scale: 0.96,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      },
    );
  }, [activeIndex]);

  return (
    <section className="w-full flex flex-col gap-8">
      <div className="container mx-auto 2xl:px-8 px-4 flex flex-col gap-8">
        {header && (
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-quinary-100 text-center lg:text-left">{header.title}</h3>
            {header.description && <p className="text-sm sm:text-base text-tertiary-500 text-center lg:text-left">{header.description}</p>}
          </div>
        )}
      </div>

      <div className="container mx-auto 2xl:px-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="flex flex-col gap-6">
            {cards.map((block, index) => (
              <div key={index} ref={(el) => (cardRefs.current[index] = el)} className="bg-white rounded-xl shadow-[0_2px_5px_rgba(0,0,0,0.1)] p-6 space-y-4">
                <Image src={block?.image} alt="Loan approved" className="object-cover lg:hidden rounded-xl" />
                <h4 className="text-lg font-bold text-quinary-100">{block.title}</h4>
                <div className="flex flex-col gap-4">
                  {block.items?.map((item, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <p className="font-semibold text-quinary-100">{item.heading}</p>
                      <p className="text-tertiary-500 text-sm sm:text-base">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="md:sticky top-52 lg:block hidden">
            <div
              ref={imageWrapperRef}
              className="relative h-[200px] sm:h-[350px] xl:h-[430px] w-full rounded-xl overflow-hidden shadow-[0_2px_5px_rgba(0,0,0,0.1)]"
            >
              <Image src={cards[activeIndex]?.image} alt="Loan approved" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
