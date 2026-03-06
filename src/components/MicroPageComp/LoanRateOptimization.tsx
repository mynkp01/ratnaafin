"use client";
import { selectScreen } from "@/redux/slices/utilSlice";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

gsap.registerPlugin(ScrollTrigger);

function LoanRateOptimization({ data, ref: sectionRef }: { data: any; ref: any }) {
  const overviewData = data.cards;
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const currentScreen = useSelector(selectScreen);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!pinWrapperRef.current || !sectionRef?.current || !currentScreen?.isLG) return;

    const trigger = ScrollTrigger.create({
      trigger: pinWrapperRef.current,
      start: `top 210px`,
      end: `+=${overviewData.items.length * 300}vh`,
      pin: sectionRef?.current,
      scrub: 1,
      pinSpacing: true,
      anticipatePin: 1,
      pinType: "fixed",
      onUpdate: (self) => {
        const index = Math.min(overviewData.items.length - 1, Math.floor(self.progress * overviewData.items.length));
        setActiveIndex(index);
      },
    });
    return () => trigger.kill();
  }, [overviewData.items.length, currentScreen]);

  useEffect(() => {
    if (!contentRef.current || !imageRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(contentRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }).fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" },
      "-=0.6",
    );
    return () => {
      tl.kill();
    };
  }, [activeIndex]);
  const activeItem = overviewData.items[activeIndex];

  return (
    <>
      <div ref={pinWrapperRef} className="!w-full !max-w-full lg:block hidden">
        <div className="flex container mx-auto 2xl:px-8 px-4 w-full flex-col gap-8">
          <h3 className="text-2xl font-bold text-quinary-100">{data.header.title}</h3>
          <div className="grid lg:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-[0_2px_5px_rgba(0,0,0,0.1)] min-h-[420px]">
            <div ref={contentRef} className="flex flex-col justify-center gap-5" style={{ perspective: 1200 }}>
              <h4 className="text-lg font-semibold text-quinary-100">{activeItem.title}</h4>
              <p className="text-tertiary-500 text-sm sm:text-base leading-8 xl:w-[95%]">{activeItem.description}</p>
            </div>
            <div ref={imageRef} className="relative rounded-xl overflow-hidden h-[200px] sm:h-[350px] xl:h-[430px] w-full" style={{ perspective: 1200 }}>
              <Image src={activeItem.image} alt={activeItem.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden container mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          grabCursor={true}
          loop
          modules={[Autoplay]}
          speed={800}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
          }}
          watchSlidesProgress={false}
          className="mySwiper"
        >
          <div>
            <h3 className="text-2xl font-bold text-quinary-100">{data.header.title}</h3>
            {data.cards.items.map((item, index) => (
              <SwiperSlide key={index} className="py-4">
                <div className="grid lg:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-[0_2px_5px_rgba(0,0,0,0.1)] min-h-[420px]">
                  <div className="flex flex-col justify-center gap-2">
                    <h4 className="text-lg font-semibold text-quinary-100">{item.title}</h4>
                    <p className="text-tertiary-500 text-sm sm:text-base leading-normal xl:w-[95%]">{item.description}</p>
                  </div>
                  <div className="relative rounded-xl overflow-hidden h-[200px] sm:h-[350px] xl:h-[430px] w-full">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </>
  );
}

export default LoanRateOptimization;
