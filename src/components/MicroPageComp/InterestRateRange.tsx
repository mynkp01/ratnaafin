"use client";

import Image from "next/image";

interface InterestRateHeading {
  title: string;
  description: string;
}

interface InterestRateRangeDataType {
  image: any;
  title: string;
  description: string;
  description1: string;
  list: string[];
  HeadingData: InterestRateHeading[];
}

interface InterestRateRangeProps {
  data: {
    cards: InterestRateRangeDataType;
  };
}

function InterestRateRange({ data }: InterestRateRangeProps) {
  const OverviewData = data.cards;
  const heading = OverviewData.HeadingData[0];

  return (
    <div className="container mx-auto flex flex-col gap-8 2xl:px-8 px-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-quinary-100 lg:text-left text-center">{heading.title}</h3>

        <p className="lg:text-left text-center w-full text-sm sm:text-base text-tertiary-500">{heading.description}</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-5 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-xl p-5">
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col pr-2">
            <p className="text-tertiary-500 text-sm sm:text-base">{OverviewData.description}</p>

            <p className="text-tertiary-500 text-sm sm:text-base">{OverviewData.description1}</p>
          </div>

          <div className="space-y-4">
            <p className="font-medium text-xl">{OverviewData.title}</p>

            <ul className="list-disc pl-5 flex flex-col gap-2 text-tertiary-500">
              {OverviewData.list.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative lg:col-span-2">
          <Image loading="lazy" src={OverviewData.image} alt="business loan explained" className="!object-cover rounded-xl" fill />
        </div>
      </div>
    </div>
  );
}

export default InterestRateRange;
