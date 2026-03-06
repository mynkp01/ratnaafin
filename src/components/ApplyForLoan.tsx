"use client";
import { MailIcon, Phone } from "@/assets";
import { selectScreen, selectSelectedLoan } from "@/redux/slices/utilSlice";
import dynamic from "next/dynamic";
import Link from "next/link";
import { memo } from "react";
import { useSelector } from "react-redux";

const FlotingButton = dynamic(() => import("@/components/FlotingButton"), {
  ssr: false,
});

function ApplyForLoan({ applyLoanData, loanEMI = null, disable = false }) {
  const selectedLoan = useSelector(selectSelectedLoan);
  const currentScreen = useSelector(selectScreen);

  return (
    <div className="lg:bg-senary-100">
      <div className="container mx-auto grid lg:grid-cols-2 gap-5 py-12 2xl:px-8 px-4">
        <div className="flex flex-col gap-8 justify-center">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">{applyLoanData?.title}</h3>
            <p className="lg:text-left text-center w-full text-sm sm:text-base text-tertiary-500">{applyLoanData?.description}</p>
          </div>
          {currentScreen?.isLG ? (
            <div className="flex gap-3 py-2">
              <Link
                href={`mailto:${applyLoanData?.email}`}
                className="flex w-fit gap-2 text-quinary-100 border-dashed border rounded-full border-quinary-100 py-2 px-6"
              >
                <MailIcon />
                {applyLoanData?.email}
              </Link>
              <Link
                href={`tel:${applyLoanData?.phone}`}
                className="flex w-fit gap-2 text-quinary-100 border-dashed border rounded-full border-quinary-100 py-2 px-6"
              >
                <Phone />
                {applyLoanData?.phone}
              </Link>
            </div>
          ) : null}
        </div>
        <div id="apply-now">
          <FlotingButton id={"applyforloan"} selectLoan={selectedLoan?.loanName} loanEMI={loanEMI} disable={disable} loanAmount={selectedLoan?.loanAmount} />
        </div>
        {!currentScreen?.isLG ? (
          <div className="flex gap-3  py-2">
            <p className="flex w-fit xs:gap-2 gap-1 text-quinary-100 border-dashed border rounded-full border-quinary-100 items-center xs:text-base text-xs py-1 px-2.5 xs:py-2 xs:px-6">
              <MailIcon />
              {applyLoanData?.email}
            </p>
            <p className="flex w-fit xs:gap-2 gap-1 text-quinary-100 border-dashed border rounded-full border-quinary-100 items-center xs:text-base text-xs py-1 px-2.5 xs:py-2 xs:px-6">
              <Phone />
              {applyLoanData?.phone}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default memo(ApplyForLoan);
