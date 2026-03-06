"use client";
import { Facebook, GreatPlaceToWork, Instagram, LinkedIn, Logo, PriceIcon, Youtube } from "@/assets";
import { selectShowFloatingForm, setShowFloatingForm } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { EMAILS, LoanSolutions, ROUTES, TELS, URLS } from "@/utils/Constant";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const FlotingButton = dynamic(() => import("@/components/FlotingButton"), {
  ssr: false,
});
const NachFormModal = dynamic(() => import("@/components/NachFormModal"), {
  ssr: false,
});
const GrievanceRedressalModal = dynamic(() => import("@/components/GrievanceRedressalModal"), {
  ssr: false,
});

const QuickLink = [
  { id: 0, link: "About Us", href: ROUTES.client.aboutus },
  { id: 1, link: "Careers", href: ROUTES.client.careers },
  { id: 2, link: "Disclosures", href: ROUTES.client.disclosures },
  { id: 3, link: "Terms & Conditions", href: ROUTES.client.termsAndConditions },
  { id: 4, link: "Privacy Policy", href: ROUTES.client.privacyPolicy },
  { id: 5, link: "Disclaimer", href: ROUTES.client.disclaimer },
  { id: 6, link: "Branch Locator", href: ROUTES.client.branchLocator },
  { id: 7, link: "Contact Us", href: ROUTES.client.contactUs },
  { id: 8, link: "RBI Sachet", href: URLS.RBI_SACHET, target: "_blank" },
  { id: 9, link: "RBI CMS", href: `${URLS.RBI_CMS}#eng`, target: "_blank" },
  { id: 10, link: "Partnerships", href: ROUTES.client.partnerships },
  { id: 11, link: "Requests related to NACH mandate" },
  { id: 12, link: "Grievance Support", modal: "grievance" },
];

const OtherService = [
  { id: 0, link: "Insurance Services", href: URLS.FINSURE },
  { id: 1, link: "Become our POSP", href: URLS.POSP },
];

const Social = [
  {
    id: 0,
    icon: <Facebook alt="Facebook" />,
    href: URLS.FACEBOOK,
  },
  {
    id: 1,
    icon: <Instagram alt="Instagram" />,
    href: URLS.INSTAGRAM,
  },
  { id: 2, icon: <Youtube alt="Youtube" />, href: URLS.YOUTUBE },
  {
    id: 3,
    icon: <LinkedIn alt="LinkedIn" />,
    href: URLS.LINKEDIN,
  },
];

