"use client";
import {
  BuyerRepaysIcon,
  BuyerSubmits,
  Eligibility8,
  InterestRateImage8,
  KeyBenifitsImage2,
  ListIcon,
  RatnaafinDisburses,
  SupplierRaisesIcon,
  VendorFinanceBanner,
  VendorFinanceProduct,
} from "@/assets";
import { selectScreen, selectSelectedLoan, setSelectedLoan } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { EMAILS } from "@/utils/Constant";
import { moveToApplyLoan } from "@/utils/helper";
import dynamic from "next/dynamic";
import Image from "next/image";
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
const DiscountingWork = dynamic(() => import("@/components/DiscountingWork"), {
  ssr: false,
});
const EligibilityAndDocuments = dynamic(() => import("@/components/EligibilityAndDocuments"), {
  ssr: false,
});
const Glossary = dynamic(() => import("@/components/Glossary"), {
  ssr: false,
});
const InterestRateCharges = dynamic(() => import("@/components/InterestRateCharges"), {
  ssr: false,
});
const KeyBenefits = dynamic(() => import("@/components/KeyBenefits"), {
  ssr: false,
});

const newsLatterData = {
  title: "Ready to unlock the potential of your dreams?",
  description: "Take the first step toward turning your vision into reality. Embrace new possibilities, explore opportunities, and make your dreams happen",
  button: "Request a Call Back",
};
const buttonTabs = ["Eligibility & Documentation", "Interest rate & charges"];

const sectionIds = ["eligibilitydocuments", "interestrate"];

const applyLoanData = {
  title: "Take the First Step Towards Your Goals",
  description:
    "Unlock business growth with Ratnaafin’s Supply Chain Financing at competitive interest rates. Get fast approvals, minimal documentation, and flexible repayment options. Apply today and take your business to the next level.",
  email: EMAILS.INFO,
  phone: "1800 309 8013",
};

const InterestRateChargesData = {
  data: [
    { title: "Interest Rate", sub_title: "Starting at 1.20%<sup>*</sup> per month" },
    { title: "Usance Period", sub_title: "Typically 30–90 days" },
    { title: "Charges", sub_title: "Transparent terms with minimal processing fee" },
    { title: "Hidden Charges", sub_title: "No hidden or prepayment charges" },
  ],
  image_src: InterestRateImage8,
  alt: "Vendor Finance for MSMEs starting at 1.20% Ratnaafin",
};

const KeyBenefitsData = {
  data: [
    {
      title: "For Vendors",
      list: [
        "Get paid upfront and improve working capital",
        "No collateral or security required",
        "Leverage the anchor’s credit strength for better rates",
        "Accelerate business growth and operations",
      ],
    },
    {
      title: "For Anchor Corporates",
      list: [
        "Avail cash discounts from vendors on early payments",
        "Strengthen vendor relationships and ensure supply chain continuity",
        "Extend credit periods without impacting bank limits",
        "Improve payment discipline and reduce default risks",
      ],
    },
  ],
  image: KeyBenifitsImage2,
  alt: "Empower your supply chain with Ratnaafin's Vendor Finance",
};

const steps = [
  { step: 1, title: "Vendor supplies goods/services and raises an invoice", icon: <SupplierRaisesIcon /> },
  { step: 2, title: "Anchor recommends the vendor for financing", icon: <BuyerSubmits /> },
  { step: 3, title: "Financer disburses funds to the vendor on Day 0", icon: <RatnaafinDisburses /> },
  { step: 4, title: "On the invoice due date (usance), the anchor repays the financer", icon: <BuyerRepaysIcon /> },
];

const heading = {
  key: "How Does Vendor Finance Work?",
  value: "Vendors offer buyers flexible credit terms, while a financier pays the vendor upfront and collects from the buyer later.",
};

const participantsData = [
  { key: "Borrower", value: "Vendor/supplier" },
  { key: "Financer", value: "Ratnaafin" },
  { key: "Anchor", value: "Corporate buyer enabling the program" },
];

const GlossaryData = [
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Anchor:",
    description: "The corporate buyer initiating the vendor finance program",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Vendor:",
    description: "The supplier delivering goods/services and receiving early payment",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Invoice Discounting:",
    description: "Financing against invoices before their due date",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Collateral-Free:",
    description: "No need to pledge assets or provide guarantees",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Usance Period:",
    description: "Time allowed before invoice repayment (e.g. 60 days)",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Processing Fee:",
    description: "Small charge for financing setup or transaction",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Working Capital:",
    description: "Funds used for daily operations, enabled here via invoice payment",
  },
];

