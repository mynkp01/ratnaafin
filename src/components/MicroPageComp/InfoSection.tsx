import Link from "next/link";
import React from "react";

interface InfoCard {
  icon?: React.ReactNode;
  title?: string;
  descriptions?: string[];
}

interface InfoSectionProps {
  data?: {
    header?: {
      title?: string;
      description?: string;
    };
    cards?: InfoCard[];
    link?: { link?: string; text?: string };
  };
  columns?: number;
  className?: string;
}

export default function InfoSection({ data, columns = 2, className }: InfoSectionProps) {
  const { header, cards, link } = data;
  return (
    <section className={`container mx-auto 2xl:px-8 py-10 flex flex-col gap-8 px-4 ${className}`}>
      {/* header */}
      {header && (
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-quinary-100 text-center lg:text-left">{header?.title}</h3>
          {header.description ? <p className="text-sm sm:text-base text-tertiary-500 text-center lg:text-left">{header?.description}</p> : null}
        </div>
      )}
      {/* Cards */}
      <div
        className={`grid gap-4 ${
          columns === 3
            ? "md:grid-cols-3"
            : columns === 4
              ? "md:grid-cols-4"
              : columns === 5
                ? "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
                : "md:grid-cols-2"
        }`}
      >
        {cards?.map((card, index) => (
          <div key={index} className="shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-xl p-6 flex flex-col gap-4">
            {card?.icon ? <div className="bg-quaternary-200 w-fit p-2 rounded-xl">{card?.icon}</div> : null}
            <h4 className="text-xl font-semibold text-quinary-100">{card?.title}</h4>
            {Array.isArray(card?.descriptions) &&
              card.descriptions.length > 0 &&
              (card.descriptions.length === 1 ? (
                <p className="text-tertiary-500">{card.descriptions[0]}</p>
              ) : (
                <ul className="list-disc pl-5 flex flex-col gap-2 text-tertiary-500">
                  {card.descriptions.map((text, i) => (
                    <li key={i}>{text}</li>
                  ))}
                </ul>
              ))}
          </div>
        ))}
      </div>
      {/* Link */}
      {link?.link ? (
        <div className="flex justify-center lg:justify-start">
          <Link href={link?.link} className="text-sm font-medium text-primary-500 hover:underline">
            {link?.text}
          </Link>
        </div>
      ) : null}
    </section>
  );
}
