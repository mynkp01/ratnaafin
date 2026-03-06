"use client";
import { apiHandler } from "@/api/apiHandler";
import { Eligibility3, InterestRateImage3, PlayIcon, ResidentialSolarLoanBanner } from "@/assets";
import { selectScreen, selectSelectedLoan, setIsLoading, setSelectedLoan, setShowYouTubeIFrame } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { convertMediaUrl, EMAILS, ROUTES } from "@/utils/Constant";
import { residential_solar_loan_faq } from "@/utils/F&Q";
import { moveToApplyLoan, showToast } from "@/utils/helper";
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
    amount: 300000,
    min: 50000,
    max: 1000000,
    step: 10000,
  },
  interestRate: {
    amount: 10.5,
    min: 8.75,
    max: 15,
    step: 0.1,
  },
  tenure: {
    amount: 18,
    min: 6,
    max: 48,
    step: 1,
  },
};

const newsLatterData = {
  title: "Ready to unlock the potential of your dreams?",
  description: "Take the first step toward turning your vision into reality. Embrace new possibilities, explore opportunities, and make your dreams happen",
  button: "Request a Call Back",
};
const buttonTabs = ["Eligibility & Documentation", "Interest rate & charges", "EMI Calculator"];
const sectionIds = ["eligibilitydocuments", "interestrate", "emicalculator"];
const InterestRateChargesData = {
  data: [
    { title: "Interest Rate", sub_title: "10%<sup>*</sup> p.a. Onwards (reducing balance)" },
    { title: "Loan Amount", sub_title: "₹10K to ₹10 Lakh" },
    { title: "Loan Processing Fees", sub_title: "Nil" },
    { title: "Documentation Charges", sub_title: "₹2500 + Applicable GST" },
    { title: "Loan Tenure", sub_title: "6 - 48 months" },
  ],
  image_src: InterestRateImage3,
  alt: "Residential Solar Loan 10%* p.a.",
};

const applyLoanData = {
  title: "Take the First Step Towards Your Goals",
  description:
    "Unlock business growth with Ratnaafin’s Residential Solar loans at competitive interest rates. Get fast approvals, minimal documentation, and flexible repayment options. Apply today and take your business to the next level.",
  email: EMAILS.INFO,
  phone: "1800 309 8013",
};

