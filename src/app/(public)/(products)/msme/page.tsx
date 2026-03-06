"use client";
import { BusinessLoanProduct, Eligibility13, InterestRateImage12, LoanAgainstPropertyBanner } from "@/assets";
import { selectScreen } from "@/redux/slices/utilSlice";
import { EMAILS, ROUTES } from "@/utils/Constant";
import { msme_faq } from "@/utils/F&Q";
import { moveToApplyLoan } from "@/utils/helper";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BreadCrum = dynamic(() => import("@/components/BreadCrum"), {
  ssr: false,
});
const NewsLatter = dynamic(() => import("@/components/NewsLatter"), {
  ssr: false,
});
const ApplyForLoan = dynamic(() => import("@/components/ApplyForLoan"), {
  ssr: false,
});
const EmiCalculator = dynamic(() => import("@/components/EmiCalculator"), {
  ssr: false,
});
const Faq = dynamic(() => import("@/components/Faq"), {
  ssr: false,
});
const HappyCustomer = dynamic(() => import("@/components/HappyCustomer"), {
  ssr: false,
});
const InterestRateCharges = dynamic(() => import("@/components/InterestRateCharges"), {
  ssr: false,
});
const LatestBlog = dynamic(() => import("@/components/LatestBlog"), {
  ssr: false,
});

const initialLoanEMI = {
  loan: {
    amount: 3000000,
    min: 1000000,
    max: 50000000,
    step: 100000,
  },
  interestRate: {
    amount: 13,
    min: 12.5,
    max: 15,
    step: 0.1,
  },
  tenure: {
    amount: 60,
    min: 12,
    max: 144,
    step: 1,
  },
};

const newsLatterData = {
  title: "Ready to unlock the potential of your dreams?",
  description: "Take the first step toward turning your vision into reality. Embrace new possibilities, explore opportunities, and make your dreams happen",
  button: "Request a Call Back",
};

const applyLoanData = {
  title: "Take the First Step Towards Your Goals",
  description:
    "Unlock business growth with Ratnaafin’s Micro Loan Against Property at competitive interest rates. Get fast approvals, minimal documentation, and flexible repayment options. Apply today and take your business to the next level.",
  email: EMAILS.INFO,
  phone: "1800 309 8013",
};

const buttonTabs = ["Eligibility & Documentation", "Interest rate & charges", "EMI Calculator"];
const sectionIds = ["eligibilitydocuments", "interestrate", "emicalculator"];
const InterestRateChargesData = {
  data: [
    { title: "Interest Rate", sub_title: "Starting at 1%<sup>*</sup> (may vary according to product and collateral)" },
    { title: "Loan Amount", sub_title: "Tailored your needs & business profile" },
    { title: "Loan Processing Fees", sub_title: "up to 3%" },
  ],
  image_src: InterestRateImage12,
  alt: "msme loan apply",
};

