import { BranchlocatorBanner, BranchlocatorMobileBanner } from "@/assets";
import { API_V1 } from "@/utils/Constant";
import dynamic from "next/dynamic";
import Image from "next/image";
import { memo, Suspense } from "react";

const BranchLocatorClient = dynamic(() => import("./BranchLocatorClient"));
const BreadCrum = dynamic(() => import("@/components/BreadCrum"));
const NewsLatter = dynamic(() => import("@/components/NewsLatter"));

const newsLatterData = {
  title: "Ready to unlock the potential of your dreams?",
  description: "Take the first step toward turning your vision into reality. Embrace new possibilities, explore opportunities, and make your dreams happen",
  button: "Request a Call Back",
};

async function fetchBranches(stateId = "", search = "", cityId = "") {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_LOCAL}${API_V1}/branch-locator-lookup?stateId=${stateId}&search=${search}&cityId=${cityId}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetching branches");
    }

    const data = await response.json();
    return data?.data || [];
  } catch (err) {
    console.error("Error fetching branches:", err);
    return [];
  }
}

async function fetchStates() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_LOCAL}${API_V1}/branch-locator-state-lookup`);

    if (!response.ok) {
      throw new Error("Failed to fetching states");
    }

    const data = await response.json();
    return data?.data || [];
  } catch (err) {
    console.error("Error fetching states:", err);
    return [];
  }
}

async function Page() {
  const initialBranches = await fetchBranches();
  const states = await fetchStates();

  return (
    <div className="flex flex-col gap-12">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r sm:from-black/60 from-black/70 sm:via-transparent via-black/30 to-black/0"></div>
        <Image
          fetchPriority="high"
          loading="eager"
          priority={true}
          src={BranchlocatorBanner}
          alt="business loan without collateral"
          className="sm:block hidden !object-cover object-right w-full"
        />
        <Image
          fetchPriority="high"
          loading="eager"
          priority={true}
          src={BranchlocatorMobileBanner}
          alt="business loan without collateral"
          className="!object-cover sm:hidden !w-full"
        />
        <div className="absolute inset-0 2xl:px-8 px-4 container mx-auto flex 2xl:h-fit 2xl:top-1/4 items-end sm:bottom-0 bottom-5 sm:items-center sm:justify-start">
          <div className="clip-customblog flex flex-col gap-3 sm:gap-6 lg:gap-12 sm:bg-black/15 w-full sm:max-w-[460px] md:max-w-[500px] lg:max-w-[680px] xl:max-w-[760px] sm:border sm:border-white/10 sm:backdrop-blur-[5px] rounded-l-2xl rounded-tr-[80px] md:rounded-tr-[110px] xl:rounded-tr-[130px] sm:p-4 md:p-6 lg:p-10">
            <div className="sm:block hidden">
              <BreadCrum />
            </div>
            <div className="flex flex-col gap-1 sm:gap-3 lg:gap-5">
              <h2 className="text-white text-[22px] md:text-3xl lg:text-4xl font-bold lg:w-5/6">Stop Searching, Start Connecting</h2>
              <h1 className="text-white lg:w-3/4">Find you nearest Ratnaafin branch and begin your growth journey</h1>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <BranchLocatorClient initialBranches={initialBranches} initialStates={states} />
      </Suspense>

      <div className="container mx-auto 2xl:px-8 px-4">
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export const revalidate = 86400;
export default memo(Page);
