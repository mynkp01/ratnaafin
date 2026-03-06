"use client";
import { Trusted, TrustedImage } from "@/assets";
import { selectScreen } from "@/redux/slices/utilSlice";
import Image from "next/image";
import { memo } from "react";
import { useSelector } from "react-redux";

const TrustedBy = () => {
  const currentScreen = useSelector(selectScreen);

  return (
    <>
      {currentScreen?.isXS ? (
        <div className="px-2.5">
          <Trusted className="!size-full" alt="trusted image" />
        </div>
      ) : (
        <div className="relative">
          <div className="flex justify-center items-center">
            <Image
              loading="lazy"
              src={TrustedImage.src}
              width={500}
              height={500}
              alt="trusted image"
              className="2xl:!w-[430px] !object-cover xl:!w-[310px] md:!w-[350px] sm:!w-[300px] !w-[250px] h-auto"
            />
          </div>
          <div className="absolute sm:-left-6 sm:top-8 md:left-0 md:top-11 lg:left-32 lg:top-10 xl:-left-10 xl:top-10 2xl:-left-10 2xl:top-20 flex flex-col gap-1 items-end">
            <p className="text-xl text-quinary-100 font-bold flex text-right">
              Competitive <br /> Interest Rates
            </p>
            <p className="text-base text-tertiary-500">
              starting from 1%<sup>*</sup> per month
            </p>
          </div>
          <div className="absolute sm:bottom-20 sm:left-12 md:bottom-24 md:left-16 lg:left-48 lg:bottom-24 xl:left-7 xl:bottom-20 2xl:left-6 2xl:bottom-36 flex flex-col gap-1 items-end">
            <p className="text-xl text-quinary-100 font-bold flex text-right">
              Quick Loan <br /> Approval
            </p>
            <p className="text-base text-tertiary-500">
              within 48<sup>*</sup> hours
            </p>
          </div>
          <div className="absolute sm:right-0 inset-y-0 md:right-6 lg:right-36 xl:-right-4 2xl:-right-6 justify-center flex flex-col gap-1">
            <p className="text-xl text-quinary-100 font-bold flex">
              Instant Eligibility <br /> Check
            </p>
            <p className="text-base text-tertiary-500">Fast Approval Status</p>
          </div>
          <div className="absolute sm:right-0 inset-y-0 md:right-11 lg:right-40 lg:bottom-2 xl:-right-4 xl:bottom-0 2xl:right-8 justify-end flex flex-col gap-1">
            <p className="text-xl text-quinary-100 font-bold flex">Tailored Financing</p>
            <p className="text-base text-tertiary-500">to meet your specific business needs</p>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(TrustedBy);
