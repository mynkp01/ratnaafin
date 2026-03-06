"use client";
import { EMAILS } from "@/utils/Constant";
import dynamic from "next/dynamic";
import { memo, useState } from "react";

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
const LatestBlog = dynamic(() => import("@/components/LatestBlog"), {
  ssr: false,
});
const BusinessLoanTabs = dynamic(() => import("@/components/MicroPageComp/BusinessLoanTabs"), {
  ssr: false,
});

const initialLoanEMI = {
  loan: {
    amount: 2500000,
    min: 300000,
    max: 5000000,
    step: 100000,
  },
  interestRate: {
    amount: 16,
    min: 14,
    max: 25,
    step: 0.1,
  },
  tenure: {
    amount: 18,
    min: 12,
    max: 36,
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
    "Unlock business growth with Ratnaafin’s unsecured business loans at competitive interest rates. Get fast approvals, minimal documentation, and flexible repayment options. Apply today and take your business to the next level.",
  email: EMAILS.INFO,
  phone: "1800 309 8013",
};

function Page() {
  const [loanEMI, setLoanEMI] = useState(initialLoanEMI);

  return (
    <div className="flex flex-col gap-6 md:gap-12">
      <BusinessLoanTabs />
      <ApplyForLoan applyLoanData={applyLoanData} loanEMI={loanEMI} disable={true} />
      <div className="container mx-auto py-12 2xl:px-8 px-4" id="testimonial">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Hear from Our Happy Customers</h3>
            <p className="text-center w-full text-sm sm:text-base text-tertiary-500">Aapki mehnat, humara saath, Business karega karamaat</p>
          </div>
          <HappyCustomer />
        </div>
      </div>
      <LatestBlog />
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export default memo(Page);
