"use client";
import {
  BuyerRepaysIcon,
  BuyerSubmits,
  Eligibility7,
  InterestRateImage7,
  KeyBenifitsImage1,
  ListIcon,
  RatnaafinDisburses,
  SalesInvoiceDiscountingBanner,
  SalesInvoiceDiscountingProduct,
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
const applyLoanData = {
  title: "Take the First Step Towards Your Goals",
  description:
    "Unlock business growth with Ratnaafin’s Supply Chain Financing at competitive interest rates. Get fast approvals, minimal documentation, and flexible repayment options. Apply today and take your business to the next level.",
  email: EMAILS.INFO,
  phone: "1800 309 8013",
};

const InterestRateChargesData = {
  data: [
    { title: "Interest Rate", sub_title: "Competitive rates based on seller profile and buyer strength" },
    { title: "Usance Period", sub_title: "Typically 30–90 days" },
    { title: "Interest Deduction", sub_title: "Interest is typically deducted upfront" },
    { title: "Processing Fees", sub_title: "Processing charges disclosed transparently" },
    { title: "Hidden Charges", sub_title: "None" },
  ],
  image_src: InterestRateImage7,
  alt: "cash flow with Sales Invoice Discounting",
};

const KeyBenefitsData = {
  data: [
    {
      title: "For Sellers",
      list: [
        "Improve cash flow without waiting for buyer payments",
        "No need for collateral or long approval processes",
        "Use funds for operations, inventory, or growth",
        "Ideal for businesses with extended payment cycles",
        "Minimal buyer involvement — only invoice acceptance and virtual account details required",
      ],
    },
    {
      title: "For Buyers",
      list: ["No credit exposure or liability", "No change in payment timelines — pay as per usual schedule"],
    },
  ],
  image: KeyBenifitsImage1,
  alt: "sales invoice discounting",
};

const steps = [
  { step: 1, title: "Seller Supplies Goods/Services and Raises an Invoice to the Buyer", icon: <SupplierRaisesIcon /> },
  { step: 2, title: "Seller Requests Finance by Submitting the Invoice to Ratnaafin", icon: <BuyerSubmits /> },
  { step: 3, title: "Financer Disburses Funds to the Seller on Day 0 (After Deducting Interest)", icon: <RatnaafinDisburses /> },
  { step: 4, title: "On the Invoice due Date, the Seller Collects Payment From the Buyer and Repays the Financer", icon: <BuyerRepaysIcon /> },
];

const heading = {
  key: "How does Sale Invoice Discounting work?",
  value: "Convert your sales invoices into instant cash by selling them to a financier at a discount.",
};

const participantsData = [
  { key: "Borrower", value: "Seller" },
  { key: "Financer", value: "Ratnaafin" },
  { key: "Buyer", value: "Customer of the seller (not a borrower)" },
];

const GlossaryData = [
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Seller:",
    description: "The business delivering goods/services and seeking early payment",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Buyer:",
    description: "The corporate customer obligated to pay the invoice (not a loan party)",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Invoice Discounting:",
    description: "Getting paid against an unpaid invoice before the due date",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Receivables Finance:",
    description: "Funding linked to expected payments from customers",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Usance Period:",
    description: "The time allowed until invoice repayment (30–90 days)",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Interest Deduction:",
    description: "Interest subtracted at the time of disbursal",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Virtual Account:",
    description: "Account mapped to collect buyer payments directly",
  },
  {
    icon: <ListIcon className="max-w-fit w-full h-full max-h-fit" />,
    title: "Collateral-Free:",
    description: "No physical security or asset required for funding",
  },
];

const EligibilityAndDocumentsData = [
  {
    image: Eligibility7,
    alt: "How does Sale Invoice Discounting work?",
    sections: [
      {
        title: "Eligibility Criteria",
        list: [
          "Businesses with regular B2B credit sales",
          "Sellers with verifiable invoices and accepted payment terms",
          "MSMEs with pending receivables from reputable buyers",
        ],
      },
      {
        title: "Documents Required",
        list: [
          "KYC documents (PAN, GST, business registration)",
          "Last 3 years of audited financials",
          "Latest bank statements and GST returns",
          "Existing loan sanction letters (if any)",
          "Buyer invoice and confirmation of acceptance",
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
    dispatch(setSelectedLoan({ ...selectedLoan, loanName: "Sale Invoice Discounting" }));
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="bg-gradient-to-l lg:bg-gradient-to-r from-primary-400 to-secondary-600 pt-10 grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 order-2">
          <Image
            fetchPriority="high"
            loading="eager"
            priority={true}
            src={SalesInvoiceDiscountingBanner}
            alt="Sale Invoice Discounting starting at 1.2 % Ratnaafin"
          />
        </div>
        <div className="lg:col-span-2 lg:order-2 container mx-auto px-4">
          <div className="sm:block hidden">
            <BreadCrum />
          </div>
          <div className="flex flex-col gap-4 xs:gap-8 h-full justify-center xl:mr-20 2xl:mr-[183px]">
            <div className="flex flex-col gap-2 text-white">
              <h2 className="text-xl xs:text-3xl sm::text-4xl font-bold">Smooth Operations, Seamless Expansion</h2>
              <h1>Unlock cash flow with Sales Invoice Discounting</h1>
            </div>
            <button
              onClick={() => moveToApplyLoan("apply-now")}
              className="bg-white hover:bg-primary-400 w-fit xs:text-base text-xs text-black hover:text-white transition-all px-4 py-2 rounded-full"
            >
              Get Sales Invoice Discounted
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <div className="grid lg:grid-cols-2 gap-5 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-xl p-5">
          <div className="flex justify-center">
            <Image
              loading="lazy"
              src={SalesInvoiceDiscountingProduct}
              alt="Sale Invoice Discounting"
              width={845}
              height={300}
              className="w-full h-full !object-cover"
            />
          </div>
          <div className="relative">
            <div className="flex flex-col gap-4 overflow-y-auto h-[427px] pr-2">
              <h2 className="font-bold text-xl sm:text-2xl text-quinary-100">Overview</h2>
              <p className="text-tertiary-500 text-sm sm:text-base">
                Sale Invoice Discounting allows businesses to unlock working capital tied up in unpaid invoices. Once goods or services are delivered and the
                invoice is raised, Ratnaafin steps in to discount the invoice and credit funds to the seller immediately. The seller later collects payment from
                the buyer and repays the financer on the due date.
              </p>
              <h6 className="font-semibold text-quinary-100">Built For:</h6>
              <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                <li>MSMEs and SMEs with credit sales to corporate clients</li>
                <li>Businesses experiencing delayed payments from buyers</li>
                <li>Enterprises seeking fast, collateral-free funding based on receivables</li>
              </ul>
            </div>
          </div>
        </div>
        <DiscountingWork steps={steps} heading={heading} participantsData={participantsData} />
        <KeyBenefits KeyBenefitsData={KeyBenefitsData} imageClassName="!object-left" />
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
        {/* <Faq payload={scf_sales_invoice_discounting_faq} /> */}
        {/* Glossary */}
        <Glossary GlossaryData={GlossaryData} />
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export default memo(Page);
