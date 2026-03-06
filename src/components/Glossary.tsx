"use client";
import { GlossaryImage } from "@/assets";
import Image from "next/image";
import { memo } from "react";

function Glossary({ GlossaryData }) {
  return (
    <div className="lg:grid lg:grid-cols-5 flex sm:flex-col flex-col-reverse lg:gap-0 gap-4 bg-white rounded-2xl">
      <div className="col-span-3 flex flex-col gap-10 p-5">
        <h3 className="hidden sm:flex text-2xl sm:text-3xl md:text-4xl font-bold text-quinary-100">Glossary</h3>
        <div className="flex flex-col gap-3">
          {GlossaryData.map((item, index) => (
            <div key={index} className="flex gap-3 text-sm sm:text-base">
              <p className="max-w-fit w-full h-full max-h-fit">{item.icon}</p>
              <p>
                <span className="font-bold">{item.title} </span>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2">
        <h3 className="text-2xl sm:hidden p-5 sm:text-3xl md:text-4xl font-bold text-quinary-100">Glossary</h3>
        <Image loading="lazy" src={GlossaryImage} alt="" className="!object-cover" />
      </div>
    </div>
  );
}

export default memo(Glossary);
