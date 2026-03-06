"use client";
import { CheckIcon } from "@/assets";
import { selectScreen } from "@/redux/slices/utilSlice";
import { Box, LinearProgress } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function LinearProgressWithLabel(props: { value: number }) {
  return (
    <Box sx={{ alignItems: "center", width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          valueBuffer={10}
          value={props.value}
          sx={{
            height: 2,
            borderRadius: 5,
            [`& .MuiLinearProgress-bar`]: {
              backgroundColor: "#1EB259",
            },
            backgroundColor: "#e0e0e0",
          }}
        />
      </Box>
    </Box>
  );
}

function DiscountingWork({ steps, heading, participantsData }) {
  const currentScreen = useSelector(selectScreen);
  const [progress, setProgress] = useState(0);
  const [animate, setAnimate] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!animate) return;

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [animate]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-quinary-100">{heading.key}</h3>
        <p className="text-center w-full text-sm sm:text-base text-tertiary-500">{heading.value}</p>
      </div>
      {currentScreen?.isLG ? (
        <div ref={progressRef} className="relative flex justify-between items-center mx-40">
          {steps.map((_, idx) => {
            const stepValue = (idx + 1) * (100 / steps?.length);
            const isFirst = idx === 0;
            const isCompleted = isFirst || stepValue <= progress;
            const isCurrent = !isCompleted && progress < stepValue && progress >= idx * (100 / steps?.length);

            return (
              <div
                key={idx}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm z-10
              ${isCompleted ? "bg-green-500 text-quaternary-200" : isCurrent ? "border bg-white text-black" : "border bg-quaternary-200 text-black"}`}
              >
                {isCompleted ? <CheckIcon className="text-white" fontSize="small" /> : `0${idx + 1}`}
              </div>
            );
          })}
          <div className="absolute top-1/2 left-3 w-[calc(100%-2rem)] z-0">
            <Box sx={{ width: "100%" }}>
              <LinearProgressWithLabel value={progress} />
            </Box>
          </div>
        </div>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((stepObj, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 shadow-[0_2px_5px_rgba(1,1,1,0.1)] flex flex-col gap-5">
            <div>{stepObj.icon}</div>
            <p className="text-green-600 font-medium">STEP {stepObj.step}</p>
            <p className="text-gray-800 font-semibold text-sm md:text-base">{stepObj.title}</p>
          </div>
        ))}
      </div>
      <div className="sm:flex grid gap-2 sm:gap-5">
        <p className="text-sm sm:text-base text-quinary-100 font-bold">Participants:</p>
        <div className="sm:flex sm:divide-x grid gap-2 sm:gap-0">
          {participantsData?.map(({ key, value }, index) => (
            <p key={`${key}-${index}`} className="text-sm sm:text-base text-primary-400 font-bold sm:px-4">
              {key}: <span className="text-black font-normal">{value}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(DiscountingWork);
