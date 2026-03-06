"use client";
import {
  BuyerRepaysIcon,
  BuyerSubmits,
  DealerFinanceBanner,
  DealerFinanceProduct,
  Eligibility9,
  InterestRateImage9,
  KeyBenifitsImage3,
  ListIcon,
  RatnaafinDisburses,
  SupplierRaisesIcon,
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
const InterestRateChargesData = {
  data: [
    {
      title: "Interest Rate",
      sub_title: "Competitive rates based on anchor-dealer credit evaluation.<br/> Interest may be paid by dealer or anchor, depending on arrangement",
    },
    { title: "Usance Period", sub_title: "Typically 30–90 days" },
    { title: "Charges", sub_title: "Minimal processing fees apply" },
    { title: "Hidden Cost", sub_title: "No" },
    { title: "Early repayment penalties", sub_title: "No" },
  ],
  image_src: InterestRateImage9,
  alt: "Dealer Finance at 1.10%",
};
const buttonTabs = ["Eligibility & Documentation", "Interest rate & charges"];
const sectionIds = ["eligibilitydocuments", "interestrate"];

const steps = [
  { step: 1, title: "Anchor supplies goods to the dealer and generates an invoice", icon: <SupplierRaisesIcon /> },
  { step: 2, title: "Anchor (or dealer) recommends the dealer for finance", icon: <BuyerSubmits /> },
  { step: 3, title: "Financer disburses funds to the anchor on Day 0 (after deducting interest)", icon: <RatnaafinDisburses /> },
  { step: 4, title: "On the due date (usance), the dealer repays the financer", icon: <BuyerRepaysIcon /> },
];

const heading = {
  key: "How Does Dealer Finance Work?",
  value: "Dealers receive upfront funds from a financier to purchase goods, with flexible repayment terms.",
};

const participantsData = [
  { key: "Borrower", value: "Dealer/channel partner" },
  { key: "Financer", value: "Ratnaafin" },
  { key: "Anchor", value: "Seller (manufacturer/distributor)" },
];

const applyLoanData = {
  title: "Take the First Step Towards Your Goals",
  description:
    "Unlock business growth with Ratnaafin’s Loan Against Property at competitive interest rates. Get fast approvals, minimal documentation, and flexible repayment options. Apply today and take your business to the next level.",
  email: EMAILS.INFO,
  phone: "1800 309 8013",
};

const GlossaryData = [
  {
    icon: <ListIcon />,
    title: "Anchor:",
    description: "The manufacturer or distributor who supplies goods to dealers and partners with Ratnaafin to enable financing.",
  },
  {
    icon: <ListIcon />,
    title: "Dealer:",
    description: "The buyer or distributor purchasing goods from the anchor and repaying the financer later.",
  },
  {
    icon: <ListIcon />,
    title: "Collateral-Free:",
    description: "No physical assets or guarantees are required to secure the loan.",
  },
  {
    icon: <ListIcon />,
    title: "Usance Period:",
    description: "The credit term or repayment window offered to the dealer (e.g., 30–90 days).",
  },
  {
    icon: <ListIcon />,
    title: "Invoice Financing:",
    description: "A loan structured around a specific supplier invoice rather than a lump-sum disbursal.",
  },
  {
    icon: <ListIcon />,
    title: "Working Capital:",
    description: "Short-term funds used for managing day-to-day operations such as inventory purchases.",
  },
  {
    icon: <ListIcon />,
    title: "Sanction Limit:",
    description: "The maximum credit available to a dealer under the financing program.",
  },
  {
    icon: <ListIcon />,
    title: "Disbursal:",
    description: "The transfer of funds from Ratnaafin to the anchor on behalf of the dealer.",
  },
  {
    icon: <ListIcon />,
    title: "Processing Fee:",
    description: "A nominal one-time or per-invoice charge for availing financing.",
  },
  {
    icon: <ListIcon />,
    title: "Penal Interest:",
    description: "Extra interest charged for late repayment beyond the usance period.",
  },
];

const EligibilityAndDocumentsData = [
  {
    image: Eligibility9,
    sections: [
      {
        title: "Eligibility Criteria",
        list: [
          "Dealers recommended by approved anchor corporates",
          "Businesses with consistent order cycles and clean repayment history",
          "MSMEs operating as retailers, wholesalers, or franchise partners",
        ],
      },
      {
        title: "Documents Required",
        list: [
          "KYC documents (PAN, GST, business registration)",
          "Last 3 years of audited financials",
          "1 year of bank statements and GST returns",
          "Existing loan sanction letters (if any)",
          "Invoice or purchase order from anchor",
        ],
      },
    ],
  },
];

const KeyBenefitsData = {
  data: [
    {
      title: "For Dealers",
      list: [
        "Buy more inventory with working capital support",
        "No collateral required",
        "Leverage the anchor’s credit rating to access better pricing",
        "Improve operational agility and revenue potential",
      ],
    },
    {
      title: "For Anchor Corporates",
      list: [
        "Receive immediate invoice payment from financer",
        "Boost sales by enabling dealer purchases",
        "Reduce credit risk and defaults",
        "Maintain supply chain discipline and visibility",
        "Off-balance sheet arrangement that doesn’t impact current bank facilities",
      ],
    },
  ],
  image: KeyBenifitsImage3,
  alt: "Apply for Dealer Finance",
};

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
    dispatch(setSelectedLoan({ ...selectedLoan, loanName: "Dealer Finance" }));
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="bg-gradient-to-l lg:bg-gradient-to-r from-primary-400 to-secondary-600 pt-10 grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 order-2">
          <Image fetchPriority="high" loading="eager" priority={true} src={DealerFinanceBanner} alt="Dealer Finance for MSMEs at 1.10% per month Ratnaafin" />
        </div>
        <div className="lg:col-span-2 lg:order-2 container mx-auto px-4">
          <div className="sm:block hidden">
            <BreadCrum />
          </div>
          <div className="flex flex-col gap-4 xs:gap-8 h-full justify-center xl:mr-20 2xl:mr-[183px]">
            <div className="flex flex-col gap-2 text-white">
              <h2 className="text-xl xs:text-3xl sm:text-4xl font-bold">Seamless Supply, Effortless Expansion</h2>
              <h1>Facilitating efficient buyer-supplier relationships with Dealer Finance</h1>
            </div>
            <button
              onClick={() => moveToApplyLoan("apply-now")}
              className="bg-white hover:bg-primary-400 w-fit xs:text-base text-xs text-black hover:text-white transition-all px-4 py-2 rounded-full"
            >
              Apply for Dealer Finance
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <div className="grid lg:grid-cols-2 gap-5 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-xl p-5">
          <div className="flex justify-center">
            <Image
              loading="lazy"
              src={DealerFinanceProduct}
              alt="Dealer Finance Ratnaafin"
              width={845}
              height={300}
              className="w-full h-full !object-cover object-left"
            />
          </div>
          <div className="relative">
            <div className="flex flex-col gap-4 overflow-y-auto h-[427px] pr-2">
              <h2 className="font-bold text-xl sm:text-2xl text-quinary-100">Overview</h2>
              <p className="text-tertiary-500 text-sm sm:text-base">
                Dealer Finance is a collateral-free working capital solution that allows manufacturers and distributors (anchors) to support their dealers by
                arranging upfront payments through a financier. Dealers benefit from credit to purchase goods, while anchors receive immediate payment for
                invoices — enhancing liquidity and accelerating sales.
              </p>
              <h6 className="font-semibold text-quinary-100">Built For:</h6>
              <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                <li>Manufacturers, OEMs, and distributors with large dealer networks</li>
                <li>Dealers looking for credit-backed inventory purchases</li>
                <li>Businesses seeking to improve sales velocity and working capital efficiency</li>
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
        {/* <Faq payload={scf_dealer_finance_faq} /> */}
        {/* Glossary */}
        <Glossary GlossaryData={GlossaryData} />
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export default memo(Page);
