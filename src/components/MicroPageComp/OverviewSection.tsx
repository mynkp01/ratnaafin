"use client";
import Image from "next/image";

interface InfoCard {
  image?: string;
  description1?: string;
  description2?: string;
}

interface InfoSectionProps {
  data?: {
    header?: {
      title?: string;
      description?: string;
    };
    cards?: InfoCard;
  };
}

function OverviewSection({ data }: InfoSectionProps) {
  return (
    <div className="container mx-auto flex flex-col gap-8 2xl:px-8 px-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-quinary-100 lg:text-left text-center">{data?.header?.title}</h3>
        <p className="lg:text-left text-center w-full text-sm sm:text-base text-tertiary-500">{data?.header?.description}</p>
      </div>
      <div className="grid lg:grid-cols-5 gap-5 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-xl p-5">
        <div className="lg:col-span-3">
          <Image loading="lazy" src={data?.cards?.image} alt="business loan explained" className="!object-cover rounded-xl" />
        </div>
        <div className="relative lg:col-span-2">
          <p className="text-tertiary-500 text-sm sm:text-base">{data?.cards?.description1}</p>
          <p className="text-tertiary-500 text-sm sm:text-base">{data?.cards?.description2}</p>
        </div>
      </div>
    </div>
  );
}

export default OverviewSection;
