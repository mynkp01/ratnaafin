"use client";
import {
  AboutBanner,
  AboutBannerMobile,
  AboutImage,
  BrandValues,
  DcJain,
  Dhaval,
  LinkedinIcon,
  Malav,
  Mission,
  Nilesh,
  OmPrakashMishra,
  Vision,
} from "@/assets";
import { selectScreen } from "@/redux/slices/utilSlice";
import { URLS } from "@/utils/Constant";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { useSelector } from "react-redux";

const BreadCrum = dynamic(() => import("@/components/BreadCrum"), {
  ssr: false,
});
const NewsLatter = dynamic(() => import("@/components/NewsLatter"), {
  ssr: false,
});

const newsLatterData = {
  title: "Ready to unlock the potential of your dreams?",
  description: "Take the first step toward turning your vision into reality. Embrace new possibilities, explore opportunities, and make your dreams happen",
  button: "Request a Call Back",
};

const LeadershipTeam = [
  {
    id: 0,
    image: Nilesh.src,
    alt: "Nilesh Sanghvi Chairman and Managing Director",
    name: "Nilesh Sanghvi",
    designation: "Chairman and Managing Director",
    linkedin: URLS.LINKEDIN_NILESH,
  },
  {
    id: 1,
    image: Malav.src,
    name: "Malav Desai",
    alt: "Malav Desai Joint Managing Director and Chief Executive Officer",
    designation: "Joint Managing Director and Chief Executive Officer",
    linkedin: URLS.LINKEDIN_MALAV,
  },
  // {
  //   id: 2,
  //   image: Nishad.src,
  //   alt: "Nishad Shah Director",
  //   name: "Nishad Shah",
  //   designation: "Director",
  //   linkedin: URLS.LINKEDIN_NISHAD,
  // },
  {
    id: 2,
    image: Dhaval.src,
    alt: "Dhaval Patel Director",
    name: "Dhaval Patel",
    designation: "Director",
    linkedin: URLS.LINKEDIN_DHAVAL,
  },
];
const IndependentDirectors = [
  {
    id: 0,
    image: OmPrakashMishra.src,
    alt: "Om Prakash Mishra",
    name: "Om Prakash Mishra",
    designation: "Independent Director",
    linkedin: URLS.LINKEDIN_OM_PRAKASH_MISHRA,
  },
  {
    id: 1,
    image: DcJain.src,
    alt: "D.C. Jain",
    name: "D.C. Jain",
    designation: "Independent Director",
    linkedin: URLS.LINKEDIN_DC_JAIN,
  },
];

const Focus = [
  {
    id: 0,
    image: Mission,
    title: "Mission",
    description: "We are on a mission to drive growth by unlocking the potential of businesses of all sizes with tailored financial solutions.",
  },
  {
    id: 1,
    image: Vision,
    title: "Vision",
    description:
      "To become India's premier financial institution for Micro, Small, and Medium Enterprises (MSMEs) and the preferred choice for every business owner in need of financial solutions.",
  },
  {
    id: 2,
    image: BrandValues,
    title: "Brand Values",
    description: ["-Empowering Partnership (Humility & Responsibility)", "-Agile Innovation (Adaptability & Resilience)"],
  },
];

