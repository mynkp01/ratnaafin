"use client";
import Image from "next/image";
import { memo } from "react";

function KeyBenefits({ KeyBenefitsData, imageClassName = "" }) {
  return (
    <div className="flex flex-col gap-6">
      <h4 className="font-bold text-2xl text-quinary-100">Key Benefits</h4>
      <div className="lg:flex grid gap-6">
        <div className="w-full">
          <Image loading="lazy" src={KeyBenefitsData?.image} alt={KeyBenefitsData?.alt} className={`!h-full !w-full !object-cover ${imageClassName}`} />
        </div>
        <div className="bg-white rounded-2xl p-5 lg:w-[1100px] flex flex-col gap-6">
          {KeyBenefitsData.data.map((item, i) => (
            <div key={i} className="flex flex-col gap-3">
              <h5 className="font-bold text-xl sm:text-2xl text-quinary-100">{item.title}</h5>
              <ul className="list-disc pl-7 flex flex-col gap-2 text-tertiary-500 text-sm sm:text-base">
                {item.list.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(KeyBenefits);
