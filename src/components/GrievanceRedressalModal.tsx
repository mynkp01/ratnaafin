"use client";
import { Location, MailIcon, Phone } from "@/assets";
import { EMAILS, TELS, URLS } from "@/utils/Constant";
import { Modal } from "@mui/material";
import Link from "next/link";
import { memo } from "react";

interface GrievanceRedressalModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function GrievanceRedressalModal({ isOpen, setIsOpen }: GrievanceRedressalModalProps) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby="grievance-modal-title" aria-describedby="grievance-modal-description">
      <div className="absolute top-1/2 left-1/2 w-[320px] xs:w-[400px] md:min-w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-2xl outline-none p-6 md:p-10">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-3" id="grievance-modal-description">
            <p className="font-semibold text-quinary-100 text-lg sm:text-2xl" id="grievance-modal-title">
              Grievance Redressal Officer
            </p>
            <Link href={URLS.MAPS_THE_RIDGE} target="_blank" className="flex gap-2 text-sm sm:text-base text-gray-600 hover:text-secondary-600">
              <Location className="w-5 h-5 mt-1 shrink-0" />
              <span>
                3rd Floor, The Ridge, Opposite <br /> Novotel, Iscon Char Rasta,
                <br />
                Ahmedabad, Gujarat - 380060
              </span>
            </Link>
            <Link href={`mailto:${EMAILS.GRIEVANCE}`} className="flex gap-2 text-sm sm:text-base text-gray-600 hover:text-secondary-600">
              <MailIcon className="w-5 h-5 mt-1 shrink-0" />
              {EMAILS.GRIEVANCE}
            </Link>
            <Link href={`tel:${TELS.GRIEVANCE}`} className="flex gap-2 text-sm sm:text-base text-gray-600 hover:text-secondary-600">
              <Phone className="w-5 h-5 mt-1 shrink-0" />
              {TELS.GRIEVANCE}
            </Link>
          </div>
          <button onClick={handleClose} className="text-quinary-100 focus:outline-none absolute top-4 right-4" aria-label="Close modal">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default memo(GrievanceRedressalModal);