function TeamCard({ item }: any) {
  return (
    <div className="flex flex-col gap-3 h-auto">
      <div className="flex justify-center">
        <Image loading="lazy" src={item.image} alt={item?.alt} width={300} height={300} className="!object-cover" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="sm:text-xl font-medium text-quinary-100">{item.name}</p>
        <p className="text-quinary-100 text-center">{item.designation}</p>

        {item?.linkedin ? (
          <Link href={item.linkedin} target="_blank">
            <LinkedinIcon className="size-5" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function AboutUs() {
  const currentScreen = useSelector(selectScreen);

  return (
    <div className="flex flex-col gap-12">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r sm:from-black/60 from-black/70 sm:via-transparent via-black/30 to-black/0"></div>
        {currentScreen?.isXS ? (
          <Image
            fetchPriority="high"
            loading="eager"
            priority={true}
            src={AboutBannerMobile}
            alt="non-banking finance (NBFC)"
            className="!object-cover !w-full "
          />
        ) : (
          <Image
            fetchPriority="high"
            loading="eager"
            priority={true}
            src={AboutBanner}
            alt="non-banking finance (NBFC)"
            className=" !object-cover object-right w-full"
          />
        )}
        <div className="absolute inset-0 2xl:px-8 container px-4 mx-auto flex 2xl:h-fit 2xl:top-1/4 items-end bottom-5 sm:items-center sm:justify-start">
          <div className="clip-customblog flex flex-col gap-3 sm:gap-6 md:gap-10 lg:gap-12 sm:bg-black/15 w-full sm:max-w-[430px] md:max-w-[480px] lg:max-w-[700px] sm:border sm:border-white/10 sm:backdrop-blur-[5px] rounded-l-2xl rounded-tr-[80px] md:rounded-tr-[110px] sm:p-4 md:p-6 lg:p-10">
            <div className="sm:block hidden">
              <BreadCrum />
            </div>
            <div className="flex flex-col gap-3 lg:gap-6">
              <h2 className="text-white text-[22px] md:text-3xl lg:text-4xl font-bold">We Are In The Business For Business Owners </h2>
              <h1 className="text-white">For us, every business is equal, whether small or large.</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <div className="bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-xl p-6 grid lg:grid-cols-2 gap-5">
          <div>
            <Image loading="lazy" src={AboutImage} width={800} height={500} alt="About Us Ratnaafin" className="!object-cover rounded-xl" />
          </div>
          <div className="flex flex-col gap-4 overflow-auto h-[470px]">
            <p className="text-tertiary-500 text-base">
              At Ratnaafin, we believe in the limitless potential of every business, no matter its size. We value the vision of the entrepreneurs behind these
              ventures and empower them with the financial resources they need to succeed.
            </p>
            <p className="text-tertiary-500 text-base">
              {/* Ratnaafin is the fastest-growing non-banking finance (NBFC) in India that provides all kinds of financial solutions under one roof. It is the
              financial services business of the Ratnamani Sanghvi family group. The Ratnamani group caters to a diverse portfolio including engineering,
              pharmaceutical, real estate, finance and others. It is thus packed with a robust, varied and all encompassing experience and knowledge and nuances
              of different industries giving an edge to its financial services. */}
              Ratnaafin is the fastest-growing non-banking finance (NBFC) in India that provides all kinds of financial solutions under one roof. It is the
              financial services business of the Ratnamani Sanghvi family group. The group caters to a diverse portfolio including engineering, pharmaceutical,
              real estate, finance and others.
            </p>
            <h6 className="font-bold text-quinary-100 text-base">We are in the business for business owners.</h6>
            {/* <p className="text-tertiary-500 text-base">
              Ratnaafin Capital stands as a notable Business Unit within the Ratnamani Sanghvi Family Group’s portfolio. This group, led by the Sanghvi Family,
              is involved in six diverse lines of business. Among these, the esteemed flagship, Ratnamani Metals and Tubes Limited, shines as a prominent player
              in India’s Stainless Steel Pipes & Tubes sector. It also commands a strong presence in Titanium, Carbon Steel, and Nickel alloy pipes and tubes.
              The company boasts a global reputation, serving over 500 customers worldwide with unwavering trust and recognition. Ratnaafin Capital stands as a
              notable Business Unit within the Ratnamani Sanghvi Family Group’s portfolio...
            </p> */}
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          {Focus.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-6 xs:flex grid gap-4 items-center">
              <Image loading="lazy" src={item.image} width={80} height={80} alt="icon" className="w-fit h-fit !object-cover" />
              <div>
                <p className="font-semibold text-lg text-quinary-100">{item.title}</p>
                {Array.isArray(item.description) ? (
                  <p className="text-sm text-tertiary-500">
                    {item.description.map((line, idx) => (
                      <span key={idx}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                ) : (
                  <p className="text-sm text-tertiary-500">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl px-4 py-8 sm:p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-quinary-100 text-center">Leadership Team</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {LeadershipTeam?.map((item, i) => (
              <TeamCard key={i} item={item} />
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl px-4 py-8 sm:p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-quinary-100 text-center">Independent Directors</h3>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-10">
              {IndependentDirectors?.map((item, i) => (
                <TeamCard key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export default memo(AboutUs);
