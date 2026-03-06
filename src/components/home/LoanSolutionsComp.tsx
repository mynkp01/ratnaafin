"use client";
import { selectScreen } from "@/redux/slices/utilSlice";
import { LoanSolutions } from "@/utils/Constant";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const LoanEligibility = dynamic(() => import("@/components/LoanEligibility"));

const LoanSolutionsComp = ({ handleTabClick }) => {
  const currentScreen = useSelector(selectScreen);
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? LoanSolutions : LoanSolutions.slice(0, 4);

  return (
    <div className="container mx-auto flex flex-col gap-12 py-12 2xl:px-8 px-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Loan Solutions</h3>
          <p className="text-center w-full text-sm sm:text-base text-tertiary-500">
            Flexible loans with competitive rates and quick approvals to meet your financial needs.
          </p>
        </div>
        {currentScreen?.isXS ? (
          <div className="flex flex-col gap-4">
            {visibleItems.map((item) => (
              <Link href={item?.href} key={item._id} className="flex flex-col gap-4 bg-white shadow-xl rounded-xl">
                <div className="overflow-hidden rounded-t-xl">
                  <Image
                    loading="lazy"
                    src={item.image.src}
                    width={1920}
                    height={100}
                    className="!object-cover !w-full !h-full rounded-t-xl group-hover:scale-105 transition-all duration-300 !overflow-hidden"
                    alt="loan-solution"
                  />
                </div>
                <div className="flex flex-col gap-2 p-4 pt-0">
                  <div className="flex justify-between items-center rounded-b-xl">
                    <h4 className="font-semibold">{item.title}</h4>
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevents Link navigation
                        e.stopPropagation(); // Stops event bubbling
                        handleTabClick(item?.key);
                      }}
                      className="rounded-full relative min-w-[90px] sm:w-full px-3 sm:px-5 py-2 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all text-nowrap before:duration-500 hover:before:left-0 hover:before:w-full"
                    >
                      <span className="relative z-10">Apply Now</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
            {LoanSolutions?.length > 4 && (
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className=" w-fit self-center rounded-full relative min-w-[90px] sm:w-full px-3 sm:px-5 py-2 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all text-nowrap before:duration-500 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10"> {showAll ? "View Less" : "View All"}</span>
              </button>
            )}
          </div>
        ) : (
          <div className="">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              navigation={true}
              grabCursor={true}
              breakpoints={{
                500: {
                  slidesPerView: 1.5,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              loop
              modules={[Autoplay, Navigation]} // Remove unnecessary modules
              speed={800} // Faster transitions
              className="mySwiper"
              autoplay={{
                delay: 6000, // Slightly longer delay
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
                waitForTransition: false,
              }}
              watchSlidesProgress={false}
              // preventInteractionOnTransition={true}
            >
              {LoanSolutions.map((item) => (
                <SwiperSlide key={item._id} className="py-4">
                  <div className="flex group flex-col gap-4 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-xl max-h-full h-full">
                    <div className="overflow-hidden rounded-t-xl">
                      <Image
                        loading="lazy"
                        src={item.image.src}
                        width={1920}
                        height={100}
                        className="!object-cover !w-full !h-full rounded-t-xl group-hover:scale-105 transition-all duration-300 !overflow-hidden"
                        alt="loan-solution"
                      />
                    </div>
                    <div className="flex flex-col gap-1 p-4 pt-0 md:h-[137px] justify-between">
                      <h4 className="text-xl font-semibold">{item?.title}</h4>
                      <div className="flex justify-between items-center border-t pt-3 rounded-b-xl">
                        <Link href={item?.href} className="hover:text-primary-400 transition-all">
                          {item?.link}
                        </Link>
                        <button
                          onClick={() => handleTabClick(item?.key)}
                          className="rounded-full relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
                        >
                          <span className="relative z-10">Apply Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
      <LoanEligibility />
    </div>
  );
};

export default memo(LoanSolutionsComp);
