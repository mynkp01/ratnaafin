import { BusinessGrowth, PossibalehaiLogo } from "@/assets";
import { API_V1, EMAILS, LOOKUP_VALUES, ROUTES } from "@/utils/Constant";
import { home_faq } from "@/utils/F&Q";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { memo } from "react";

const HomeClient = dynamic(() => import("./HomeClient"));
const BreadCrum = dynamic(() => import("@/components/BreadCrum"));
const HomePosiblehHaiSwiper = dynamic(() => import("@/components/HomePosiblehHaiSwiper"));
const TrustedBy = dynamic(() => import("@/components/home/TrustedBy"));
const HappyCustomer = dynamic(() => import("@/components/HappyCustomer"));
const ApplyForLoan = dynamic(() => import("@/components/ApplyForLoan"));
const Faq = dynamic(() => import("@/components/Faq"));
const NewsLatter = dynamic(() => import("@/components/NewsLatter"));
const LatestBlog = dynamic(() => import("@/components/LatestBlog"));

const newsLatterData = {
  title: "Ready to unlock the potential of your dreams?",
  description: "Take the first step toward turning your vision into reality. Embrace new possibilities, explore opportunities, and make your dreams happen",
  button: "Request a Call Back",
};

const applyLoanData = {
  title: "Take the First Step Towards Your Business Goals",
  description: "Get fast approvals, minimal documentation, and flexible repayment options. Apply today and take your business to the next level.",
  email: EMAILS.INFO,
  phone: "1800 309 8013",
};

const fetchYouTubeTestimonial = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_LOCAL}${API_V1}/youtube-lookup?value_code=${LOOKUP_VALUES.TESTIMONIAL}`);

    if (!response.ok) {
      throw new Error("Failed to fetching YouTube testimonial");
    }

    const data = await response.json();
    return data?.data?.length > 5 ? data?.data : [...data?.data, ...data?.data];
  } catch (error) {
    console.error("Error fetching YouTube testimonial:", error);
    return [];
  }
};

const fetchYouTubePromotional = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_LOCAL}${API_V1}/youtube-lookup?value_code=${LOOKUP_VALUES.PROMOTIONAL}`);
    if (!response.ok) {
      throw new Error("Failed to fetching YouTube promotional");
    }

    const data = await response.json();
    return data?.data?.length > 5 ? data?.data : [...data?.data, ...data?.data];
  } catch (error) {
    console.error("Error fetching YouTube promotional:", error);
    return [];
  }
};

