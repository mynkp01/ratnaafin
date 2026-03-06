"use client";
import {
  BuyerRepaysIcon,
  BuyerSubmits,
  Eligibility6,
  InterestRateImage6,
  KeyBenifitsImage,
  ListIcon,
  PurchaseInvoiceBanner,
  PurchaseInvoiceProduct,
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

const buttonTabs = ["Eligibility & Documentation", "Interest rate & charges"];
const sectionIds = ["eligibilitydocuments", "interestrate"];

const InterestRateChargesData = {
  data: [
    { title: "Interest Rate", sub_title: "Competitive and flexible, based on buyer credit profile" },
    { title: "Usance Period", sub_title: "Typically 30–90 days" },
    { title: "Interest Payment", sub_title: "Interest deducted upfront or paid as per arrangement" },
    { title: "Charges", sub_title: "Transparent processing fees" },
    { title: "Collateral", sub_title: "Not required" },
    { title: "Hidden Charges", sub_title: "None" },
  ],
  image_src: InterestRateImage6,
  alt: "How does Purchase Invoice Discounting Work?",
};

const KeyBenefitsData = {
  data: [
    {
      title: "For Buyers",
      list: [
        "Avail working capital credit without collateral",
        "Improve supplier relationships through early payments",
        "Gain cash discounts from vendors for prompt payments",
        "Manage liquidity more effectively during high-demand periods",
        "No need to route funds through suppliers – only invoice acceptance required",
      ],
    },
    {
      title: "For Suppliers",
      list: ["Receive instant payment on invoices", "Strengthen long-term buyer relationships", "Improve their own working capital position"],
    },
  ],
  image: KeyBenifitsImage,
  alt: "sales invoice",
};

const applyLoanData = {
  title: "Take the First Step Towards Your Goals",
  description:
    "Unlock business growth with Ratnaafin’s Supply Chain Financing at competitive interest rates. Get fast approvals, minimal documentation, and flexible repayment options. Apply today and take your business to the next level.",
  email: EMAILS.INFO,
  phone: "1800 309 8013",
};

const steps = [
  { step: 1, title: "Buyer procures goods/services and receives an invoice from the supplier", icon: <SupplierRaisesIcon /> },
  { step: 2, title: "Buyer requests finance for the invoice from Ratnaafin", icon: <BuyerSubmits /> },
  { step: 3, title: "Financer disburses funds to the supplier on Day 0 (after deducting applicable interest)", icon: <RatnaafinDisburses /> },
  { step: 4, title: "On the invoice due date (usance), the buyer repays the financer", icon: <BuyerRepaysIcon /> },
];

const participantsData = [
  { key: "Borrower", value: "Buyer" },
  { key: "Financer", value: "Ratnaafin" },
  { key: "Supplier", value: "Receives payment (no credit exposure)" },
];

const heading = {
  key: "How does Purchase Invoice Discounting Work?",
  value: "Unlock immediate funds by discounting your purchase invoices before their due date.",
};

const GlossaryData = [
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Buyer:",
    description: "The business procuring goods/services and repaying Ratnaafin later",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Supplier:",
    description: "The vendor delivering goods and receiving upfront payment",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Purchase Invoice Discounting:",
    description: "Financing based on a supplier invoice to enable early payment",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Usance Period:",
    description: "The credit period until the buyer repays Ratnaafin (30–90 days)",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Collateral-Free:",
    description: "No assets required to secure the loan",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Interest Deduction:",
    description: "Interest may be subtracted from the upfront amount or paid later",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Working Capital:",
    description: "Funds required for daily operations, improved here through supplier financing",
  },
];

const EligibilityAndDocumentsData = [
  {
    image: Eligibility6,
    alt: "MSMEs seeking short-term working capital support",
    sections: [
      {
        title: "Eligibility Criteria",
        list: [
          "Buyers with valid purchase invoices and business operations",
          "MSMEs seeking short-term working capital support",
          "Businesses needing seasonal or cyclical credit",
        ],
      },
      {
        title: "Documents Required",
        list: [
          "KYC documents (PAN, GST, business registration)",
          "Last 3 years of audited financial statements",
          "1 year of bank statements and GST returns",
          "Sanction letters from existing credit facilities (if any)",
          "Supplier invoice copy",
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
    dispatch(setSelectedLoan({ ...selectedLoan, loanName: "Purchase Invoice Discounting" }));
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="bg-gradient-to-l lg:bg-gradient-to-r from-primary-400 to-secondary-600 pt-10 grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 order-2">
          <Image fetchPriority="high" loading="eager" priority={true} src={PurchaseInvoiceBanner} alt="Purchase Invoice Discounting" />
        </div>
        <div className="lg:col-span-2 lg:order-2 container mx-auto px-4">
          <div className="sm:block hidden">
            <BreadCrum />
          </div>
          <div className="flex flex-col gap-4 xs:gap-8 h-full justify-center xl:mr-20 2xl:mr-[183px]">
            <div className="flex flex-col gap-2 text-white">
              <h2 className="text-xl xs:text-3xl sm::text-4xl font-bold">Seamless Supply Effortless Growth</h2>
              <h1>Unlock cash discounts with Purchase Invoice Discounting</h1>
            </div>
            <button
              onClick={() => moveToApplyLoan("apply-now")}
              className="bg-white hover:bg-primary-400 w-fit xs:text-base text-xs text-black hover:text-white transition-all px-4 py-2 rounded-full"
            >
              Get Purchase Invoice Discounted
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <div className="grid lg:grid-cols-2 gap-5 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-xl p-5">
          <div className="flex justify-center">
            <Image
              loading="lazy"
              src={PurchaseInvoiceProduct}
              alt="Purchase Invoice Financing"
              width={845}
              height={300}
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
          <div className="relative">
            <div className="flex flex-col gap-4 overflow-y-auto h-[427px] pr-2">
              <h2 className="font-bold text-xl sm:text-2xl text-quinary-100">Overview</h2>
              <p className="text-tertiary-500 text-sm sm:text-base">
                Purchase Invoice Discounting is a short-term working capital facility that enables businesses to pay their suppliers upfront without using their
                own funds. The financer pays the supplier immediately by discounting the purchase invoice, while the buyer repays the amount at a later agreed
                date.
              </p>
              <h6 className="font-semibold text-quinary-100">Built For:</h6>
              <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                <li>Small and medium businesses with active vendor relationships</li>
                <li>Buyers looking to optimise supplier payment terms</li>
                <li>Enterprises facing seasonal or fluctuating liquidity cycles</li>
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
        {/* <Faq payload={scf_purchase_invoice_faq} /> */}
        {/* Glossary */}
        <Glossary GlossaryData={GlossaryData} />
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export default memo(Page);
