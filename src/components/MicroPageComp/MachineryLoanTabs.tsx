"use client";

import { DownArrow, KeyEligibilityCriteriaMechineryLoan, MachineryLoanApplicationProcess, MachineryLoanBanner } from "@/assets";
import { ROUTES } from "@/utils/Constant";
import {
  machinery_eligibilitydocument_faq,
  machinery_emicalculator_faq,
  machinery_howtoapply_faq,
  machinery_interestrate_faq,
  machinery_overview_faq,
} from "@/utils/F&Q";
import { moveToApplyLoan } from "@/utils/helper";
import { updateMetaTags } from "@/utils/helper.client";
import {
  MachineryApplyForBusinessData,
  MachineryDocumentationChecklistData,
  MachineryDocumentationWithRatnaafinData,
  MachineryEligibilityData,
  MachineryEMICalculatorData,
  MachineryInterestRateFactors,
  MachineryInterestRateRangeData,
  MachineryKeyFeaturesData,
  MachineryLoanApplicationProcessData,
  MachineryLoanRateOptimizationData,
  MachineryOverviewData,
  MachineryStabilityRequirementsData,
  MachinerySwiper_Data,
  MachineryTimelineData,
  MachineryTipsData,
  MachineryTrustedLendingData,
  MachineryTrustedParaData,
  MachineryWhyChooseUsData,
} from "@/utils/ProductsData";
import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import gsap from "gsap";
import dynamic from "next/dynamic";
import Image from "next/image";
import { notFound, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Faq from "../Faq";

const BreadCrum = dynamic(() => import("@/components/BreadCrum"), {
  ssr: false,
});
const SwiperSection = dynamic(() => import("@/components/MicroPageComp/SwiperSection"), {
  ssr: false,
});
const TrustedLending = dynamic(() => import("@/components/MicroPageComp/TrustedLending"), {
  ssr: false,
});
const OverviewSection = dynamic(() => import("@/components/MicroPageComp/OverviewSection"), {
  ssr: false,
});
const InfoSection = dynamic(() => import("@/components/MicroPageComp/InfoSection"), {
  ssr: false,
});
const InterestRateRange = dynamic(() => import("@/components/MicroPageComp/InterestRateRange"), {
  ssr: false,
});
const LoanRateOptimization = dynamic(() => import("@/components/MicroPageComp/LoanRateOptimization"), {
  ssr: false,
});
const EligibilityOverviewSection = dynamic(() => import("@/components/MicroPageComp/EligibilityOverviewSection"), {
  ssr: false,
});
const DocumentationChecklist = dynamic(() => import("@/components/MicroPageComp/DocumentationChecklist"), {
  ssr: false,
});
const LoanEmiProcess = dynamic(() => import("@/components/MicroPageComp/LoanEmiProcess"), {
  ssr: false,
});
const CallToActionBanner = dynamic(() => import("@/components/MicroPageComp/CallToActionBanner"), {
  ssr: false,
});
const ApprovalTipsStickySection = dynamic(() => import("@/components/MicroPageComp/ApprovalTipsStickySection"), {
  ssr: false,
});
const LoanApplicationProcess = dynamic(() => import("@/components/MicroPageComp/LoanApplicationProcess"), {
  ssr: false,
});
const EmiCalculator = dynamic(() => import("@/components/EmiCalculator"), {
  ssr: false,
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TAB_CONFIG = [
  {
    label: "Overview",
    slug: "overview",
    heroData: {
      title: "Machinery Loans up to ₹5 Crore for Manufacturing & Production Businesses",
      subTitle: "Finance new equipment, upgrade production capacity, and scale operations with quick approvals. Tailored solutions for industrial growth.",
    },
  },
  {
    label: "Interest Rates",
    slug: "interest-rates",
    heroData: {
      title: "Machinery Loan Interest Rate & Charges",
      subTitle:
        "Equipment financing should match equipment value and business cash flows. At Ratnaafin, transparent pricing ensures you know the total cost of machinery ownership upfront; no surprises, only clarity.",
    },
  },
  {
    label: "Eligibility & Document",
    slug: "eligibility-document",
    heroData: {
      title: "Eligibility Criteria and Required Document",
      subTitle:
        "Machinery loans are designed for established manufacturing and production businesses with clear equipment investment needs. Our eligibility criteria are straightforward because we understand what it takes to run a successful production operation.",
    },
  },
  {
    label: "How To Apply",
    slug: "how-to-apply",
    heroData: {
      title: "How to Apply for an Instant Machinery Loan?",
      subTitle:
        "Financing your machinery should be as streamlined as your manufacturing process. Ratnaafin's straightforward, digital-first application process gets your equipment funded quickly so you can focus on production, not paperwork.",
    },
  },
  {
    label: "EMI Calculator",
    slug: "emi-calculator",
    heroData: {
      title: "Machinery Loan EMI Calculator",
      subTitle:
        "Before committing to equipment financing, understand the true cost of machinery ownership. Our EMI calculator helps you plan repayment aligned with your equipment's productive life and your business's cash generation capability.",
    },
  },
];

const OverviewProp = {
  header: {
    title: "Why Choose Ratnaafin Machinery Loan?",
    description: "Designed for manufacturing, construction, and production businesses that need reliable equipment financing without complexity.",
  },
  cards: MachineryOverviewData,
};

const KeyFeaturesProp = {
  header: { title: "Key Features" },
  cards: MachineryKeyFeaturesData,
  link: { link: ROUTES.client.termsAndConditions, text: `*T&C Apply` },
};

const interestRateFactorsProp = {
  header: { title: "Factors Influencing Interest Rate", description: "Your final rate depends on four critical areas we assess:" },
  cards: MachineryInterestRateFactors,
};
const whyChooseUsProp = {
  header: { title: "Why Our Pricing Works for Businesses" },
  cards: MachineryWhyChooseUsData,
};
const SwiperDataProp = {
  header: {
    title: "Ideal For",
    description:
      "If your business relies on machinery, equipment, or tools to generate revenue, we have a financing solution. MSMEs which are looking forward to:",
  },
  cards: MachinerySwiper_Data,
};
const MachineryInterestRateRangeProp = {
  cards: MachineryInterestRateRangeData,
};
const MachineryLoanRateOptimizationProp = {
  header: {
    title: "How to lower your Machinery Loan rate?",
  },
  cards: MachineryLoanRateOptimizationData,
};
const ApplyForBusinessProp = {
  header: {
    title: "Who Can Apply for a Machinery Loan?",
  },
  cards: MachineryApplyForBusinessData,
};
const DocumentationWithRatnaafinProp = {
  header: {
    title: "Why Minimum Documentation with Ratnaafin?",
  },
  cards: MachineryDocumentationWithRatnaafinData,
};
const StabilityRequirementsProp = {
  header: {
    title: "Income and Stability Requirements",
  },
  cards: MachineryStabilityRequirementsData,
};
const EMICalculatorProp = {
  header: {
    title: "Why should you use an EMI calculator before applying for a Machinery Loan?",
  },
  cards: MachineryEMICalculatorData,
};
const eligibilityProp = {
  header: {
    title: "Key Eligibility Criteria",
  },
  image: KeyEligibilityCriteriaMechineryLoan,
  cards: MachineryEligibilityData,
};
const DocumentationChecklistProp = {
  header: {
    title: "Documentation Checklist",
  },
  cards: MachineryDocumentationChecklistData,
};
const LoanEmiProcessProp = {
  header: {
    title: "How to Use the Machinery Loan EMI Calculator",
  },
  cards: MachineryTimelineData,
};
const tipsProp = {
  header: {
    title: "Tips to Improve Approval Chances",
  },
  cards: MachineryTipsData,
};
const LoanApplicationProcessProp = {
  header: {
    title: "Machinery Loan Application Process",
  },
  cards: MachineryLoanApplicationProcessData,
  image: MachineryLoanApplicationProcess,
};

const newsLatterData = {
  title: "Ready to unlock the potential of your dreams?",
  description: "Take the first step toward turning your vision into reality. Embrace new possibilities, explore opportunities, and make your dreams happen",
  button1: "Request a Call Back",
  button2: "Visit Our Office",
};

const initialLoanEMI = {
  loan: {
    amount: 5000000,
    min: 500000,
    max: 50000000,
    step: 100000,
  },
  interestRate: {
    amount: 12,
    min: 10,
    max: 15,
    step: 0.1,
  },
  tenure: {
    amount: 36,
    min: 12,
    max: 84,
    step: 1,
  },
};

function TabPanel({ children, value, index }: TabPanelProps) {
  if (value !== index) return null;

  return (
    <div role="tabpanel" id={`tab-panel-${index}`} aria-labelledby={`tab-${index}`} className="pt-6">
      {children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tab-panel-${index}`,
  };
}

export default function MachineryLoanTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);
  const tabContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const basePath = "/machinery-loan";
  const currentSlug = pathname?.split("/").pop();

  const getTabIndexFromSlug = (slug?: string) => {
    switch (slug) {
      case "overview":
        return 0;
      case "interest-rates":
        return 1;
      case "eligibility-document":
        return 2;
      case "how-to-apply":
        return 3;
      case "emi-calculator":
        return 4;
      default:
        return null;
    }
  };

  const [value, setValue] = useState(() => getTabIndexFromSlug(currentSlug) ?? 0);

  const [loanEMI, setLoanEMI] = useState(initialLoanEMI);

  const handleApplyNow = () => {
    const section = document.getElementById("apply-now");
    if (!section) return;

    const HEADER_OFFSET = 150;

    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  if (value == null) {
    return notFound();
  }

  const handleTabChange = (index: number) => {
    setValue(index);

    const slug = TAB_CONFIG[index]?.slug || "overview";

    // Update meta tags
    updateMetaTags(slug, "machineryLoan");

    // Update URL WITHOUT navigation or remount
    history.replaceState(null, "", `${basePath}/${slug}`);

    setOpenDropdown(false);

    // Use requestAnimationFrame and setTimeout to ensure tab content is rendered before scrolling
    if (tabContainerRef.current) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (tabContainerRef.current) {
            const HEADER_OFFSET = isMobile ? 112 : 128; // Match your sticky top offset (top-28 = 112px, top-32 = 128px)
            const elementPosition = tabContainerRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        }, 50); // Small delay to ensure content is rendered
      });
    }
  };

  // Update meta tags on initial mount
  useEffect(() => {
    const currentSlug = pathname?.split("/").pop();
    const slug = (currentSlug && TAB_CONFIG.find((tab) => tab.slug === currentSlug)?.slug) || "overview";

    // Use setTimeout to ensure DOM is ready and avoid hydration issues
    const timeoutId = setTimeout(() => {
      updateMetaTags(slug, "machineryLoan");
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  // Update meta tags when pathname changes
  useEffect(() => {
    const currentSlug = pathname?.split("/").pop();
    const slug = (currentSlug && TAB_CONFIG.find((tab) => tab.slug === currentSlug)?.slug) || "overview";
    updateMetaTags(slug, "machineryLoan");
  }, [pathname]);

  useEffect(() => {
    if (!dropdownRef.current) return;

    if (openDropdown) {
      gsap.to(dropdownRef.current, {
        height: "auto",
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
        clearProps: "height",
      });

      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          rotate: 180,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    } else {
      gsap.to(dropdownRef.current, {
        height: 0,
        opacity: 0,
        y: -8,
        duration: 0.3,
        ease: "power2.in",
      });

      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          rotate: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [openDropdown]);

  return (
    <>
      <div className="bg-gradient-to-l lg:bg-gradient-to-r from-primary-400 to-secondary-600 pt-10 grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 order-2">
          <Image fetchPriority="high" loading="eager" priority={true} src={MachineryLoanBanner} alt="business loan, business loan mumbai" />
        </div>
        <div className="lg:col-span-2 lg:order-2 container mx-auto 2xl:px-8 px-4">
          <div className="sm:block hidden">
            <BreadCrum />
          </div>
          <div className="flex flex-col gap-4 xs:gap-8 h-full justify-center xl:-mt-6 xl:mr-20 2xl:mr-[183px]">
            <div className="flex flex-col gap-2 text-white">
              <h2 className="text-xl md:text-3xl xl:text-4xl font-bold">{TAB_CONFIG[value]?.heroData?.title}</h2>
              <h1>{TAB_CONFIG[value]?.heroData?.subTitle}</h1>
            </div>
            <button
              onClick={() => moveToApplyLoan("apply-now")}
              className="bg-white hover:bg-primary-400 w-fit xs:text-base text-xs text-black hover:text-white transition-all px-4 py-2 rounded-full"
            >
              Apply Now
            </button>
          </div>
          {/* <div className="flex flex-col gap-4 xs:gap-8 h-full justify-center xl:-mt-6 xl:mr-20 2xl:mr-[183px]">
            <div className="flex flex-col gap-2 text-white">
              <h2 className="text-xl md:text-3xl xl:text-4xl font-bold">Ab Machine Bhi Daudegi Aur Business Bhi</h2>
              <h1>Power up your productivity with Ratnaafin's Machinery Loan</h1>
            </div>
            <button
              onClick={() => moveToApplyLoan("apply-now")}
              className="bg-white hover:bg-primary-400 w-fit xs:text-base text-xs text-black hover:text-white transition-all px-4 py-2 rounded-full"
            >
              Apply Now Machinery Loan
            </button>
          </div> */}
        </div>
      </div>
      <div className="xs:container mx-auto 2xl:px-8">
        <div className="shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-senarylight-50 xs:rounded-xl lg:-mt-24 sm:gap-0 gap-4 grid items-center sm:divide-y-0 divide-y sm:flex py-8 px-4 sm:justify-between sm:divide-x divide-tertiary-500/40">
          <div className="w-full text-center space-y-2">
            <p className="text-sm text-quinary-100">Interest Rates</p>
            <h4 className="font-semibold text-2xl text-quinary-100">
              Starting at less than{" "}
              <span className="font-bold text-4xl text-primary-400">
                1%<sup>*</sup>
              </span>{" "}
              per month
            </h4>
          </div>
          <div className="w-full text-center space-y-2 sm:pt-0 pt-4">
            <p className="text-sm text-quinary-100">Loan Amount</p>
            <h4 className="font-semibold text-2xl text-quinary-100">
              Up to <span className="font-bold text-4xl text-primary-400">₹5 Cr </span> based on machinery valuation and business profile
            </h4>
          </div>
          <div className="w-full text-center space-y-2 sm:pt-0 pt-4">
            <p className="text-sm text-quinary-100">Tenure </p>
            <h4 className="font-semibold text-2xl text-quinary-100">
              <span className="font-bold text-4xl text-primary-400">12 </span> to
              <span className="font-bold text-4xl text-primary-400"> 84 </span> months
            </h4>
          </div>
        </div>

        {/* <div className=" shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-senarylight-50 xs:rounded-xl lg:-mt-24 sm:gap-0 gap-4 grid items-center sm:divide-y-0 divide-y sm:flex py-8 px-4 sm:justify-between sm:divide-x divide-tertiary-500/40">
          <div className="w-full text-center space-y-2">
            <p className="text-sm text-quinary-100">Competitive Interest Rates</p>
            <h4 className="font-semibold text-xl xl:text-2xl text-quinary-100">
              Starting from{" "}
              <span className="font-bold text-3xl xl:text-4xl text-primary-400">
                1.2<sup>*</sup>%
              </span>{" "}
              per month
            </h4>
          </div>
          <div className="w-full text-center space-y-2 sm:pt-0 pt-4">
            <p className="text-sm text-quinary-100">Fast Turnaround Time</p>
            <h4 className="font-semibold text-xl xl:text-2xl text-quinary-100">
              Within{" "}
              <span className="font-bold text-3xl xl:text-4xl text-primary-400">
                48<sup>*</sup>{" "}
              </span>{" "}
              hours
            </h4>
          </div>
          <div className="w-full text-center space-y-2 sm:pt-0 pt-4">
            <p className="text-sm text-quinary-100">Flexible Loan Tenure </p>
            <h4 className="font-semibold text-xl xl:text-2xl text-quinary-100">
              <span className="font-bold text-3xl xl:text-4xl text-primary-400">12 </span> to{" "}
              <span className="font-bold text-3xl xl:text-4xl text-primary-400">36 </span> months
            </h4>
          </div>
        </div> */}
      </div>

      <Box className="w-full flex flex-col gap-4" ref={tabContainerRef}>
        <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4 sticky xl:top-32 top-28 z-20">
          <Box className="sm:flex grid lg:items-center items-start gap-2 bg-white rounded-lg px-2 py-2 border border-senarylight-50">
            <Box className="flex-1 relative">
              {/* MOBILE DROPDOWN MENU */}
              {isMobile ? (
                <>
                  {/* Trigger */}
                  <button
                    onClick={() => setOpenDropdown((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-senarylight-50 text-sm font-medium text-secondary-600"
                  >
                    {TAB_CONFIG[value].label}
                    <span ref={arrowRef}>
                      <DownArrow />
                    </span>
                  </button>

                  {/* GSAP DROPDOWN */}
                  <div ref={dropdownRef} style={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-2">
                      {TAB_CONFIG.map((tab, index) => (
                        <button
                          key={tab.slug}
                          onClick={() => handleTabChange(index)}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                            value === index ? "bg-senarylight-50 rounded-lg text-secondary-600 font-medium" : "hover:bg-senarylight-50/50"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* DESKTOP TABS */
                <Tabs
                  value={value}
                  onChange={(_, newValue) => handleTabChange(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                  slotProps={{ indicator: { style: { display: "none" } } }}
                  sx={{
                    minHeight: 40,
                    "& .MuiTabs-flexContainer": { gap: "6px" },
                  }}
                >
                  {TAB_CONFIG.map(({ label, slug }, index) => (
                    <Tab
                      key={slug}
                      label={label}
                      disableRipple
                      {...a11yProps(index)}
                      sx={{
                        textTransform: "none",
                        fontSize: 14,
                        fontWeight: 500,
                        minHeight: 36,
                        px: 2,
                        borderRadius: "6px",
                        color: value === index ? "#046EB6" : "#1A1D1F",
                        backgroundColor: value === index ? "#EEF3FF" : "transparent",
                        "&:hover": { backgroundColor: "#EEF3FF" },
                      }}
                    />
                  ))}
                </Tabs>
              )}
            </Box>

            {/* Apply Now Button */}
            <button
              type="submit"
              onClick={handleApplyNow}
              className="rounded-full sm:w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
            >
              <span className="relative z-10">Apply Now</span>
            </button>
          </Box>
        </div>

        <TabPanel value={value} index={0}>
          <div className="flex flex-col gap-10">
            <OverviewSection data={OverviewProp} />
            <SwiperSection data={SwiperDataProp} />
            <InfoSection data={KeyFeaturesProp} columns={5} />
            <TrustedLending title={MachineryTrustedLendingData.title} />
            <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
              <Faq payload={machinery_overview_faq} />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="flex flex-col gap-10">
            <InterestRateRange data={MachineryInterestRateRangeProp} />
            <div className="bg-senarylight-50">
              <InfoSection data={whyChooseUsProp} columns={3} />
            </div>
            <InfoSection data={interestRateFactorsProp} />
            <div className="flex flex-col gap-10 !w-full !max-w-full" ref={sectionRef}>
              <LoanRateOptimization ref={sectionRef} data={MachineryLoanRateOptimizationProp} />
              <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
                <Faq payload={machinery_interestrate_faq} />
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="flex flex-col gap-10">
            <SwiperSection data={ApplyForBusinessProp} />
            <EligibilityOverviewSection data={eligibilityProp} />
            <div className="bg-senarylight-50">
              <InfoSection data={StabilityRequirementsProp} />
            </div>
            <DocumentationChecklist data={DocumentationChecklistProp} />
            <div className="bg-senarylight-50">
              <InfoSection data={DocumentationWithRatnaafinProp} columns={2} />
            </div>
            <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
              <Faq payload={machinery_eligibilitydocument_faq} />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div className="flex flex-col gap-10">
            <LoanApplicationProcess data={LoanApplicationProcessProp} />
            <CallToActionBanner {...newsLatterData} />
            <ApprovalTipsStickySection data={tipsProp} />
            <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
              <Faq payload={machinery_howtoapply_faq} />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <div className="flex flex-col gap-10">
            <LoanEmiProcess data={LoanEmiProcessProp} />
            {/*  EMI Calculate */}
            <div className="container mx-auto 2xl:px-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6" id="emicalculator">
              <EmiCalculator
                loanEMI={loanEMI}
                setLoanEMI={setLoanEMI}
                title="EMI Calculator"
                description="Quickly estimate your monthly EMIs with our Business Loan EMI Calculator and plan your finances with confidence. Try now!"
              />
            </div>
            <div className="bg-senarylight-50 flex flex-col gap-10">
              <InfoSection data={EMICalculatorProp} />
              <TrustedLending title={MachineryTrustedParaData.title} />
            </div>
            <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
              <Faq payload={machinery_emicalculator_faq} />
            </div>
          </div>
        </TabPanel>
      </Box>
    </>
  );
}
