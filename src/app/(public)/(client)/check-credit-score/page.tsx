"use client";
import { CheckCreditScoreBanner, CheckCreditScoreImage, CheckCreditScoreMonileBanner } from "@/assets";
import { moveToApplyLoan } from "@/utils/helper";
import dynamic from "next/dynamic";
import Image from "next/image";
import { memo } from "react";

const CibilCheckIframe = dynamic(() => import("./CibilCheckIframe"), {
  ssr: false,
});
const BreadCrum = dynamic(() => import("@/components/BreadCrum"), {
  ssr: false,
});
const NewsLatter = dynamic(() => import("@/components/NewsLatter"), {
  ssr: false,
});

const newsLatterData = {
  title: "Ready to unlock the potential of your dreams?",
  description: "Take the first step toward turning your vision into reality. Embrace new possibilities, explore opportunities, and make your dreams happen",
  button: "Request a Call Back",
};

function CheckCreditScore() {
  return (
    <div className="flex flex-col gap-12">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r sm:from-black/60 from-black/70 sm:via-transparent via-black/30 to-black/0"></div>

        <Image
          fetchPriority="high"
          loading="eager"
          priority={true}
          src={CheckCreditScoreMonileBanner}
          alt="what is a good credit score"
          className="sm:hidden !object-cover !w-full"
        />
        <Image
          fetchPriority="high"
          loading="eager"
          priority={true}
          src={CheckCreditScoreBanner}
          alt="what is a good credit score"
          className="sm:block hidden sm:!h-[360px] md:!h-full !object-cover object-right w-full"
        />
        <div className="absolute inset-0 2xl:px-8 px-4 container mx-auto flex 2xl:h-fit 2xl:top-1/4 items-end sm:bottom-0 bottom-5 sm:items-center sm:justify-start">
          <div className="clip-custom flex flex-col gap-3 md:gap-6 lg:gap-12 sm:bg-black/15 w-full sm:max-w-[500px] md:max-w-[540px] lg:max-w-[760px] sm:border sm:border-white/10 sm:backdrop-blur-[5px] rounded-l-2xl rounded-tr-[120px] lg:rounded-tr-[140px] sm:p-4 md:p-6 lg:p-10">
            <div className="sm:block hidden">
              <BreadCrum />
            </div>
            <div className="flex flex-col gap-3 lg:gap-6">
              <h2 className="text-white text-[22px] md:text-3xl lg:text-4xl font-bold">{`Get Your Free CIBIL Score Report Instantly.`}</h2>
              <h1 className="text-white">
                Check your credit health with no cost or hidden charges. Instant access to your detailed CIBIL Score and credit report.
              </h1>
              <div>
                <button
                  onClick={() => moveToApplyLoan("custom-credit-score")}
                  className="bg-secondary-600 hover:bg-white md:text-base text-xs text-white hover:text-quinary-100 transition-all px-4 py-2 rounded-full"
                >
                  Check CIBIL Score
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <div className="grid lg:grid-cols-2 gap-5 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-2xl p-4 md:p-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h3 className="lg:text-left text-center text-2xl sm:text-3xl md:text-4xl font-bold text-quinary-100">Check Your CIBIL Score</h3>
              <p className="lg:text-left text-center w-full text-sm sm:text-base text-tertiary-500">
                Enter your basic information to check your CIBIL Score for free.
              </p>
            </div>
            <Image loading="lazy" src={CheckCreditScoreImage} alt="low credit score loans" className="!object-cover" />
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-quinary-100">Understanding CIBIL Score</h3>
              <p className="w-full text-sm sm:text-base text-tertiary-500">
                CIBIL score is a numerical representation of your creditworthiness. It is a three-digit numerical value ranging between 300 and 900.
              </p>
              <p className="w-full text-sm sm:text-base text-tertiary-500">
                The four major factors that influence CIBIL score are - credit mix, repayment history, new debt, and credit utilisation ratio. When applying for
                a loan from Ratnaafin, your CIBIL score is one of the major factors that influence the lending decision.
              </p>
              <p className="w-full text-sm sm:text-base text-tertiary-500">
                Maintain a healthy credit score of 750 and above to experience seamless loan application.
              </p>
            </div>
          </div>
          <div id="custom-credit-score">
            <CibilCheckIframe />
          </div>
        </div>
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export default memo(CheckCreditScore);
