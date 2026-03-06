"use client";
import { selectSelectedLoan, setSelectedLoan } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import dynamic from "next/dynamic";
import { memo } from "react";
import { useSelector } from "react-redux";

const HeroSection = dynamic(() => import("@/components/home/HeroSection"), { ssr: true });
const LoanSolutionsComp = dynamic(() => import("@/components/home/LoanSolutionsComp"), { ssr: false });

const HomeClient = () => {
  const dispatch = useAppDispatch();
  const selectedLoan = useSelector(selectSelectedLoan);
  const handleTabClick = (value) => {
    dispatch(setSelectedLoan({ ...selectedLoan, loanName: value }));

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

  return (
    <>
      <HeroSection handleTabClick={handleTabClick} />
      <LoanSolutionsComp handleTabClick={handleTabClick} />
    </>
  );
};

export default memo(HomeClient);