function Page() {
  const dispatch = useAppDispatch();
  const currentScreen = useSelector(selectScreen);
  const selectedLoan = useSelector(selectSelectedLoan);
  const [loanEMI, setLoanEMI] = useState(initialLoanEMI);
  const [activeTab, setActiveTab] = useState(0);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    dispatch(setSelectedLoan({ ...selectedLoan, loanName: "Residential Solar Finance" }));
    fetchYouTube();
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

  const fetchYouTube = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.youtube.lookup(`search=Solar`);
      if (status === 200 || status === 201) {
        setVideo(data?.data);
      } else {
        showToast("error", data?.message);
      }
    } catch (error) {
      showToast("error", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

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
          <Image fetchPriority="high" loading="eager" priority={true} src={ResidentialSolarLoanBanner} alt="Residential Solar Loan" />
        </div>
        <div className="lg:col-span-2 lg:order-2 container mx-auto px-4">
          <div className="sm:block hidden">
            <BreadCrum />
          </div>
          <div className="flex flex-col gap-4 xs:gap-8 h-full justify-center xl:mr-20 2xl:mr-[183px]">
            <div className="flex flex-col gap-2 text-white">
              <h2 className="text-xl xs:text-3xl sm::text-4xl font-bold">Savings Ka Raasta Ab Chhat Se Hokar Jayega</h2>
              <h1>{"Reduce electricity bills with Ratnaafin's Solar Loan"}</h1>
            </div>
            <button
              onClick={() => moveToApplyLoan("apply-now")}
              className="bg-white hover:bg-primary-400 w-fit xs:text-base text-xs text-black hover:text-white transition-all px-4 py-2 rounded-full"
            >
              Apply for Residential Solar Loan
            </button>
          </div>
        </div>
      </div>
      <div className="xs:container mx-auto 2xl:px-8">
        <div className="shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-senarylight-50 xs:rounded-xl lg:-mt-24 sm:gap-0 gap-4 grid items-center sm:divide-y-0 divide-y sm:flex py-8 px-4 sm:justify-between sm:divide-x divide-tertiary-500/40">
          <div className="w-full text-center space-y-2">
            <p className="text-sm text-quinary-100">Attractive Interest Rates</p>
            <h4 className="font-semibold text-2xl text-quinary-100">
              Starting at least{" "}
              <span className="font-bold text-4xl text-primary-400">
                1%
                <sup>*</sup>
              </span>{" "}
              per month
            </h4>
          </div>
          <div className="w-full text-center space-y-2 sm:pt-0 pt-4">
            <p className="text-sm text-quinary-100">Fastest Turnaround Time</p>
            <h4 className="font-semibold text-2xl text-quinary-100">
              Within{" "}
              <span className="font-bold text-4xl text-primary-400">
                48<sup>*</sup>{" "}
              </span>{" "}
              hours
            </h4>
          </div>
          <div className="w-full text-center space-y-2 sm:pt-0 pt-4">
            <p className="text-sm text-quinary-100">Flexible Loan Tenure </p>
            <h4 className="font-semibold text-2xl text-quinary-100">
              <span className="font-bold text-4xl text-primary-400">6 </span> to
              <span className="font-bold text-4xl text-primary-400"> 48</span> months
            </h4>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <div className="grid lg:grid-cols-2 gap-5 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-xl p-5">
          <div>
            {video?.[0]?.doc_path && (
              <>
                <button onClick={() => dispatch(setShowYouTubeIFrame({ show: true, video: video?.[0] }))} className="relative">
                  <Image
                    loading="lazy"
                    width={706}
                    height={423}
                    src={convertMediaUrl(video?.[0]?.doc_path)}
                    alt="residential solar loan explained"
                    className="!object-cover rounded-xl"
                  />
                  <div className="absolute left-1/2 top-1/2 z-30 flex !rounded-full -translate-x-1/2 -translate-y-1/2 items-center text-white">
                    <PlayIcon className="size-6 min-h-6 min-w-6 " />
                  </div>
                </button>
              </>
            )}
          </div>
          <div className="relative">
            <div className="flex flex-col gap-4 overflow-y-auto h-[427px] pr-2">
              <h2 className="font-bold text-xl sm:text-2xl text-quinary-100">Residential Solar Loan</h2>
              <p className="text-tertiary-500 text-sm sm:text-base">
                Ratnaafin’s Residential Solar Loan is tailored to make the shift to solar energy more affordable, accessible, and rewarding for homeowners
                across India.
              </p>
              <p className="text-tertiary-500 text-sm sm:text-base">
                As a trusted solar finance company in India, we help customers adopt solar power systems without the burden of upfront costs through flexible
                EMIs and competitive interest rates.
              </p>
              <p className="text-tertiary-500 text-sm sm:text-base">
                With our seamless Solar financing, you can reduce electricity bills, lower your carbon footprint, and increase your property’s value.
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
          <div className="grid lg:grid-cols-5 items-center gap-y-5 lg:gap-2 lg:p-0 p-5 shadow-[0_2px_5px_rgba(1,1,1,0.1)] bg-white rounded-xl">
            <div className="lg:col-span-2 h-full">
              <Image
                loading="lazy"
                src={Eligibility3}
                alt="Apply for Residential Solar Loan"
                className="lg:rounded-none lg:rounded-l-xl rounded-xl h-full w-full object-cover"
              />
            </div>
            <div className="lg:col-span-3 flex flex-col gap-6 lg:p-5">
              <div className="flex flex-col gap-5">
                <h5 className="font-bold text-xl sm:text-2xl text-quinary-100">Eligibility Criteria</h5>
                <div className="sm:flex grid gap-5 sm:divide-x text-sm sm:text-base">
                  <div className="space-y-2 pr-5 text-quinary-100">
                    <h6 className="font-semibold text-quinary-100">Age of borrower</h6>
                    <p>21 - 70 years</p>
                  </div>
                  <div className="space-y-2 sm:px-5 text-quinary-100">
                    <h6 className="font-semibold">Borrower profile</h6>
                    <p>Indian resident owning residential property</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h5 className="font-bold text-xl sm:text-2xl text-quinary-100">Documents Required</h5>
                <div className="divide-y">
                  <p className="py-3 text-quinary-100 text-sm sm:text-base">KYC of applicant and co-owner (if any)</p>
                  <p className="py-3 text-quinary-100 text-sm sm:text-base">Recent electricity bills (last 3 months)</p>
                  <p className="py-3 text-quinary-100 text-sm sm:text-base">{"Bank statements – last 12 months ( Loan  > 3.5 Lacs )"}</p>
                  <p className="py-3 text-quinary-100 text-sm sm:text-base">Copy of solar system quotation/proforma invoice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Interest Rate and Charges */}
        <InterestRateCharges payload={InterestRateChargesData} />
        {/*  EMI Calculate */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="emicalculator">
          <EmiCalculator
            loanEMI={loanEMI}
            setLoanEMI={setLoanEMI}
            title="EMI Calculator"
            description="Quickly estimate your monthly EMIs with our Solar Loan EMI Calculator and plan your finances with confidence. Try now!"
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
        <Faq payload={residential_solar_loan_faq} />
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export default memo(Page);
