"use client";

import Image from "next/image";

interface InfoCard {
  label?: string;
  value?: string;
}

interface InfoSectionProps {
  data?: {
    header?: {
      title?: string;
      description?: string;
    };
    image: string;
    cards: InfoCard[];
  };
}

export default function EligibilityOverviewSection({ data }: InfoSectionProps) {
  const { header, cards } = data;
  return (
    <section className="container mx-auto 2xl:px-8 px-4 flex flex-col gap-8">
      {header && (
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-quinary-100 text-center lg:text-left">{header.title}</h3>
          {header.description ? <p className="text-sm sm:text-base text-tertiary-500 text-center lg:text-left">{header.description}</p> : null}
        </div>
      )}
      <div className="grid lg:grid-cols-5 gap-6 bg-white rounded-2xl shadow-[0_2px_5px_rgba(0,0,0,0.1)] p-6">
        {/* Image Section */}
        <div className="lg:col-span-2 relative w-full min-h-[260px] rounded-xl overflow-hidden">
          <Image src={data?.image} alt="Eligibility criteria for business loan" fill className="object-cover" priority={false} />
        </div>

        {/* Content Section */}
        <div className="lg:col-span-3 flex flex-col justify-center">
          <ul className="divide-y">
            {data?.cards?.map((item, index) => (
              <li key={index} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
                <span className="text-quinary-100 text-sm sm:text-base font-medium w-full">{item.label}</span>
                <span className="text-tertiary-500 text-sm sm:text-base text-left sm:w-full">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