function Footer() {
  const formRef = useRef(null);
  const dispatch = useAppDispatch();
  const showFloatingForm = useSelector(selectShowFloatingForm);
  const [isOpenNachModal, setIsOpenNachModal] = useState(false);
  const [isOpenGrievanceModal, setIsOpenGrievanceModal] = useState(false);

  const toggleForm = () => {
    dispatch(setShowFloatingForm(!showFloatingForm));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target) && !event.target.closest(".floating-button")) {
        dispatch(setShowFloatingForm(false));
      }
    };

    if (showFloatingForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFloatingForm]);

  return (
    <div className="bg-white pt-5 mt-16">
      <div className="container mx-auto 2xl:px-8 px-4">
        <div className="relative grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-5 gap-y-8 py-8">
          <div className="flex flex-col gap-6 md:col-auto col-span-2 border-b-2 pb-3 md:border-b-0 md:border-r-2 sm:pr-3">
            <div>
              <Link href={ROUTES.home}>
                <Logo className="w-52" />
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                Ratnaafin Capital Private Limited{" "}
                <span className=" text-gray-500 text-sm sm:text-base">
                  is an RBI registered Non-Banking Finance Company (NBFC) with the sole intention to provide customized financial solutions for growing needs of
                  MSMEs.
                </span>
              </p>
            </div>
            <div>
              <div className="flex gap-4">
                {Social.map((i) => (
                  <div key={i.id}>
                    <Link
                      href={i.href}
                      target="_blank"
                      className="border rounded-lg w-10 p-2 flex items-center hover:text-secondary-600 transition-all justify-center"
                    >
                      {i.icon}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" border-r-2 pr-3">
            <p className="font-semibold">SERVICES</p>
            <div className="flex flex-col gap-2 mt-4">
              {LoanSolutions.map((i) => (
                <Link key={i._id} href={i.href} className="text-gray-500 text-sm sm:text-base hover:text-secondary-600">
                  {i.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:border-r-2 pr-3">
            <p className="font-semibold">QUICK LINKS</p>
            <div className="flex flex-col gap-2 mt-4">
              {QuickLink.map((i) =>
                i?.href ? (
                  <Link key={i.id} href={i?.href} target={i?.target || "_self"} className="text-gray-500 text-sm sm:text-base hover:text-secondary-600">
                    {i.link}
                  </Link>
                ) : (
                  <button
                    key={i.id}
                    onClick={() => {
                      if (i.modal === "nach") setIsOpenNachModal(true);
                      if (i.modal === "grievance") setIsOpenGrievanceModal(true);
                    }}
                    className="text-gray-500 text-left text-sm sm:text-base hover:text-secondary-600 "
                  >
                    {i.link}
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 border-r-2 pr-3">
            <div>
              <p className="font-semibold">OTHER SERVICES</p>
              <div className="flex flex-col gap-2 mt-4">
                {OtherService.map((i) => (
                  <Link key={i.id} href={i.href} target="_blank" className="text-gray-500 text-sm sm:text-base hover:text-secondary-600">
                    {i.link}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold">AWARDS</p>
              <div className="flex gap-4 mt-4">
                <Image loading="lazy" src={GreatPlaceToWork} alt="Great Place to Work" width={60} height={50} />
                {/* <Image loading="lazy" src={Pb} alt="pb" width={60} height={50} /> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">REGISTERED OFFICE</p>
              <Link href={URLS.MAPS_BHIKAJI} target="_blank" className="text-gray-500 text-sm sm:text-base hover:text-secondary-600">
                402, Bhikaji Cama Bhawan Ring Road, Bhikaji Cama Place Near Hyatt Hotel, New Delhi - 110066, Delhi, India
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">CORPORATE OFFICE</p>
              <Link href={URLS.MAPS_THE_RIDGE} target="_blank" className="text-gray-500 text-sm sm:text-base hover:text-secondary-600">
                2nd and 3rd Floor, The Ridge, Opposite Novotel, Iscon Char Rasta, Ahmedabad, Gujarat - 380060
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href={`mailto:${EMAILS.INFO}`} className="text-gray-500 text-sm sm:text-base hover:text-secondary-600">
                {EMAILS.INFO}
              </Link>
              <Link href={`tel:${TELS.INFO_FOOTER}`} className="text-gray-500 text-sm sm:text-base hover:text-secondary-600">
                {TELS.INFO_FOOTER}
              </Link>
            </div>
          </div>
          <div className="md:border-none border bottom-[33%] xs:bottom-[33%] sm:bottom-[31%] absolute w-full" />
        </div>
        <div className="border-t-2 text-center py-5">
          <p className="text-gray-500">© 2025 Ratnaafin. All rights reserved.</p>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        {showFloatingForm && (
          <FlotingButton
            id="floating-button"
            ref={formRef}
            className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 2xl:w-1/4 max-h-[568px] overflow-auto fixed bottom-20 right-6 sm:right-14 z-30"
          />
        )}
        <div className="relative group">
          <div className="absolute bottom-16 right-3/4 bg-black text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40 whitespace-nowrap">
            Apply now!
          </div>
          <button
            onClick={toggleForm}
            style={{ animationPlayState: showFloatingForm ? "paused" : "running" }}
            className="floating-button absolute bottom-0 right-0 bg-gradient-to-l from-primary-400 to-secondary-600 rounded-full p-4 shadow-[0_2px_5px_rgba(0,0,0,0.1)] animate-bounce"
          >
            <PriceIcon />
          </button>
        </div>
      </div>
      {isOpenNachModal && <NachFormModal isOpen={isOpenNachModal} setIsOpen={setIsOpenNachModal} />}
      {isOpenGrievanceModal && <GrievanceRedressalModal isOpen={isOpenGrievanceModal} setIsOpen={setIsOpenGrievanceModal} />}
    </div>
  );
}

export default memo(Footer);