function Page() {
  const currentScreen = useSelector(selectScreen);
  const [activeTab, setActiveTab] = useState(0);
  const [loanEMI, setLoanEMI] = useState(initialLoanEMI);

  useEffect(() => {
    const handleFocusTab = () => {
      const scrollPosition = window.scrollY + 250; // 90

      let found = false;

      for (let i = sectionIds?.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const offsetTop = section.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveTab(i);
            found = true;
            break;
          }
        }
      }
      if (!found) setActiveTab(0);
    };

    window.addEventListener("scroll", handleFocusTab);

    return () => {
      window.removeEventListener("scroll", handleFocusTab);
    };
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const targetId = sectionIds[index];
    const section = document.getElementById(targetId);

    if (section) {
      const yOffset = -190;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="bg-gradient-to-l lg:bg-gradient-to-r from-primary-400 to-secondary-600 pt-10 grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 order-2">
          <Image fetchPriority="high" loading="eager" priority={true} src={LoanAgainstPropertyBanner} alt="LoanAgainstPropertyBanner" />
        </div>
        <div className="lg:col-span-2 lg:order-2 container mx-auto px-4">
          <div className="sm:block hidden">
            <BreadCrum />
          </div>
          <div className="flex flex-col gap-4 xs:gap-8 h-full justify-center xl:mr-20 2xl:mr-[183px]">
            <div className="flex flex-col gap-2 text-white">
              <h2 className="text-xl xs:text-3xl sm:text-4xl font-bold">Har Business Bada Banega, Jab Loan Aasani Se Milega</h2>
              <h1>Empowering MSMEs with Fast, Flexible, and Tailored MSME Loans</h1>
            </div>
            <button
              onClick={() => moveToApplyLoan("apply-now")}
              className="bg-white hover:bg-primary-400 w-fit xs:text-base text-xs text-black hover:text-white transition-all px-4 py-2 rounded-full"
            >
              Apply for MSME Loan
            </button>
          </div>
        </div>
      </div>
      <div className="xs:container mx-auto 2xl:px-8">
        <div className="shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-senarylight-50 xs:rounded-xl lg:-mt-24 sm:gap-0 gap-4 grid items-center sm:divide-y-0 divide-y sm:flex py-8 px-4 sm:justify-between sm:divide-x divide-tertiary-500/40">
          <div className="w-full text-center space-y-2">
            <p className="text-sm text-quinary-100">Competitive Interest Rates</p>
            <h4 className="font-semibold text-2xl text-quinary-100">
              Starting from{" "}
              <span className="font-bold text-4xl text-primary-400">
                1.2<sup>*</sup>%
              </span>{" "}
              per month
            </h4>
          </div>
          <div className="w-full text-center space-y-2 sm:pt-0 pt-4">
            <p className="text-sm text-quinary-100">Fast Turnaround Time</p>
            <h4 className="font-semibold text-2xl text-quinary-100">
              Within{" "}
              <span className="font-bold text-4xl text-primary-400">
                {" "}
                48<sup>*</sup>{" "}
              </span>{" "}
              hours
            </h4>
          </div>
          <div className="w-full text-center space-y-2 sm:pt-0 pt-4">
            <p className="text-sm text-quinary-100">Loan Tenure </p>
            <h4 className="font-semibold text-2xl text-quinary-100">Flexible</h4>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <div className="grid lg:grid-cols-2 gap-5 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-xl p-5">
          <div>
            <Image loading="lazy" src={BusinessLoanProduct} alt="" className="!object-cover" />
          </div>
          <div className="relative">
            <div className="flex flex-col gap-4 overflow-y-auto h-[427px] pr-2">
              <h2 className="font-bold text-xl sm:text-2xl text-quinary-100">Empowering MSMEs With Customized Business Loans </h2>
              <p className="text-tertiary-500 text-sm sm:text-base">
                {`At Ratnaafin, we offer specialized MSME business loans designed to meet the unique financial needs of micro, small, and medium enterprises.
              Whether you're looking for secured or unsecured funding, our solutions help support your business growth, manage working capital, and achieve
              long-term success.`}
              </p>
              <p className="text-tertiary-500 text-sm sm:text-base">
                From retail shop owners to manufacturers and service providers in industries like hospitality or automobile, our business loans are tailored to
                suit a wide range of sectors. Whether it’s expansion, equipment purchase, or addressing short-term cash flow gaps, our MSME loans provide the
                flexibility your business needs.
              </p>
              <p className="text-tertiary-500 text-sm sm:text-base">
                With a simple application process, <span className="text-black font-medium">minimal documentation,</span> and{" "}
                <span className="text-black font-medium">quick approvals</span>, you can now <span className="text-black font-medium">apply for an MSME</span>{" "}
                loan online and get the capital you need without unnecessary delays. Entrepreneurs, merchants, and self-employed professionals can now{" "}
                <span className="text-black font-medium">apply for an MSME loan</span> and take the next big step in their business journey.
              </p>
              <Link href={ROUTES.client.possibleHai} className="text-primary-400 hover:text-secondary-600 font-semibold">
                With Ratnaafin, Possible Hai.
              </Link>
            </div>
          </div>
        </div>
        {currentScreen?.isSM ? (
          <div
            className={`sticky xl:top-[92px] sm:top-[92px] z-10 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-[#EEF3FF] items-center sm:divide-y-0 divide-y flex sm:justify-between sm:divide-x divide-tertiary-500/40 ${
              activeTab !== 0 ? "rounded-b-xl" : "rounded-xl"
            }`}
          >
            {buttonTabs?.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`w-full py-4 font-medium transition-all duration-200 ${
                  activeTab === index ? "bg-white bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500" : "text-tertiary-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        ) : null}
        {/* Eligibility and Documents */}
        <div className="flex flex-col gap-8" id="eligibilitydocuments" onMouseOver={() => setActiveTab(0)}>
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Eligibility and Documents</h3>
            <p className="lg:text-left text-center w-full text-sm sm:text-base text-tertiary-500">
              Ensure you meet the criteria and have all required documents ready for a smooth process.
            </p>
          </div>
          <div className="grid lg:grid-cols-5 items-center gap-2 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-xl">
            <div className="lg:col-span-2">
              <Image
                loading="lazy"
                src={Eligibility13}
                alt="msme loan scheme in 59 minutes"
                className="lg:rounded-none lg:rounded-l-xl rounded-xl h-full w-full object-cover"
              />
            </div>
            <div className="lg:col-span-3 flex flex-col gap-10 p-5">
              <div className="flex flex-col gap-5">
                <h5 className="font-bold text-xl sm:text-2xl text-quinary-100">Eligibility Criteria</h5>
                <div className="sm:flex grid gap-5 sm:divide-x">
                  <div className="space-y-2 pr-5 text-quinary-100 text-sm sm:text-base">
                    <h6 className="font-semibold text-quinary-100">Age of borrower</h6>
                    <p>25 - 65 years</p>
                  </div>
                  <div className="space-y-2 sm:px-5 text-quinary-100 text-sm sm:text-base">
                    <h6 className="font-semibold">Business Vintage</h6>
                    <p>3 years</p>
                  </div>
                  <div className="space-y-2 sm:px-5 text-quinary-100 text-sm sm:text-base">
                    <h6 className="font-semibold">CIBIL</h6>
                    <p>675+ Recommended</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h5 className="font-bold text-xl sm:text-2xl text-quinary-100">Documents Required</h5>
                <div className="divide-y">
                  <p className="py-3 text-quinary-100 text-sm sm:text-base">KYC Documents of all Promoters & Owners</p>
                  <p className="py-3 text-quinary-100 text-sm sm:text-base">Financial Statements (GST return & Bank Statements)</p>
                  <p className="py-3 text-quinary-100 text-sm sm:text-base">Ownership Proof</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Interest Rate and Charges */}
        <InterestRateCharges payload={InterestRateChargesData} text={"Know the loan interest rate and charges beforehand."} />
        {/*  EMI Calculate */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="emicalculator">
          <EmiCalculator
            loanEMI={loanEMI}
            setLoanEMI={setLoanEMI}
            title="EMI Calculator"
            description="Use the EMI calculator below to understand your monthly repayment amount."
          />
        </div>
      </div>
      <ApplyForLoan applyLoanData={applyLoanData} loanEMI={loanEMI} disable={true} />
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4" id="testimonial">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-quinary-100">Hear from Our Happy Customers</h3>
            <p className="text-center w-full text-sm sm:text-base text-tertiary-500">Aapki mehnat, humara saath, Business karega karamaat</p>
          </div>
          <HappyCustomer />
        </div>
      </div>
      <LatestBlog />
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <Faq payload={msme_faq} />
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export default memo(Page);
