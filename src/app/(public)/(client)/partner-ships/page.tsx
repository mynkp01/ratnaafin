import { FinsallImage, GreyQuestImage, JodoImage, PartnershipsBanner, PartnershipsBannerMobile, TheEmiClubImage } from "@/assets";
import { ROUTES, URLS } from "@/utils/Constant";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const BreadCrum = dynamic(() => import("@/components/BreadCrum"));
const NewsLatter = dynamic(() => import("@/components/NewsLatter"));

const newsLatterData = {
  title: "Ready to unlock the potential of your dreams?",
  description: "Take the first step toward turning your vision into reality. Embrace new possibilities, explore opportunities, and make your dreams happen",
  button: "Request a Call Back",
};

function Page() {
  return (
    <div className="flex flex-col gap-12">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r sm:from-black/60 from-black/70 sm:via-transparent via-black/30 to-black/0"></div>
        <Image
          fetchPriority="high"
          loading="eager"
          priority={true}
          src={PartnershipsBanner}
          alt="Ratnaafin Partnership"
          className="sm:block hidden !object-cover object-right w-full"
        />
        <Image
          fetchPriority="high"
          loading="eager"
          priority={true}
          src={PartnershipsBannerMobile}
          alt="Ratnaafin Partnership"
          className="!object-cover sm:hidden !w-full "
        />
        <div className="absolute inset-0 2xl:px-8 px-4 container mx-auto flex 2xl:h-fit 2xl:top-1/4 items-end bottom-5 sm:items-center sm:justify-start">
          <div className="clip-customblog flex flex-col gap-3 sm:gap-6 md:gap-10 lg:gap-12 sm:bg-black/15 w-full sm:max-w-[430px] md:max-w-[480px] lg:max-w-[700px] sm:border sm:border-white/10 sm:backdrop-blur-[5px] rounded-l-2xl rounded-tr-[80px] md:rounded-tr-[110px] sm:p-4 md:p-6 lg:p-10">
            <div className="sm:block hidden">
              <BreadCrum />
            </div>
            <div className="flex flex-col gap-3 lg:gap-6">
              <h2 className="text-white text-[22px] md:text-3xl lg:text-4xl font-bold">Strategic Partnerships for Seamless Credit Access</h2>
              <h1 className="text-white">Powering Possibilities through embedded credit solutions</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <div className="flex flex-col gap-4 items-center">
          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-center text-quinary-100">Finance that fits your customer journey</h3>
          <p className="text-center xl:w-1/2 w-full mx-auto text-sm sm:text-base text-tertiary-500">Seamless credit solutions to power customer experience</p>
        </div>
        <div className="bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-xl p-6 lg:flex grid gap-5">
          <div className="items-center justify-center flex lg:w-[1100px]">
            <Image
              loading="lazy"
              src={GreyQuestImage}
              width={300}
              height={300}
              alt="Grey Quest Logo, Ratnaafin"
              className="object-cover max-w-full sm:max-w-[60%]"
            />
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-xl sm:text-2xl text-quinary-100">GrayQuest</h2>
              <p className="text-tertiary-500 text-sm sm:text-base">
                Grayquest Education Finance Private Limited (GrayQuest) is a fintech Company that partners with some of India’s leading educational institutions
                (primarily schools) to provide a comprehensive, state of the art fee collection platform for educational institutions. In our fee collection
                platform, Grayquest enables multiple payment modes for parents to pay their school or college/university fees such as Online Payment Gateway and
                EMI solutions.
              </p>
              <p className="text-tertiary-500 text-sm sm:text-base">
                Go to{" "}
                <Link className="text-quinary-100 underline break-all" target="_blank" href={URLS.GRAYQUEST}>
                  {URLS.GRAYQUEST}
                </Link>{" "}
                and fill in the application form to avail their financial services.
              </p>
              <h6 className="font-semibold text-quinary-100">Mandatory Information:</h6>
              <div className="flex flex-col gap-2">
                <h6 className="font-semibold text-quinary-100">Customer Care/Grievance Redressal Mechanism:</h6>
                <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                  <li>
                    RCPL: 
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={ROUTES.client.contactUs}>
                      {`${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.client.contactUs}`}
                    </Link>
                  </li>
                  <li>
                    Grayquest: 
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={`${URLS.GRAYQUEST}/grievance-officer`}>
                      {`${URLS.GRAYQUEST}/grievance-officer`}
                    </Link>
                  </li>
                  <li>
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={URLS.RBI_SACHET}>
                      Sachet Portal
                    </Link>
                  </li>
                  <li>
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={`${URLS.RBI_CMS}#eng`}>
                      CMS Portal
                    </Link>
                  </li>
                </ul>
              </div>
              <h6 className="font-semibold text-quinary-100">Privacy Policy:</h6>
              <div className="flex flex-col gap-2">
                <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                  <li>
                    RCPL: Go to 
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={ROUTES.client.privacyPolicy}>
                      {`${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.client.privacyPolicy}`}
                    </Link>
                  </li>
                  <li>
                    Grayquest: Go to
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={`${URLS.GRAYQUEST}/privacy-policy`}>
                      {`${URLS.GRAYQUEST}/privacy-policy`}
                    </Link>
                  </li>
                </ul>
              </div>
              <h6 className="font-semibold text-quinary-100">Nature of services availed:</h6>
              <div className="flex flex-col gap-2">
                <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                  <li>Customer Acquisition, Recovery and Customer Service.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-xl p-6 lg:flex grid gap-5">
          <div className="w-full order-2 lg:order-1">
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-xl sm:text-2xl text-quinary-100">The EMI Club</h2>
              <p className="text-tertiary-500 text-sm sm:text-base">
                Mash Technologies Private Limited also known as The EMI Club, is revolutionizing mobile phone ownership for Indian consumers. EMI Club is
                specialised in providing accessible low-ticket size loans specifically for mobile phone purchases. Loans are actively sourced and managed
                ensuring a smooth and efficient process of loan application. It is also engaged in providing crucial assistance in the collection of dues for
                the cases sourced and also assisting the partners in streamlining the entire financing cycle.
              </p>
              <h6 className="font-semibold text-quinary-100">Mandatory Information:</h6>
              <div className="flex flex-col gap-2">
                <h6 className="font-semibold text-quinary-100">Customer Care/Grievance Redressal Mechanism:</h6>
                <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                  <li>
                    RCPL: 
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={ROUTES.client.contactUs}>
                      {`${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.client.contactUs}`}
                    </Link>
                  </li>
                  <li>
                    The EMI Club: 
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={`${URLS.THEEMICLUB}/financial-partners/`}>
                      {`${URLS.THEEMICLUB}/financial-partners/`}
                    </Link>
                  </li>
                  <li>
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={URLS.RBI_SACHET}>
                      Sachet Portal
                    </Link>
                  </li>
                  <li>
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={`${URLS.RBI_CMS}#eng`}>
                      CMS Portal
                    </Link>
                  </li>
                </ul>
              </div>
              <h6 className="font-semibold text-quinary-100">Privacy Policy:</h6>
              <div className="flex flex-col gap-2">
                <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                  <li>
                    RCPL: Go to 
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={ROUTES.client.privacyPolicy}>
                      {`${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.client.privacyPolicy}`}
                    </Link>
                  </li>
                  <li>
                    The EMI Club: Go to 
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={`${URLS.THEEMICLUB}/privacy-policy/`}>
                      {`${URLS.THEEMICLUB}/privacy-policy/`}
                    </Link>
                  </li>
                </ul>
              </div>
              <h6 className="font-semibold text-quinary-100">Nature of services availed:</h6>
              <div className="flex flex-col gap-2">
                <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                  <li>Customer Acquisition, Recovery and Customer Service.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="items-center justify-center flex lg:w-[1100px] lg:order-2">
            <Image
              loading="lazy"
              src={TheEmiClubImage}
              width={300}
              height={300}
              alt="The EMI Club Logo, Ratnaafin"
              className="object-cover max-w-full sm:max-w-[60%]"
            />
          </div>
        </div>
        <div className="bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-xl p-6 lg:flex grid gap-5">
          <div className="items-center justify-center flex lg:w-[1100px]">
            <Image
              loading="lazy"
              src={FinsallImage}
              width={300}
              height={300}
              alt="FINSALL Logo, Ratnaafin"
              className="object-cover max-w-full sm:max-w-[60%]"
            />
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-xl sm:text-2xl text-quinary-100">FINSALL</h2>
              <p className="text-tertiary-500 text-sm sm:text-base">
                Finsall provides a seamless and digital technology platform for insurers and insurance intermediaries to finance any type of general insurance
                policy for retail customers. Finsall aims to improve affordability of insurance policies for customers who are unable to pay the entire
                insurance premium amount upfront, by providing them with an option for Insurance Premium Financing.
              </p>
              <p className="text-tertiary-500 text-sm sm:text-base">
                Website:{" "}
                <Link className="text-quinary-100 underline break-all" target="_blank" href={URLS.FINSALL}>
                  {URLS.FINSALL}
                </Link>
              </p>
              <h6 className="font-semibold text-quinary-100">Mandatory Information:</h6>
              <div className="flex flex-col gap-2">
                <h6 className="font-semibold text-quinary-100">Customer Care/Grievance Redressal Mechanism:</h6>
                <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                  <li>
                    RCPL:{" "}
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={ROUTES.client.contactUs}>
                      {`${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.client.contactUs}`}
                    </Link>
                  </li>
                  <li>
                    FINSALL:{" "}
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={`${URLS.FINSALL}/compliance.html`}>
                      {`${URLS.FINSALL}/compliance.html`}
                    </Link>
                  </li>
                  <li>
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={URLS.RBI_SACHET}>
                      Sachet Portal
                    </Link>
                  </li>
                  <li>
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={`${URLS.RBI_CMS}#eng`}>
                      CMS Portal
                    </Link>
                  </li>
                </ul>
              </div>
              <h6 className="font-semibold text-quinary-100">Privacy Policy:</h6>
              <div className="flex flex-col gap-2">
                <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                  <li>
                    RCPL: Go to{" "}
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={ROUTES.client.privacyPolicy}>
                      {`${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.client.privacyPolicy}`}
                    </Link>
                  </li>
                  <li>
                    FINSALL: Go to{" "}
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={`${URLS.FINSALL}/privacy-policy.html`}>
                      {`${URLS.FINSALL}/privacy-policy.html`}
                    </Link>
                  </li>
                </ul>
              </div>
              <h6 className="font-semibold text-quinary-100">Nature of services availed:</h6>
              <div className="flex flex-col gap-2">
                <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                  <li>Customer Acquisition, Collection, Recovery and Customer Service.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-xl p-6 lg:flex grid gap-5">
          <div className="w-full order-2 lg:order-1">
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-xl sm:text-2xl text-quinary-100">JODO</h2>
              <p className="text-tertiary-500 text-sm sm:text-base">
                JODO provides a seamless and digital technology platform for parents, students and educational institutes to transform education finance. JODO
                aims to improve affordability of education for parents by providing them school fee funding options.
              </p>
              <h6 className="font-semibold text-quinary-100">Mandatory Information:</h6>
              <div className="flex flex-col gap-2">
                <h6 className="font-semibold text-quinary-100">Customer Care/Grievance Redressal Mechanism:</h6>
                <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                  <li>
                    RCPL: 
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={ROUTES.client.contactUs}>
                      {`${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.client.contactUs}`}
                    </Link>
                  </li>
                  <li>
                    JODO: 
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={`${URLS.JODO}/grievance-redressal`}>
                      {`${URLS.JODO}/grievance-redressal`}
                    </Link>
                  </li>
                  <li>
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={URLS.RBI_SACHET}>
                      Sachet Portal
                    </Link>
                  </li>
                  <li>
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={`${URLS.RBI_CMS}#eng`}>
                      CMS Portal
                    </Link>
                  </li>
                </ul>
              </div>
              <h6 className="font-semibold text-quinary-100">Privacy Policy:</h6>
              <div className="flex flex-col gap-2">
                <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                  <li>
                    RCPL: Go to 
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={ROUTES.client.privacyPolicy}>
                      {`${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.client.privacyPolicy}`}
                    </Link>
                  </li>
                  <li>
                    JODO: Go to 
                    <Link className="text-quinary-100 underline break-all" target="_blank" href={`${URLS.JODO}/privacy-policy/`}>
                      {`${URLS.JODO}/privacy-policy/`}
                    </Link>
                  </li>
                </ul>
              </div>
              <h6 className="font-semibold text-quinary-100">Nature of services availed:</h6>
              <div className="flex flex-col gap-2">
                <ul className="list-disc pl-5 text-tertiary-500 text-sm sm:text-base">
                  <li>Customer Acquisition, Collection, Recovery and Customer Service.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="items-center justify-center flex lg:w-[1100px] lg:order-2">
            <Image loading="lazy" src={JodoImage} width={300} height={300} alt="JODO Logo, Ratnaafin" className="object-cover max-w-full sm:max-w-[60%]" />
          </div>
        </div>
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export default memo(Page);
