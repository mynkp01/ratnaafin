"use client";
import Image from "next/image";
import { memo } from "react";

function EligibilityAndDocuments({ EligibilityAndDocumentsData }) {
  return (
    <div className="flex flex-col gap-8" id="eligibilitydocuments">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Eligibility and Documents</h3>
        <p className="lg:text-left text-center w-full text-sm sm:text-base text-tertiary-500">
          Ensure you meet the criteria and have all required documents ready for a smooth process.
        </p>
      </div>

      {EligibilityAndDocumentsData.map((item, index) => (
        <div key={index} className="grid lg:grid-cols-5 items-center gap-2 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-xl">
          <div className="lg:col-span-2 w-full h-full">
            <Image loading="lazy" src={item.image} alt={item?.alt} className="lg:rounded-none lg:rounded-l-xl rounded-xl h-full w-full object-cover" />
          </div>
          <div className="lg:col-span-3 flex flex-col gap-6 p-5">
            {item.sections.map((section, i) => (
              <div key={i} className="space-y-2">
                <h5 className="font-bold text-xl sm:text-2xl text-quinary-100">{section.title}</h5>
                <ul className="divide-y">
                  {section.list.map((point, j) => (
                    <li className="py-3 text-quinary-100 text-sm sm:text-base" key={j}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(EligibilityAndDocuments);
