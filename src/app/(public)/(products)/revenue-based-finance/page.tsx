"use client";
import { Eligibility10, InterestRateImage13, RevenueBasedFinance, RevenueBasedFinanceProduct } from "@/assets";
import { selectScreen, selectSelectedLoan, setSelectedLoan } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { EMAILS, ROUTES } from "@/utils/Constant";
import { revenue_based_finance_faq } from "@/utils/F&Q";
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

const newsLatterData = {
  title: "Ready to unlock the potential of your dreams?",
  description: "Take the first step toward turning your vision into reality. Embrace new possibilities, explore opportunities, and make your dreams happen",
  button: "Request a Call Back",
};

const applyLoanData = {
  title: "Take the First Step Towards Your Goals",
  description:
    "Unlock business growth with Ratnaafin’s Revenue Based Funding at competitive interest rates. Get fast approvals, minimal documentation, and tailored funding. Apply today and take your business to the next level.",
  email: EMAILS.INFO,
  phone: "1800 309 8013",
};

const buttonTabs = ["Eligibility & Documentation", "Interest rate & Charges"];

function Page() {
  const dispatch = useAppDispatch();
  const currentScreen = useSelector(selectScreen);
  const selectedLoan = useSelector(selectSelectedLoan);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(setSelectedLoan({ ...selectedLoan, loanName: "Revenue Based Funding" }));
    const handleFocusTab = () => {
      const sectionIds = ["eligibilitydocuments", "interestrate", "emicalculator"];
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
    const sectionIds = ["eligibilitydocuments", "interestrate"];
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

  const InterestRateChargesData = {
    data: [
      { title: "Interest Rate", sub_title: "Interest Rate Starting from 15%<sup>*</sup> per annum" },
      { title: "Loan Amount", sub_title: "₹50 Lakh to ₹3 Crore" },
      { title: "Loan Processing Fees", sub_title: "up to 2%" },
      { title: "Loan Tenure", sub_title: "6 - 18 months" },
      { title: "Stamp Duty", sub_title: "As per actuals" },
    ],
    image_src: InterestRateImage13,
    alt: "Flexible loans with competitive rates",
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="bg-gradient-to-l lg:bg-gradient-to-r from-primary-400 to-secondary-600 pt-10 grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 order-2">
          <Image fetchPriority="high" loading="eager" priority={true} src={RevenueBasedFinance} alt="Revenue Based Funding" />
        </div>
        <div className="lg:col-span-2 lg:order-2 container mx-auto 2xl:px-8 px-4">
          <div className="sm:block hidden">
            <BreadCrum />
          </div>
          <div className="flex flex-col gap-4 xs:gap-8 h-full justify-center xl:mr-20 2xl:mr-[183px]">
            <div className="flex flex-col gap-2 text-white">
              <h2 className="text-xl xs:text-3xl sm::text-4xl font-bold">Smart Capital That Fits Your Business Flow</h2>
              <h1>Revenue Based Funding - Flexible financing, without equity dilution</h1>
            </div>
            <button
              onClick={() => moveToApplyLoan("apply-now")}
              className="bg-white hover:bg-primary-400 w-fit xs:text-base text-xs text-black hover:text-white transition-all px-4 py-2 rounded-full"
            >
              Apply for Revenue Based Finance
            </button>
          </div>
        </div>
      </div>
      <div className="xs:container mx-auto 2xl:px-8">
        <div className=" shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-senarylight-50 xs:rounded-xl lg:-mt-24 sm:gap-0 gap-4 grid items-center sm:divide-y-0 divide-y sm:flex py-8 px-4 sm:justify-between sm:divide-x divide-tertiary-500/40">
          <div className="w-full text-center space-y-2">
            <p className="text-sm text-quinary-100">Competitive Interest Rates</p>
            <h4 className="font-semibold text-2xl text-quinary-100">
              Starting from{" "}
              <span className="font-bold text-4xl text-primary-400">
                1.3%<sup>*</sup>
              </span>{" "}
              per month
            </h4>
          </div>
          {/* <div className="w-full text-center space-y-2 sm:pt-0 pt-4">
            <p className="text-sm text-quinary-100">Fast Turnaround Time</p>
            <h4 className="font-semibold text-2xl text-quinary-100">-</h4>
          </div> */}
          <div className="w-full text-center space-y-2 sm:pt-0 pt-4">
            <p className="text-sm text-quinary-100">Flexible Loan Tenure </p>
            <h4 className="font-semibold text-2xl text-quinary-100">
              <span className="font-bold text-4xl text-primary-400">6 </span> to <span className="font-bold text-4xl text-primary-400">18 </span> months
            </h4>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <div className="grid lg:grid-cols-2 gap-5 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-xl p-5">
          <div className="flex justify-center">
            <Image loading="lazy" src={RevenueBasedFinanceProduct} alt="" width={845} height={300} className="rounded-xl h-full w-full object-cover" />
          </div>
          <div className="relative">
            <div className="flex flex-col gap-4 overflow-y-auto h-[427px] pr-2">
              <h2 className="font-bold text-xl sm:text-2xl text-quinary-100">Revenue Based Finance</h2>
              <p className="text-tertiary-500 text-sm sm:text-base">
                Ratnaafin’s Revenue-Based Financing is a working capital term loan designed for growth-focused businesses with consistent digital revenue
                streams. It offers quick access to capital with a flexible repayment structure that aligns with your monthly revenues.
              </p>
              <p className="text-tertiary-500 text-sm sm:text-base">
                Repayments are made through a pre-agreed percentage of your business’s monthly income, ensuring cash flow adaptability during high or low
                revenue periods. This structured yet flexible approach makes RBF ideal for digital-first companies looking to scale without the burden of fixed
                EMIs or heavy collateral.
              </p>
              <p className="text-tertiary-500 text-sm sm:text-base">
                Whether you’re a D2C brand, SaaS provider, or e-commerce seller, Revenue Based Financing empowers you to unlock capital in sync with your
                revenue potential.
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
        <div className="flex flex-col gap-8" id="eligibilitydocuments">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Eligibility and Documents</h3>
            <p className="lg:text-left text-center w-full text-sm sm:text-base text-tertiary-500">
              Ensure you meet the criteria and have all required documents ready for a smooth process.
            </p>
          </div>
          <div className="grid lg:grid-cols-5 items-center gap-2 lg:p-0 p-5 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-xl">
            <div className="lg:col-span-2 w-full h-full">
              <Image
                loading="lazy"
                src={Eligibility10}
                alt="Flexible financing"
                className="lg:rounded-none lg:rounded-l-xl rounded-xl h-full w-full object-cover"
              />
            </div>
            <div className="lg:col-span-3 flex flex-col gap-6 lg:p-5">
              <div className="flex flex-col gap-5">
                <h5 className="font-bold text-xl sm:text-2xl text-quinary-100">Eligibility Criteria</h5>
                <div className="sm:flex grid gap-5 sm:divide-x text-tertiary-500 text-sm sm:text-base">
                  <div className="space-y-2 pr-5 text-quinary-100">
                    <h6 className="font-semibold text-quinary-100">Age of borrower</h6>
                    <p>25 - 65 years</p>
                  </div>
                  <div className="space-y-2 sm:px-5 text-quinary-100 text-sm sm:text-base">
                    <h6 className="font-semibold">Business Vintage</h6>
                    <p>2 years</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 pr-5 text-quinary-100">
                <h6 className="font-semibold text-quinary-100">Business Type</h6>
                <p>Digital Revenue-rich businesses in manufacturing, services, Logistics, D2C brands, SaaS enterprises, etc.</p>
              </div>
              <div className="space-y-2">
                <h5 className="font-bold text-xl sm:text-2xl text-quinary-100">Documents</h5>
                <div className="divide-y">
                  <p className="py-3 text-quinary-100 text-sm sm:text-base">KYC Documents</p>
                  <p className="py-3 text-quinary-100 text-sm sm:text-base">Financial Documents (GST Returns, Bank Statements, Revenue Accounts)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Interest Rate and Charges */}
        <InterestRateCharges payload={InterestRateChargesData} />
      </div>
      <ApplyForLoan applyLoanData={applyLoanData} disable={true} />
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
        <Faq payload={revenue_based_finance_faq} />
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export default memo(Page);
