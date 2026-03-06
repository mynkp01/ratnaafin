"use client";
import { moveToApplyLoan } from "@/utils/helper";
import { Card, CardContent, Slider } from "@mui/material";
import dynamic from "next/dynamic";
import { memo } from "react";

const PieChart = dynamic(() => import("@/components/PieChart"), {
  ssr: false,
});

const toLocalObj = {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
};

function EmiCalculator({ loanEMI, setLoanEMI, title, description }) {
  // EMI Calculation Formula:
  // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  // where:
  // P = Principal loan amount
  // r = Monthly interest rate (annual rate / 12 / 100)
  // n = Total number of monthly payments (years * 12)

  const calculateEMI = () => {
    const monthlyInterestRate = loanEMI?.interestRate?.amount / 12 / 100; // Convert annual rate to monthly
    const totalInstallments = loanEMI?.tenure?.amount; // Convert years to months
    const monthlyEMI =
      (loanEMI?.loan?.amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalInstallments)) /
      (Math.pow(1 + monthlyInterestRate, totalInstallments) - 1);

    const totalAmount = monthlyEMI * totalInstallments;
    const interestAmount = totalAmount - loanEMI?.loan?.amount;

    return {
      emi: monthlyEMI,
      principalAmount: loanEMI?.loan?.amount,
      interestAmount: interestAmount,
      totalAmount: totalAmount,
      principalPercent: ((loanEMI?.loan?.amount / totalAmount) * 100).toFixed(2),
      interestPercent: ((interestAmount / totalAmount) * 100).toFixed(2),
    };
  };

  const { emi, principalAmount, interestAmount, totalAmount, principalPercent, interestPercent } = calculateEMI();

  return (
    <>
      <Card className="p-2 !rounded-xl lg:col-span-2 !shadow-[0_2px_5px_rgba(1,1,1,0.1)]">
        <CardContent className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="lg:text-left text-center text-2xl sm:text-3xl md:text-4xl font-bold text-quinary-100">{title}</h2>
            <p className="lg:text-left text-center w-full text-sm sm:text-base text-tertiary-500">{description}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between">
                <label className="font-semibold">Loan Amount</label>
                <p className="text-green-600 font-bold">{principalAmount?.toLocaleString("en-IN", toLocalObj)}</p>
              </div>
              <Slider
                value={loanEMI?.loan?.amount}
                min={loanEMI?.loan?.min}
                max={loanEMI?.loan?.max}
                step={loanEMI?.loan?.step}
                onChange={(e, value) => setLoanEMI((prev) => ({ ...prev, loan: { ...prev.loan, amount: value } }))}
                sx={{
                  color: "#1EB259",
                  "& .MuiSlider-thumb": {
                    borderRadius: "50%",
                    boxShadow: "0 0 0 6px rgba(34, 197, 94, 0.16)",
                  },
                  "& .MuiSlider-track": {
                    border: "none",
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.3,
                  },
                }}
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label className="font-semibold">Interest Rate</label>
                <p className="text-green-600 font-bold">{loanEMI?.interestRate?.amount}%</p>
              </div>
              <Slider
                value={loanEMI?.interestRate?.amount}
                min={loanEMI?.interestRate?.min}
                max={loanEMI?.interestRate?.max}
                step={loanEMI?.interestRate?.step}
                onChange={(e, value) => setLoanEMI((prev) => ({ ...prev, interestRate: { ...prev.interestRate, amount: value } }))}
                sx={{
                  color: "#1EB259",
                  "& .MuiSlider-thumb": {
                    borderRadius: "50%",
                    boxShadow: "0 0 0 6px rgba(34, 197, 94, 0.16)",
                  },
                  "& .MuiSlider-track": {
                    border: "none",
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.3,
                  },
                }}
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label className="font-semibold">Tenure (in months)</label>
                <p className="text-green-600 font-bold">{loanEMI?.tenure?.amount}</p>
              </div>
              <Slider
                value={loanEMI?.tenure?.amount}
                min={loanEMI?.tenure?.min}
                max={loanEMI?.tenure?.max}
                step={loanEMI?.tenure?.step}
                onChange={(e, value) => setLoanEMI((prev) => ({ ...prev, tenure: { ...prev.tenure, amount: value } }))}
                sx={{
                  color: "#1EB259",
                  "& .MuiSlider-thumb": {
                    borderRadius: "50%",
                    boxShadow: "0 0 0 6px rgba(34, 197, 94, 0.16)",
                  },
                  "& .MuiSlider-track": {
                    border: "none",
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.3,
                  },
                }}
              />
            </div>
          </div>
          {/* <button className="rounded-full w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full">
            <span className="relative z-10">Calculate</span>
          </button> */}
        </CardContent>
      </Card>

      <Card className="p-4 !rounded-xl !shadow-[0_2px_5px_rgba(1,1,1,0.1)]">
        <CardContent className="space-y-6">
          {/* <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-quinary-100">Calculate EMI</h2> */}
          <div className="flex justify-center relative">
            {/* <svg width="200" height="200" viewBox="-2 0 40 36" className="text-primary-400">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#1EB259" strokeWidth="8" strokeDasharray={`${principalPercent}, 100`} />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#046EB6"
                strokeWidth="8"
                strokeDasharray={`${interestPercent}, 100`}
                strokeDashoffset={-principalPercent}
              />
            </svg>
            <div className="absolute bottom-8 backdrop-blur-[9px] left-1/4 transform -translate-x-[70%] text-xs font-semibold text-white rounded-md bg-black py-1.5 px-5">
              {principalPercent}%
            </div>
            <div className="absolute top-8 backdrop-blur-[9px] right-1/4 transform translate-x-[45%] text-xs font-semibold text-white rounded-md bg-black py-1.5 px-5">
              {interestPercent}%
            </div>*/}
            <div className="absolute top-1/3">
              <p className="text-quinary-100 font-bold text-2xl text-center">EMI</p>
              <p className="text-quinary-100 font-bold text-3xl text-center">{emi?.toLocaleString("en-IN", toLocalObj)}</p>
            </div>
            <PieChart series={[principalPercent, interestPercent]} />
          </div>
          <ul className="text-sm space-y-2">
            <li className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-sm bg-primary-400"></span>
                <span className="text-quinary-100 font-semibold text-base">Principle Amount</span>
              </div>
              <span className="text-quinary-100 font-semibold text-base">{principalAmount?.toLocaleString("en-IN", toLocalObj)}</span>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-sm bg-secondary-600"></span>
                <span className="text-quinary-100 font-semibold text-base">Total Interest Payable</span>
              </div>
              <span className="text-quinary-100 font-semibold text-base">{interestAmount?.toLocaleString("en-IN", toLocalObj)}</span>
            </li>
            <hr />
            <li className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5"></span>
                <span className="text-quinary-100 font-bold text-base">Total Payment</span>
              </div>
              <span className="text-quinary-100 font-bold text-base">{totalAmount?.toLocaleString("en-IN", toLocalObj)}</span>
            </li>
          </ul>
          <div className="flex justify-center" onClick={() => moveToApplyLoan("apply-now")}>
            <button className="rounded-full w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full">
              <span className="relative z-10">Apply Now</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default memo(EmiCalculator);
