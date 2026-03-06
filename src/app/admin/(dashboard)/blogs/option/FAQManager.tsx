"use client";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
  order: number;
}

interface FAQManagerProps {
  faqs: FAQ[];
  onChange: (faqs: FAQ[]) => void;
  disabled?: boolean;
}

export default function FAQManager({ faqs, onChange, disabled = false }: FAQManagerProps) {
  const [localFaqs, setLocalFaqs] = useState<FAQ[]>(faqs || []);

  const addFAQ = () => {
    const newFaq: FAQ = { question: "", answer: "", order: localFaqs.length };
    const updated = [...localFaqs, newFaq];
    setLocalFaqs(updated);
    onChange(updated);
  };

  const removeFAQ = (index: number) => {
    const updated = localFaqs.filter((_, i) => i !== index);
    setLocalFaqs(updated);
    onChange(updated);
  };

  const updateFAQ = (index: number, field: keyof FAQ, value: string | number) => {
    const updated = localFaqs.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq));
    setLocalFaqs(updated);
    onChange(updated);
  };

  return (
    <div className="col-span-full">
      <div className="flex justify-between items-center mb-4">
        <label className="text-xl font-bold">FAQs</label>
        {!disabled && (
          <button
            type="button"
            onClick={addFAQ}
            className="shadow-outer h-fit w-fit rounded-xl border border-blue-100 bg-primary-100 p-1.5 text-blue-100 sm:px-3 sm:py-2.5"
          >
            + Add FAQ
          </button>
        )}
      </div>

      <div className="space-y-4">
        {localFaqs.map((faq, index) => (
          <div key={index} className="border-wh-300 rounded-2xl border bg-white p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold">FAQ {index + 1}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeFAQ(index)}
                  className="text-15-700 btn-fill-hover h-fit w-fit rounded-xl border-2 border-red-500 bg-red-500 p-1.5 text-white sm:px-3 sm:py-2.5"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-[10px] md:grid-cols-12">
              <div className="md:col-span-11">
                <CustomInput
                  label="Question"
                  placeholder="Enter question"
                  value={faq.question}
                  onChange={(e) => updateFAQ(index, "question", e.target.value)}
                  disabled={disabled}
                  required
                />
              </div>
              <div className="md:col-span-1">
                <CustomInput
                  label="Order"
                  placeholder="Order"
                  type="number"
                  value={faq.order.toString()}
                  onChange={(e) => updateFAQ(index, "order", parseInt(e.target.value) || 0)}
                  disabled={disabled}
                />
              </div>
              <div className="md:col-span-12">
                <CustomInput
                  label="Answer"
                  placeholder="Enter answer"
                  value={faq.answer}
                  onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                  disabled={disabled}
                  isTextArea
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>
        ))}

        {localFaqs.length === 0 && (
          <div className="border-wh-300 rounded-2xl border bg-white p-8 text-center">
            <p className="text-gray-500">No FAQs added yet. Click "Add FAQ" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
