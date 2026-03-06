"use client";
import {
  Calendar,
  Clock,
  HeroBannerBL,
  HeroBannerCSL,
  HeroBannerLAP,
  HeroBannerML,
  InterestRate,
  MobileBannerBL,
  MobileBannerCSL,
  MobileBannerLAP,
  MobileBannerML,
} from "@/assets";
import { selectScreen } from "@/redux/slices/utilSlice";
import { formatKey } from "@/utils/helper";
import Image from "next/image";
import { memo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

const HeroSectionData = [
  {
    _id: 0,
    image: HeroBannerBL,
    mobile: MobileBannerBL,
    alt: "Apply for Business Loan Online at Lowest Interest Rate",
    title: "Aap business sambhalo, <br />Loan hum sambhal lenge",
    titleRender: (
      <>
        Aap business sambhalo, <br />
        Loan hum sambhal lenge
      </>
    ),
    description: "Get the financial backing your business deserves",
    button: "Apply for Business Loan",
    key: "Business Loan",
    box: [
      {
        icon: <InterestRate className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "Interest Rate <br /> From 1.2%<sup>*</sup> P.M.",
      },
      {
        icon: <Clock className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "48<sup>*</sup> Hours <br /> Turn-Around Time",
      },
      {
        icon: <Calendar className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "Flexible Tenure: <br /> 12 to 36 Months",
      },
    ],
  },
  {
    _id: 1,
    image: HeroBannerCSL,
    mobile: MobileBannerCSL,
    alt: "Eligibility And Documents Business Loan",
    title: "Profit ka raasta ab <br />Chhat se ho kar jayega",
    titleRender: (
      <>
        Profit ka raasta ab <br />
        Chhat se ho kar jayega
      </>
    ),
    description: "Power your business with solar savings",
    button: "Apply for Solar Loan",
    key: "Commercial/Industrial Solar Finance",
    box: [
      {
        icon: <InterestRate className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "Interest Rate <br /> From 1.00%<sup>*</sup> P.M.",
      },
      {
        icon: <Clock className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "48<sup>*</sup> Hours <br /> Turn-Around Time",
      },
      {
        icon: <Calendar className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "Flexible Tenure: <br /> 12 to 84 Months",
      },
    ],
  },
  {
    _id: 2,
    image: HeroBannerLAP,
    mobile: MobileBannerLAP,
    alt: "Minimum Credit Score For Business Loan",
    title: "Property ka fayda, <br /> Financial freedom ka raasta",
    titleRender: (
      <>
        Property ka fayda, <br />
        Financial freedom ka raasta
      </>
    ),
    description: "Get the financial backing your business deserves",
    button: "Apply for Loan Against Property",
    key: "Loan Against Property",
    box: [
      {
        icon: <InterestRate className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "Interest Rate <br /> From 1.10%<sup>*</sup> P.M.",
      },
      {
        icon: <Clock className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "48<sup>*</sup> Hours <br /> Turn-Around Time",
      },
      {
        icon: <Calendar className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "Flexible Tenure: <br /> 12 to 144 Months",
      },
    ],
  },
  {
    _id: 3,
    image: HeroBannerML,
    mobile: MobileBannerML,
    alt: "Apply for a Business Loan up to ₹75 Lakh",
    title: "Ab machine chalegi aur <br /> Business daudega",
    titleRender: (
      <>
        Ab machine chalegi aur <br />
        Business daudega
      </>
    ),
    description: "Empower your business with the right machinery",
    button: "Apply for Machinery Loan",
    key: "Machinery Loan",
    box: [
      {
        icon: <InterestRate className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "Interest Rate <br /> Less than 1%<sup>*</sup> P.M.",
      },
      {
        icon: <Clock className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "48<sup>*</sup> Hours <br /> Turn-Around Time",
      },
      {
        icon: <Calendar className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "Flexible Tenure: <br /> 12 to 84 Months",
      },
    ],
  },
];

const HeroSection = ({ handleTabClick }) => {
  const currentScreen = useSelector(selectScreen);

  const swiperRef = useRef<SwiperRef>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-fit relative">
      <Swiper
        ref={swiperRef}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex(swiper.realIndex);
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        spaceBetween={30}
        speed={1000} // Reduce animation duration
        loop
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            const isActive = className.includes("swiper-pagination-bullet-active");
            const backgroundColor = isActive ? "#f8f8f8" : "#1EB259";
            return `<span class="${className}" style=" width: 25px; height: 5px; border-radius: 5px; background-color: ${backgroundColor}; margin: 0 5px; display: inline-block;"></span>`;
          },
        }}
        modules={[EffectFade, Autoplay]}
        lazyPreloadPrevNext={1}
        className="my-swiper !h-full"
        autoplay={{
          delay: 10000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
          waitForTransition: false,
        }}
        slidesPerView={1}
        watchSlidesProgress={false} // Disable slide progress watching
        // preventInteractionOnTransition={true}
      >
        {HeroSectionData.map((item, i) => (
          <SwiperSlide key={item._id} className="custom-slide-animation">
            <div className="relative w-full">
              <Image
                fetchPriority={"high"}
                loading={"eager"}
                quality={currentScreen?.isXS ? 50 : 90}
                priority
                src={currentScreen?.isXS ? item?.mobile : item?.image}
                width={currentScreen?.isXS ? 448 : 1920}
                height={currentScreen?.isXS ? 380 : 500}
                sizes="(max-width: 640px) 448px, 1920px"
                className={`!object-cover !w-full ${currentScreen?.isXS ? "!h-[380px]" : "!h-full object-right sm:!h-[550px] xl:!h-[550px] 2xl:!h-[650px]"}`}
                alt={item?.alt}
                placeholder="blur"
              />
              <div className="absolute w-full h-full inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/70 via-black/50 sm:from-black/30 sm:via-transparent to-black/0"></div>
              <div className="absolute inset-0 2xl:px-8 px-4 container mx-auto flex items-center sm:justify-start">
                <div className="clip-customsxl absolute top-1/2 -translate-y-1/2 h-[406px] sm:bg-black/15 w-full sm:max-w-[700px] sm:border sm:border-white/10 sm:backdrop-blur-[9px] rounded-l-2xl rounded-tr-[150px] flex flex-col justify-center gap-6 sm:gap-12 sm:p-10">
                  <div className="flex flex-col gap-3 sm:gap-8">
                    <div className="flex flex-col gap-2 xs:gap-3">
                      <h2
                        key={activeIndex}
                        className="text-white text-[22px] sm:text-4xl font-bold"
                        dangerouslySetInnerHTML={{ __html: formatKey(item.title) }}
                      ></h2>
                      {i === 0 ? <h1 className="text-white text-base">{item.description}</h1> : <h2 className="text-white text-base">{item.description}</h2>}
                    </div>
                    <div className="flex gap-2 sm:gap-9">
                      {Array.isArray(item.box) &&
                        item.box.map((box, index) => (
                          <div
                            key={index}
                            className={`flex flex-col gap-2 text-white pr-2 sm:pr-8 ${index !== item.box?.length - 1 ? "border-r border-gray-200/20" : ""}`}
                          >
                            <div className="text-2xl">{box.icon}</div>
                            <p className="xs:text-sm text-xs" dangerouslySetInnerHTML={{ __html: box.text }}></p>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-secondary-600 hover:bg-white xs:text-base text-xs text-white hover:text-quinary-100 transition-all px-4 py-2 rounded-full"
                      onClick={() => handleTabClick(item?.key)}
                    >
                      {item.button}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-5 sm:bottom-10 xl:bottom-20 2xl:left-[16%] xl:left-[12%] lg:left-[18%] sm:left-[22%] left-1/4 transform -translate-x-1/2 z-10 flex gap-2">
        {HeroSectionData.map((_, index) => (
          <button
            key={index}
            className={`w-8 h-2 rounded-full ${index === activeIndex ? "bg-primary-400" : "bg-white/40"}`}
            onClick={() => swiperRef?.current?.slideToLoop(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default memo(HeroSection);