async function fetchBlogs() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_LOCAL}${API_V1}/blog-lookup?limit=${8}&page=${1}`);

    if (!response.ok) {
      throw new Error("Failed to fetching latest blogs");
    }

    const data = await response.json();
    return data?.data?.docs || [];
  } catch (e) {
    console.error("Error while getting latest blogs:", e);
    return [];
  }
}

const promotionalVideo = await fetchYouTubePromotional();
const testimonialVideo = await fetchYouTubeTestimonial();
const blogs = await fetchBlogs();

function Home() {
  return (
    <>
      {/* <!-- Meta Pixel Code --> */}
      {/* Added on 03/03/2025 WP group @Zain */}
      <Script id="meta-pixel-bl" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1071914115141655');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1071914115141655&ev=PageView&noscript=1" />
      </noscript>
      {/* <!-- End Meta Pixel Code --> */}

      <div>
        <div className="hidden">
          <BreadCrum />
        </div>
        <HomeClient />
        <div className="bg-senary-100">
          <div className="container px-4 2xl:px-8 items-center mx-auto grid xl:grid-cols-2 gap-x-4 gap-y-10 py-12">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:w-5/6 font-bold lg:text-left text-center text-quinary-100">
                  Trusted by Business Owners Across India
                </h3>
                <p className="lg:text-left text-center w-full text-sm sm:text-base text-tertiary-500">
                  We understand that making the right financial choices is essential for your business growth. Here’s why you should choose us:
                </p>
              </div>
              <div className="sm:flex grid lg:justify-start justify-center sm:gap-0 gap-4 sm:divide-x sm:divide-[#5081C2] sm:space-x-2 2xl:space-x-4">
                <div className="flex flex-col sm:items-start items-center gap-2">
                  <p className="text-[#5081C2] font-extrabold text-4xl md:text-5xl xl:text-4xl 2xl:text-5xl">{`CRISIL "A+"`}</p>
                  <p className="text-tertiary-500">Rated Organisation</p>
                </div>
                <div className="flex flex-col sm:items-start items-center gap-2 sm:pl-2 2xl:pl-4">
                  <p className="text-[#5081C2] font-extrabold text-4xl md:text-5xl xl:text-4xl 2xl:text-5xl">25k+</p>
                  <p className="text-tertiary-500">Customers Served</p>
                </div>
                <div className="flex flex-col sm:items-start items-center gap-2 sm:pl-2 2xl:pl-4">
                  <p className="text-[#5081C2] font-extrabold text-4xl md:text-5xl xl:text-4xl 2xl:text-5xl">15k+</p>
                  <p className="text-tertiary-500">Man days of experience</p>
                </div>
              </div>
            </div>
            <TrustedBy />
          </div>
        </div>
        <div className="container mx-auto flex flex-col gap-12 py-12 px-4 2xl:px-8">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 items-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">
                Fuel your Business Growth in 3 Simple Steps
              </h3>
              <p className="text-center w-full text-sm sm:text-base text-tertiary-500">With Ratnaafin, applying for a loan is simple, fast, and secure</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="flex flex-col space-y-5 divide-y justify-center lg:order-1 order-2">
                <div className="flex gap-2 items-center">
                  <p className="font-bold border text-quinary-100 text-xl border-quinary-100 rounded-full w-12 h-12 p-5 flex justify-center items-center">01</p>
                  <div className="flex flex-col gap-2">
                    <p className="text-xl text-quinary-100 font-bold">Click Apply Now</p>
                    <p>Determine your eligibility and confirm loan amount</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center pt-5">
                  <p className="font-bold border text-quinary-100 text-xl border-quinary-100 rounded-full w-12 h-12 p-5 flex justify-center items-center">02</p>
                  <div className="flex flex-col gap-2">
                    <p className="text-xl text-quinary-100 font-bold">Upload Documents</p>
                    <p>Complete KYC verification</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center pt-5">
                  <p className="font-bold border text-quinary-100 text-xl border-quinary-100 rounded-full w-12 h-12 p-5 flex justify-center items-center">03</p>
                  <div className="flex flex-col gap-2">
                    <p className="text-xl text-quinary-100 font-bold">Get the funds</p>
                    <p>Quick approvals and funds get disbursed to your account</p>
                  </div>
                </div>
              </div>
              <Image
                loading="lazy"
                src={BusinessGrowth.src}
                width={1000}
                height={1000}
                alt="sme loan, msme loan details"
                className="rounded-xl !object-cover lg:order-2"
              />
            </div>
          </div>
          <div className="relative sm:bg-gradient-to-r bg-gradient-to-b from-secondary-600 to-primary-400 rounded-xl">
            <div className="grid lg:grid-cols-2 gap-5 px-5 sm:px-10">
              <div className="flex flex-col gap-6 py-5 sm:py-16 lg:pr-14">
                <div>
                  <Image
                    loading="lazy"
                    src={PossibalehaiLogo.src}
                    width={300}
                    height={200}
                    alt="PossibalehaiLogo"
                    className="md:w-[300px] md:h-[80px] w-[200px] h-[50px] !object-contain"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-white font-semibold text-3xl sm:text-4xl">Unlock your Financial Potential Today</h3>
                  <p className="text-white">
                    {`"Possible Hai!" isn’t just a belief—it’s what happens when financial access unlocks real business growth. Dive into stories, expert insights, and voices shaping the future of MSMEs.`}
                  </p>
                </div>
                <Link
                  href={ROUTES.client.possibleHai}
                  className="rounded-full w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
                >
                  <span className="relative z-10">Explore</span>
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <HomePosiblehHaiSwiper testimonialVideo={testimonialVideo} promotionalVideo={promotionalVideo} />
              </div>
            </div>
            <div className="sm:hidden absolute rounded-b-xl z-10 bottom-0 left-0 w-full h-20 bg-gradient-to-t from-primary-400 via-primary-400/75 to-primary-400/5 pointer-events-none"></div>
          </div>
        </div>
        <ApplyForLoan applyLoanData={applyLoanData} />
        <div className="container mx-auto py-12 2xl:px-8 px-4" id="testimonial">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 items-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Hear from Our Happy Customers</h3>
              <p className="text-center w-full text-sm sm:text-base text-tertiary-500">Aapki mehnat, humara saath, Business karega karamaat</p>
            </div>
            <HappyCustomer />
          </div>
        </div>
        <LatestBlog title="Finance Insights" description="Discover insights on everything lending & MSME on the Ratnaafin blog" blogs={blogs} />
        <div className="container mx-auto flex flex-col gap-12 pt-12 2xl:px-8 px-4">
          <Faq payload={home_faq} />
          <NewsLatter {...newsLatterData} />
        </div>
      </div>
    </>
  );
}

export const revalidate = 86400;
export default memo(Home);
