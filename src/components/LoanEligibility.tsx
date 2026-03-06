"use client";
import { AccordionIcon } from "@/assets";
import { selectSelectedLoan, setSelectedLoan, setShowRequestCallbackForm } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { ROUTES } from "@/utils/Constant";
import { isEmpty } from "@/utils/helper";
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import NoData from "./NoData";

interface LoanEligibilityOption {
  label: string;
  value: string;
}
interface EligibleObj {
  annualIncome?: number;
  annualTurnover?: number;
  emis?: number;
  estimatedMarket?: number;
  currentRole?: string;
  bussinessNature?: string;
  collateralProperty?: string;
  bussinessNaturePer?: number;
}

interface LoanEligibilityItem {
  _id: number;
  question: string;
  answer: string;
  options?: LoanEligibilityOption[];
  isVisible: boolean;
  textAnswer?: string;
  isTextInput?: boolean;
}

const loanEligibilityData: LoanEligibilityItem[] = [
  {
    _id: 0,
    question: "Which best describes your current role?",
    answer: "",
    options: [
      { label: "I'm a salaried professional", value: "salaried" },
      { label: "I run my own business (<₹2Cr turnover)", value: "smallBiz" },
      {
        label: "My business turns over > ₹2Cr (GST-registered)",
        value: "largeBiz",
      },
      {
        label: "I'm part of an established conglomerate",
        value: "conglomerate",
      },
    ],
    isVisible: true,
  },
  {
    _id: 1,
    question: "What's your annual income (₹)?",
    answer: "",
    isVisible: true,
  },
  {
    _id: 2,
    question: "What's your total annual turnover (₹)?",
    answer: "",
    isVisible: false,
  },
  {
    _id: 3,
    question: "Which best fits your business nature?",
    answer: "",
    isVisible: true,
    options: [
      { label: "Manufacturer ", value: "manufacturer" },
      { label: "Trader", value: "trader" },
      {
        label: "Services",
        value: "services",
      },
    ],
  },
  {
    _id: 4,
    question: "Do you have existing EMIs?",
    answer: "",
    isVisible: true,
    isTextInput: true,
    textAnswer: "",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    _id: 5,
    question: "Do you own collateral property?",
    answer: "",
    isVisible: true,
    options: [
      { label: "Residential", value: "residential" },
      { label: "Commercial", value: "commercial" },
      { label: "Industrial", value: "industrial" },
      { label: "None", value: "none" },
    ],
  },
  {
    _id: 6,
    question: "Estimated market value of your collateral (₹)?",
    answer: "",
    isVisible: false,
  },
];

const LoanEligibilityList = [
  {
    _id: 0,
    content: "You can be Eligible for",
    title: "Business Loan",
    price: "",
    href: ROUTES.product.businessLoan,
    value_code: "BL",
    value: "business_loan",
    isVisible: true,
    key: "Business Loan",
  },
  {
    _id: 1,
    content: "You can be Eligible for",
    title: "Loan Against Property",
    price: "",
    href: ROUTES.product.loanAgainstProperty,
    value_code: "LAP",
    value: "loan_against_property",
    isVisible: true,
    key: "Loan Against Property",
  },
  {
    _id: 2,
    content: "You can be Eligible for",
    title: "Residential Solar Loan",
    price: "",
    href: ROUTES.product.residentialSolarLoan,
    value_code: "RSL",
    value: "rooftop_solar_loan",
    isVisible: true,
    key: "Residential Solar Finance",
  },
  {
    _id: 3,
    content: "You can be Eligible for",
    title: "Commercial/Industrial Solar Loan",
    price: "",
    href: ROUTES.product.commercialSolarLoan,
    value_code: "CSL",
    value: "rooftop_solar_loan",
    isVisible: true,
    key: "Commercial/Industrial Solar Finance",
  },
  {
    _id: 4,
    content: "You can be Eligible for",
    title: "Machinery Loan",
    price: "",
    href: ROUTES.product.machineryLoan,
    value_code: "ML",
    value: "machinery_loan",
    isVisible: true,
    key: "Machinery Loan",
  },
];

const loanEligibilityConstant = {
  BL: {
    tenure: 36,
    rates: 16,
    bankingPolicyLoan: 1500000,
    gstPolicyLoan: 2500000,
  },
  LAP: {
    tenure: 144,
    rates: 13.5,
    bankingPolicyLoan: 50000000,
    gstPolicyLoan: 50000000,
  },
  ML: {
    tenure: 84,
    rates: 14,
    bankingPolicyLoan: 2500000,
    gstPolicyLoan: 5000000,
  },
};

