"use client";
import Image from "next/image";
import { memo } from "react";

function InterestRateCharges({ payload, text = "Know the applicable interest rates and all associated charges before you apply." }) {
  return (
    <div>
      <div className="flex flex-col gap-8" id="interestrate">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Interest Rate and Charges</h3>
          <p className="lg:text-left text-center w-full text-sm sm:text-base text-tertiary-500">{text}</p>
        </div>
        <div className="space-y-3">
          <div className="grid lg:grid-cols-2 lg:gap-0 gap-5 lg:p-0 p-5 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-2xl">
            <div className="lg:p-5 lg:order-1 order-2">
              <div className="divide-y overflow-x-auto xs:max-w-full max-w-[280px]">
                {payload?.data?.map((item, index) => (
                  <div key={index} className="flex justify-between w-full gap-3 py-3">
                    <p
                      key={index}
                      className="font-semibold text-quinary-100 text-sm sm:text-base text-wrap sm:text-nowrap"
                      dangerouslySetInnerHTML={{ __html: item?.title }}
                    ></p>
                    <p className="font-normal text-right" dangerouslySetInnerHTML={{ __html: item?.sub_title }} />
                  </div>
                ))}
              </div>
            </div>
            <Image
              loading="lazy"
              src={payload?.image_src}
              alt={payload?.alt}
              className="order-1 lg:rounded-none !rounded-r-2xl rounded-2xl h-full w-full object-cover"
            />
          </div>
          {/* <p className="font-semibold text-quinary-100 sm:text-base text-sm">
            For more details, please refer to the{" "}
            <button type="button" className="text-primary-400">
              {" "}
              Schedule of Charges
            </button>
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default memo(InterestRateCharges);