const EligibilityAndDocumentsData = [
  {
    image: Eligibility8,
    alt: "Vendor Finance for MSMEs Ratnaafin",
    sections: [
      {
        title: "Eligibility Criteria",
        list: ["Vendors supplying to a Ratnaafin-approved anchor", "MSMEs recommended by the anchor", "Entities with active business operations and invoicing"],
      },
      {
        title: "Documents Required",
        list: [
          "KYC documents (PAN, GST, business registration)",
          "Last 3 years of audited financials",
          "Latest 1-year bank statements and GST returns",
          "Recent working capital loan sanction letters",
          "Invoice copies",
        ],
      },
    ],
  },
];

function Page() {
  const dispatch = useAppDispatch();
  const currentScreen = useSelector(selectScreen);
  const selectedLoan = useSelector(selectSelectedLoan);

  const [activeTab, setActiveTab] = useState(0);

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

  useEffect(() => {
    dispatch(setSelectedLoan({ ...selectedLoan, loanName: "Vendor Finance" }));
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="bg-gradient-to-l lg:bg-gradient-to-r from-primary-400 to-secondary-600 pt-10 grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 order-2">
          <Image fetchPriority="high" loading="eager" priority={true} src={VendorFinanceBanner} alt="Purchase Invoice Financing starting at 1.2 % Ratnaafin" />
        </div>
        <div className="lg:col-span-2 lg:order-2 container mx-auto px-4">
          <div className="sm:block hidden">
            <BreadCrum />
          </div>
          <div className="flex flex-col gap-4 xs:gap-8 h-full justify-center xl:mr-20 2xl:mr-[183px]">
            <div className="flex flex-col gap-2 text-white">
              <h2 className="text-xl xs:text-3xl sm::text-4xl font-bold">Securing Your Supply, Assuring Your Future</h2>
              <h1>Optimise your cashflows with Vendor Finance</h1>
            </div>
            <button
              onClick={() => moveToApplyLoan("apply-now")}
              className="bg-white hover:bg-primary-400 w-fit xs:text-base text-xs text-black hover:text-white transition-all px-4 py-2 rounded-full"
            >
              Apply for Vendor Finance
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <div className="grid lg:grid-cols-2 gap-5 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-xl p-5">
          <div className="flex justify-center">
            <Image loading="lazy" src={VendorFinanceProduct} alt="Vendor Finance" width={845} height={300} className="w-full h-full !object-cover" />
          </div>
          <div className="relative">
            <div className="flex flex-col gap-4 overflow-y-auto h-[427px] pr-2">
              <h2 className="font-bold text-xl sm:text-2xl text-quinary-100">Overview</h2>
              <p className="text-tertiary-500 text-sm sm:text-base">
                Vendor Finance is a collateral-free working capital solution that allows anchor corporates to support their vendors with early invoice payments.
                This strengthens supplier relationships, optimises cash flow, and brings more control and reliability to your supply chain.
              </p>
              <h6 className="font-semibold text-quinary-100">Built For:</h6>
              <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                <li>Corporates seeking efficient supply chain management</li>
                <li>MSME vendors looking for early payment</li>
                <li>Businesses aiming to improve operational liquidity and partnerships</li>
              </ul>
            </div>
          </div>
        </div>
        <DiscountingWork steps={steps} heading={heading} participantsData={participantsData} />
        <KeyBenefits KeyBenefitsData={KeyBenefitsData} />
      </div>
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
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
        <EligibilityAndDocuments EligibilityAndDocumentsData={EligibilityAndDocumentsData} onMouseOver={() => setActiveTab(0)} />
        {/* Interest Rate and Charges */}
        <InterestRateCharges payload={InterestRateChargesData} onMouseOver={() => setActiveTab(1)} />
      </div>
      <ApplyForLoan applyLoanData={applyLoanData} disable={true} />
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        {/* <Faq payload={scf_vendor_finance_faq} /> */}
        {/* Glossary */}
        <Glossary GlossaryData={GlossaryData} />
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export default memo(Page);