const LoanEligibility = () => {
  const dispatch = useAppDispatch();
  const selectedLoan = useSelector(selectSelectedLoan);
  const [loanEligibility, setLoanEligibility] = useState<LoanEligibilityItem[]>(loanEligibilityData);
  const [expanded, setExpanded] = useState<number | false>(loanEligibilityData[0]?._id);
  const [eligibleFor, setEligibleFor] = useState(LoanEligibilityList);
  const [showResults, setShowResults] = useState(false);

  const moveToNextQuestion = useCallback(() => {
    setTimeout(() => {
      setLoanEligibility((currentState) => {
        const visibleQuestions = currentState.filter((item) => item.isVisible);
        const firstUnansweredQuestion = visibleQuestions.find((item) => {
          if (item.isTextInput) {
            // For text input questions, check both answer and textAnswer
            return item.answer === "" || (item.answer === "yes" && item.textAnswer === "");
          }
          return item.answer === "";
        });

        if (firstUnansweredQuestion) {
          setExpanded(firstUnansweredQuestion._id);
        }

        return currentState;
      });
    }, 100);
  }, []);

  const handleExpand = (panel: number) => {
    const prevVisible = loanEligibility
      .slice(0, panel)
      .reverse()
      .find((item) => item.isVisible);

    if (!prevVisible || prevVisible.answer !== "") {
      setExpanded(expanded === panel ? false : panel);
    }
  };
  useEffect(() => {
    const role = loanEligibility.find((q) => q._id === 0)?.answer;

    const collateral = loanEligibility.find((q) => q._id === 5)?.answer;

    setLoanEligibility((prev) =>
      prev.map((item) => {
        if (item._id === 1) {
          return { ...item, isVisible: role === "salaried" || role === "smallBiz" };
        }
        if (item._id === 2) {
          return { ...item, isVisible: role === "largeBiz" || role === "conglomerate" };
        }
        if (item._id === 3) {
          return { ...item, isVisible: role !== "salaried" && !!role };
        }
        if (item._id === 6) {
          return { ...item, isVisible: collateral !== "none" && !!collateral };
        }
        return item;
      })
    );
  }, [loanEligibility.find((q) => q._id === 0)?.answer, loanEligibility.find((q) => q._id === 4)?.answer, loanEligibility.find((q) => q._id === 5)?.answer]);

  const checkBoxHandle = (_id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.name;

    setLoanEligibility((prev) =>
      prev.map((item) => {
        if (item._id === _id) {
          return { ...item, answer: value };
        }
        if (item._id > _id) {
          return { ...item, answer: "", textAnswer: "" };
        }
        return item;
      })
    );

    setShowResults(false);

    moveToNextQuestion();
  };

  const handleChange = useCallback((_id: number | string, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setEligibleFor((prev) =>
      prev.map((item) => {
        return { ...item, price: "" };
      })
    );

    setLoanEligibility((prev) =>
      prev.map((item) => {
        if (Number(_id) === 4) {
          return { ...item, textAnswer: value };
        }
        if (item._id === Number(_id)) {
          return { ...item, answer: value };
        }
        if (item._id > Number(_id)) {
          return { ...item, answer: "", textAnswer: "" };
        }

        return item;
      })
    );
    setShowResults(false);
  }, []);

  const getAmountObj = () => {
    const Eligible: EligibleObj = {};
    for (let index = 0; index < loanEligibility?.length; index++) {
      const element = loanEligibility[index];
      if (element._id == 0) {
        Eligible.currentRole = element.answer;
      }
      if (element._id == 1) {
        Eligible.annualIncome = element.answer ? Number(element.answer) : 0;
      }
      if (element._id == 2) {
        Eligible.annualTurnover = element.answer ? Number(element.answer) : 0;
      }
      if (element._id == 3) {
        Eligible.bussinessNaturePer = 1;
        Eligible.bussinessNature = element.answer;
        if (element.answer === "manufacturer" || element.answer === "services") {
          Eligible.bussinessNaturePer = 0.08;
        }
        if (element.answer === "trader") {
          Eligible.bussinessNaturePer = 0.05;
        }
      }
      if (element._id == 4) {
        Eligible.emis = element.textAnswer ? Number(element.textAnswer) : 0;
      }
      if (element._id == 5) {
        Eligible.collateralProperty = element.answer;
      }
      if (element._id == 6) {
        Eligible.estimatedMarket = element.answer ? Number(element.answer) : 0;
      }
    }
    return Eligible;
  };

  function calculatePV(value: string) {
    const Eligible = getAmountObj();
    const tenure = loanEligibilityConstant[value].tenure;
    const monthlyRate = loanEligibilityConstant[value].rates / 12 / 100;
    const finalAnnualIncome = (Eligible.annualIncome ?? 0) || (Eligible.annualTurnover ?? 0) * (Number(Eligible.bussinessNaturePer) || 1);

    //ABB  == average bankBalance
    const bankingAbb = finalAnnualIncome / 24;
    const gstAbb = finalAnnualIncome / 12;
    const bankingEMI = bankingAbb - Eligible.emis;
    const gstEMI = gstAbb * 0.7 - Eligible.emis;

    const bankingPv = (bankingEMI * (1 - Math.pow(1 + monthlyRate, -tenure))) / monthlyRate;
    const gstPv = (gstEMI * (1 - Math.pow(1 + monthlyRate, -tenure))) / monthlyRate;

    let LTV = 0;
    if (Eligible?.collateralProperty === "residential") {
      LTV = Eligible?.estimatedMarket * 0.7;
    }
    if (Eligible?.collateralProperty === "commercial") {
      LTV = Eligible?.estimatedMarket * 0.8;
    }
    if (Eligible?.collateralProperty === "industrial") {
      LTV = Eligible?.estimatedMarket * 0.75;
    }

    const bankingArray = [loanEligibilityConstant[value].bankingPolicyLoan, bankingPv];
    if (LTV) bankingArray.push(LTV);
    const minimumBankingLoan = Math.min(...bankingArray);

    let gstArray = [];

    if (Eligible.currentRole === "largeBiz" || Eligible.currentRole === "conglomerate") {
      gstArray = [loanEligibilityConstant[value].gstPolicyLoan, gstPv];
      if (LTV) gstArray.push(LTV);
      const minimumGstLoan = Math.min(...gstArray);
      if (minimumBankingLoan > minimumGstLoan) return minimumBankingLoan;
      else return minimumGstLoan;
    }

    return minimumBankingLoan;
  }

  function calculateMLPV() {
    const Eligible = getAmountObj();
    const tenure = loanEligibilityConstant.ML.tenure;
    const monthlyRate = loanEligibilityConstant.ML.rates / 12 / 100;
    let finalAnnualIncome = (Eligible.annualIncome ?? 0) || (Eligible.annualTurnover ?? 0);

    if (Eligible?.bussinessNature === "manufacturer" || Eligible?.bussinessNature === "services") finalAnnualIncome = finalAnnualIncome * 0.15;
    if (Eligible?.bussinessNature === "trader") finalAnnualIncome = finalAnnualIncome * 1;

    //ABB  == average bankBalance
    const bankingAbb = finalAnnualIncome / 24;
    const bankingEMI = bankingAbb - Eligible.emis;

    //ABB  == average bankBalance
    // const gstAbb = (finalAnnualIncome - Eligible.emis * 12) / 12;
    const yearlyEmi = Eligible?.emis * 12;
    const maxDept = finalAnnualIncome / 1.25;

    const gstEMI = (maxDept - yearlyEmi) / 12;

    const bankingPv = (bankingEMI * (1 - Math.pow(1 + monthlyRate, -tenure))) / monthlyRate;
    const gstPv = (gstEMI * (1 - Math.pow(1 + monthlyRate, -tenure))) / monthlyRate;

    const bankingArray = [loanEligibilityConstant.ML.bankingPolicyLoan, bankingPv];
    const minimumBankingLoan = Math.min(...bankingArray);

    const gstArray = [loanEligibilityConstant.ML.gstPolicyLoan, gstPv];

    const minimumGstLoan = Math.min(...gstArray);
    if (minimumBankingLoan > minimumGstLoan) return minimumBankingLoan;
    return minimumGstLoan;
    // return gstPv;
  }

  const handleSubmit = () => {
    try {
      const blPv = calculatePV("BL");
      const lapPv = calculatePV("LAP");
      let mlPv = 0;
      if (loanEligibility[0].answer == "conglomerate" || loanEligibility[0]?.answer == "largeBiz") {
        mlPv = calculateMLPV();
      }
      setEligibleFor((prev) =>
        prev.map((item) => {
          if (item.value_code === "BL") {
            return {
              ...item,
              price: blPv.toString(),
              isVisible: loanEligibility[0]?.answer == "salaried" ? false : true,
            };
          }
          if (item.value_code === "LAP") {
            return {
              ...item,
              price: lapPv.toString(),
              isVisible: loanEligibility[5]?.answer == "none" ? false : true,
            };
          }
          if (item.value_code === "RSL") {
            const rslPv = blPv * 0.2;
            return {
              ...item,
              price: rslPv.toString(),
            };
          }
          if (item.value_code === "CSL") {
            const cslPv = blPv * 0.3;
            return {
              ...item,
              price: cslPv.toString(),
              isVisible: loanEligibility[0]?.answer == "salaried" ? false : true,
            };
          }
          if (item.value_code === "ML" && mlPv) {
            return {
              ...item,
              price: mlPv.toString(),
              isVisible: loanEligibility[0]?.answer == "salaried" ? false : true,
            };
          }
          return item;
        })
      );
      setShowResults(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, itemId: number) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const currentItem = loanEligibility.find((item) => item._id === itemId);

      if (currentItem?.isTextInput) {
        const val = (event.target as HTMLInputElement).value.replace(/[^0-9]/g, "");
        handleChange(itemId, {
          ...event,
          target: { value: val },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      }

      moveToNextQuestion();
    }
  };
  const handleTabClick = (value, amount) => {
    dispatch(setSelectedLoan({ ...selectedLoan, loanName: value, loanAmount: amount }));

    const section = document.getElementById("applyforloan");

    if (section) {
      const yOffset = -190;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const scrollRef = useRef(null);
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    setIsScrolledToBottom(isBottom);
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Check Your Loan Eligibility</h3>
          <p className="text-center w-full text-sm sm:text-base text-tertiary-500">
            Find out which loan solution is best suited for your needs by answering a few simple questions
          </p>
        </div>
      </div>

      <div
        className={`bg-white shadow-[0_2px_5px_rgba(1,1,1,0.1)] rounded-xl p-2 md:p-5 ${
          showResults ? "overflow-y-auto no-scrollbar grid lg:grid-cols-2 gap-5" : ""
        }`}
      >
        <div className={`w-full ${showResults ? "w-full" : ""}`}>
          {loanEligibility.map((item, index) => {
            return (
              item.isVisible && (
                <Accordion
                  key={item._id}
                  expanded={expanded === item._id}
                  onChange={() => {
                    handleExpand(item._id);
                  }}
                  sx={{ mb: 0, mt: 0, background: "none", boxShadow: "none" }}
                >
                  <AccordionSummary
                    sx={{
                      mb: 0,
                      "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                        transform: "rotate(-90deg)",
                      },
                    }}
                    expandIcon={<AccordionIcon className="text-black w-4" />}
                    aria-controls={`panel${item._id}-content`}
                    id={`panel${item._id}-header`}
                  >
                    <Typography className="!font-medium !text-lg">{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      {item?.options ? (
                        <div className="flex flex-col gap-2">
                          {item.options.map((option) => (
                            <FormControlLabel
                              key={option.value}
                              control={
                                <Checkbox
                                  checked={loanEligibility[item._id].answer === option.value}
                                  onChange={(e) => {
                                    const event = e as React.ChangeEvent<HTMLInputElement>;
                                    checkBoxHandle(item._id, event);
                                  }}
                                  name={option.value}
                                  disableRipple
                                  icon={
                                    <Box
                                      sx={{
                                        width: 22,
                                        height: 22,
                                        border: "1.5px solid #525252",
                                        borderRadius: "4px",
                                        backgroundColor: "#ffffff",
                                      }}
                                    />
                                  }
                                  checkedIcon={
                                    <Box
                                      sx={{
                                        width: 22,
                                        height: 22,
                                        border: "1.5px solid #1EB259",
                                        borderRadius: "4px",
                                        backgroundColor: "#E6F7EC",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 13L9 17L19 7" stroke="#1EB259" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </Box>
                                  }
                                />
                              }
                              label={
                                <Typography
                                  sx={{
                                    color: loanEligibility[0].answer === option.value ? "#1EB259" : "inherit",
                                  }}
                                >
                                  {option.label}
                                </Typography>
                              }
                            />
                          ))}
                          {item.answer == "yes" && item?.isTextInput && (
                            <input
                              placeholder="Enter amount (₹)"
                              type="text"
                              value={
                                item.textAnswer
                                  ? Number(item.textAnswer)?.toLocaleString("en-IN", {
                                      style: "currency",
                                      currency: "INR",
                                      maximumFractionDigits: 0,
                                    })
                                  : ""
                              }
                              onKeyPress={(e) => handleKeyPress(e, item._id)}
                              onChange={(e) =>
                                handleChange(item._id, {
                                  ...e,
                                  target: {
                                    value: e.target.value.replace(/[^0-9]/g, ""),
                                  },
                                } as React.ChangeEvent<HTMLInputElement>)
                              }
                              className="rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                            />
                          )}
                        </div>
                      ) : (
                        <div>
                          <input
                            placeholder="Enter amount (₹)"
                            type="text"
                            id={item._id.toString()}
                            value={
                              item.answer
                                ? Number(item.answer)?.toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    maximumFractionDigits: 0,
                                  })
                                : ""
                            }
                            onKeyPress={(e) => handleKeyPress(e, item._id)}
                            onChange={(e) =>
                              handleChange(item._id, {
                                ...e,
                                target: {
                                  value: e.target.value.replace(/[^0-9]/g, ""),
                                },
                              } as React.ChangeEvent<HTMLInputElement>)
                            }
                            className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none rounded-md bg-gray-100 w-full py-3 px-3 text-quinary-100 leading-tight focus:outline-none focus:shadow-outline text-sm"
                          />
                        </div>
                      )}
                    </FormGroup>
                  </AccordionDetails>
                  {(loanEligibility?.length - 1 === index && item.answer !== "") || item.answer == "none" ? (
                    <div className="flex justify-start">
                      <button
                        className="w-fit rounded-full relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
                        onClick={handleSubmit}
                      >
                        <span className="relative z-10">Check Now</span>
                      </button>
                    </div>
                  ) : null}
                </Accordion>
              )
            );
          })}
        </div>
        {showResults ? (
          !isEmpty(eligibleFor?.filter((v) => v?.isVisible && !isEmpty(v?.price) && Number(v?.price) >= 1)) ? (
            <div className="flex flex-col gap-3">
              <div className="bg-quaternary-200 rounded-lg p-5 pb-0 relative overflow-hidden mx-2">
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-xl">{`You're Eligible for...`}</h4>
                  <p className="text-tertiary-500 xs:text-base text-sm">
                    Get the financial support you need with a hassle-free loan. Apply now and unlock your benefits!
                  </p>
                  <div className="overflow-y-auto h-[380px] no-scrollbar " ref={scrollRef} onScroll={handleScroll}>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {eligibleFor
                        .filter((v) => v.isVisible && !isEmpty(v?.price) && Number(v?.price) >= 1)
                        .map((item) => (
                          <>
                            {!isEmpty(item?.price) && Number(item?.price) >= 0 ? (
                              <div key={item._id} className="flex group flex-col gap-4 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-xl p-4">
                                <p className="text-grey-200">{item?.content}</p>
                                <p className="text-xl font-bold text-primary-400">
                                  {item?.price && Number(item?.price) > 0
                                    ? Number(item?.price).toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        maximumFractionDigits: 0,
                                      })
                                    : "0"}
                                </p>
                                <div className="flex flex-col gap-2">
                                  <h4 className="text-xl font-bold">{item?.title}</h4>
                                  <div className="flex justify-end items-center border-t pt-3 rounded-b-xl">
                                    <button
                                      onClick={() => handleTabClick(item?.key, parseInt(item?.price))}
                                      className="rounded-full relative px-6 py-2 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
                                    >
                                      <span className="relative z-10">Apply Now</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </>
                        ))}
                    </div>
                  </div>
                </div>
                {eligibleFor?.length > 0 && !isScrolledToBottom && (
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-quaternary-200 via-quaternary-200/75 to-quaternary-200/40 pointer-events-none"></div>
                )}
              </div>
            </div>
          ) : (
            <NoData
              text={"Uh Oh! Seems like we need more information to determine your eligibility."}
              buttonData={{ onClick: () => dispatch(setShowRequestCallbackForm(true)), showButton: true, text: "Request a Call Back" }}
            />
          )
        ) : null}
      </div>
    </>
  );
};

export default memo(LoanEligibility);
