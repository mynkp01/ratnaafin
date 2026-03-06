"use client";
import { NoData as NoDataIcon } from "@/assets";
import { memo } from "react";

const NoData = ({ text = "Oops! No data found", isTextOnly = false, buttonData = null }) => {
  const handleClick = () => {
    if (buttonData?.onClick) buttonData?.onClick();
  };
  return (
    <div className="flex h-full w-full flex-col justify-center items-center gap-5 py-5">
      {!isTextOnly ? <NoDataIcon className="size-40" /> : null}
      <p className="heading-40 w-full text-center font-bold capitalize text-gray-400 md:w-1/2">{text}</p>
      {buttonData?.showButton ? (
        <button
          onClick={handleClick}
          className="w-fit rounded-full relative px-6 py-2 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
        >
          <span className="relative z-10">{buttonData?.text}</span>
        </button>
      ) : null}
    </div>
  );
};

export default memo(NoData);
