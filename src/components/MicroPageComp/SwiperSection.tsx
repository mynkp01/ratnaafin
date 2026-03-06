"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface InfoCard {
  id: string | number;
  image: any;
  title?: string;
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

export default function SwiperSection({ data }: InfoSectionProps) {
  const { header, cards = [] } = data || {};

  return (
    <div className="flex flex-col gap-8 container mx-auto 2xl:px-8 px-4">
      {/* Header */}
      {header && (
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-quinary-100 lg:text-left text-center">{header?.title}</h3>

          {header?.description ? <p className="text-sm sm:text-base text-tertiary-500 text-center lg:text-left">{header?.description}</p> : null}
        </div>
      )}

      {/* Swiper */}
      <div>
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
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4.5,
              spaceBetween: 24,
            },
          }}
          watchSlidesProgress={false}
          className="mySwiper"
        >
          {cards.map((item) => (
            <SwiperSlide key={item.id} className="py-4">
              <div className="flex group flex-col gap-4 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-xl max-h-full h-full">
                <div className="overflow-hidden rounded-t-xl">
                  <Image
                    loading="lazy"
                    src={item?.image?.src ?? item?.image}
                    width={1920}
                    height={100}
                    className="!object-cover !w-full !h-full rounded-t-xl group-hover:scale-105 transition-all duration-300 !overflow-hidden"
                    alt={item?.title || "loan-solution"}
                  />
                </div>

                <div className="flex flex-col gap-1 p-4 pt-0 md:h-[95px] justify-between">
                  <h4 className="text-lg font-semibold">{item?.title}</h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
