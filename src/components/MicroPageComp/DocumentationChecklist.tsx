"use client";

import { Box, Checkbox } from "@mui/material";
import { useState } from "react";

export interface ChecklistBlock {
  title: string;
  subtitle?: string;
  tag?: string;
  items: string[];
  note?: string;
}

export interface DocumentationChecklistProps {
  data: {
    header?: {
      title: string;
      description?: string;
    };
    cards: ChecklistBlock[];
  };
}

export default function DocumentationChecklist({ data }: DocumentationChecklistProps) {
  const { header, cards } = data;
  const [checked, setChecked] = useState(true);

  return (
    <section className="container mx-auto 2xl:px-8 px-4 flex flex-col gap-6">
      {/* Header */}
      {header && (
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-quinary-100">{header.title}</h3>
          {header?.description ? <p className="text-sm sm:text-base text-tertiary-500 text-center lg:text-left">{header.description}</p> : null}
        </div>
      )}

      {/* Checklist Card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_5px_rgba(0,0,0,0.1)] divide-y px-6">
        {cards.map((block, index) => (
          <div key={index} className="grid lg:grid-cols-5 gap-6 py-6">
            {/* Left Column */}
            <div className="lg:col-span-2 flex flex-col gap-1">
              <h4 className="font-semibold text-lg text-quinary-100">{block.title}</h4>
              {block.subtitle && <span className="font-semibold text-lg text-quinary-100">{block.subtitle}</span>}
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {block.tag && <span className="font-semibold text-quinary-100">{block.tag}:</span>}

              <ul className="flex flex-col gap-3">
                {block.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-tertiary-500">
                    <Checkbox
                      sx={{
                        padding: 0,
                      }}
                      checked
                      disabled
                      onChange={(e) => setChecked(e.target.checked)}
                      icon={
                        <Box
                          sx={{
                            width: 22,
                            height: 22,
                            border: "1.5px solid #525252",
                            borderRadius: "4px",
                            backgroundColor: "#ffffff",
                          }}
                        />
                      }
                      checkedIcon={
                        <Box
                          sx={{
                            width: 22,
                            height: 22,
                            border: "1.5px solid #1EB259",
                            borderRadius: "4px",
                            backgroundColor: "#E6F7EC",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 13L9 17L19 7" stroke="#1EB259" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Box>
                      }
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {block.note && (
                <p className="text-sm text-tertiary-500">
                  <span className="font-semibold text-quinary-100">Helpful to Include:</span> {block.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
