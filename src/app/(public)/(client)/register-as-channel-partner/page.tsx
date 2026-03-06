"use client";
import { apiHandler } from "@/api/apiHandler";
import {
  Access,
  Ashish,
  Atul,
  BranchNetwork,
  ChannelPartner,
  ChannelPartnerImage,
  ChannelPartners,
  Coma,
  CommissionIcon,
  CommissionPayout,
  Competitive,
  Comprehensive,
  Dedicated,
  InterestRate,
  Keyur,
  LoanProductsIcon,
  PlayIcon,
  ProductPortfolio,
  RegisterBanner,
  RegisterBannerMobile,
  Strong,
  Technological,
  Transparent,
  WideRange,
} from "@/assets";
import { selectScreen, setIsLoading, setShowYouTubeIFrame } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { URLS } from "@/utils/Constant";
import { register_as_channel_partner_faq } from "@/utils/F&Q";
import { showToast } from "@/utils/helper";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BreadCrum = dynamic(() => import("@/components/BreadCrum"), {
  ssr: false,
});
const NewsLatter = dynamic(() => import("@/components/NewsLatter"), {
  ssr: false,
});
const Faq = dynamic(() => import("@/components/Faq"), {
  ssr: false,
});
const HappyCustomer = dynamic(() => import("@/components/HappyCustomer"), {
  ssr: false,
});
const LatestBlog = dynamic(() => import("@/components/LatestBlog"), {
  ssr: false,
});

const newsLatterData = {
  title: "Ready to unlock the potential of your dreams?",
  description: "Take the first step toward turning your vision into reality. Embrace new possibilities, explore opportunities, and make your dreams happen",
  button: "Request a Call Back",
};

const Banifits = [
  {
    id: 0,
    icon: <WideRange />,
    title: "Wide Range of <br/>Financial Products",
    description:
      "Ratnaafin offers a diverse portfolio of financial products, enabling you to cater to the varied needs of your customers and expand your business offerings.",
  },
  {
    id: 1,
    icon: <Competitive />,
    title: "Competitive <br/>Commissions & Incentives",
    description:
      "As a Ratnaafin channel partner, you can enjoy attractive commissions and incentives, providing you with a lucrative income opportunity and motivating you to achieve more.",
  },
  {
    id: 2,
    icon: <Dedicated />,
    title: "Dedicated <br/>Relationship Manager",
    description:
      "You will be assigned a dedicated relationship manager who will provide personalized assistance, guidance, and support throughout your partnership with Ratnaafin.",
  },
  {
    id: 3,
    icon: <Strong />,
    title: "Strong Brand <br/>Reputation",
    description:
      "Ratnaafin has built a strong brand reputation in the financial industry, which can enhance your credibility as a channel partner and instill trust among your customers.",
  },
];
const BanifitsTwo = [
  {
    id: 0,
    icon: <Technological />,
    title: "Technological <br/>Advancement",
    description:
      "Ratnaafin leverages advanced technology and digital platforms, enabling you to streamline your operations, enhance efficiency, and deliver a seamless customer experience.",
  },
  {
    id: 1,
    icon: <Comprehensive />,
    title: "Comprehensive Training, <br/>Marketing & Sales support",
    description:
      "Ratnaafin provides comprehensive training programs and ongoing support to its channel partners, equipping you with the necessary knowledge and skills to excel in your role.",
  },
  {
    id: 2,
    icon: <Transparent />,
    title: "Transparent & <br/>Ethical Practices",
    description:
      "Ratnaafin adheres to transparent and ethical business practices, ensuring that you can confidently represent the company and build trust with your customers.",
  },
  {
    id: 3,
    icon: <Access />,
    title: "Access to a <br/>Wide Network",
    description:
      "Partnering with Ratnaafin provides you with access to its extensive network of clients, professionals, and industry experts, opening doors to collaboration and business growth opportunities",
  },
];

const WhyChoose = [
  {
    id: 0,
    icon: <ChannelPartners />,
    count: "5000+",
    title: "Channel Partners",
    subtitle: "Trusted NBFC with a large channel partner base.",
  },
  {
    id: 1,
    icon: <CommissionPayout />,
    count: "100%",
    title: "Commission Payout",
    subtitle: "A unique weekly payout scheme.",
  },
  {
    id: 2,
    icon: <ProductPortfolio />,
    count: "7+",
    title: "Product Portfolio",
    subtitle: "Versatile solutions for all businesses.",
  },
];

const registerBanner = [
  {
    _id: 0,
    title: "Be the Partner Everyone Wishes to be",
    description: "Become a Channel Partner: up to 40%<sup>*</sup> Approval Rate & up to 4%<sup>*</sup> Commission",
    button: "Register Now",
    box: [
      {
        icon: <InterestRate className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "up to 40%<sup>*</sup> <br /> Approval Rates",
      },
      {
        icon: <CommissionIcon className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "up to 4%<sup>*</sup> Commission",
      },
      {
        icon: <LoanProductsIcon className="xs:w-10 xs:h-10 w-5 h-5" />,
        text: "7+ Loan Products",
      },
    ],
  },
];

const channelPartnerTestimonialsData = [
  {
    id: 1,
    name: "Atul Verma",
    alt: "Join us Today at Ratnaafin",
    role: "Verma Capital, working with Ratnaafin since 2022",
    icon: <Coma />,
    feedback:
      "I've been working with Ratnaafin for a while now, and honestly, it’s been great. Their team is really helpful—whether it’s the credit manager, sales, or anyone else, they’re always there when you need them. The loan process is smooth, and I always get my payouts on time. I’ve had such a good experience that I’ve even recommended them to my friends!",
    image: Atul,
    imageClass: "object-top",
  },
  {
    id: 2,
    name: "Ashish Patel",
    alt: "Join us Today at Ratnaafin",
    role: "Andromeda Pvt. Ltd., working with Ratnaafin since 2024",
    icon: <Coma />,
    feedback:
      "I've been partnering with Ratnaafin for some time and my experience has been fantastic. Their team, whether it's credit or sales, is super supportive. Whenever I have a question, no matter the time of day, I always get a prompt response. What I really appreciate is their competitive payout structure—it's one of the best in the market. The file processing is smooth, and around 80-90% of the files I submit get approved easily. Even payouts are always on time, and I often get a call letting me know that the payment has been credited to my account. We're growing steadily alongside Ratnaafin, and I couldn’t be happier!",
    image: Ashish,
    imageClass: "object-top",
  },
  {
    id: 3,
    name: "Keyur Halani",
    alt: "Join us Today at Ratnaafin",
    role: "Hello Loans, working with Ratnaafin since 2023",
    icon: <Coma />,
    feedback:
      "Working with Ratnaafin has been a game-changer for our business. Their approachable and humble sales and credit teams make every interaction seamless. The weekly payout system is a huge advantage, and their competitive LTV on secured loans is unmatched in the market. I'm proud to partner with Ratnaafin and highly recommend them to my network!",
    image: Keyur,
    imageClass: "object-top",
  },
  {
    id: 4,
    name: "Atul Verma",
    alt: "Join us Today at Ratnaafin",
    role: "Verma Capital, working with Ratnaafin since 2022",
    icon: <Coma />,
    feedback:
      "I've been working with Ratnaafin for a while now, and honestly, it’s been great. Their team is really helpful—whether it’s the credit manager, sales, or anyone else, they’re always there when you need them. The loan process is smooth, and I always get my payouts on time. I’ve had such a good experience that I’ve even recommended them to my friends!",
    image: Atul,
    imageClass: "object-top",
  },
  {
    id: 5,
    name: "Ashish Patel",
    alt: "Join us Today at Ratnaafin",
    role: "Andromeda Pvt. Ltd., working with Ratnaafin since 2024",
    icon: <Coma />,
    feedback:
      "I've been partnering with Ratnaafin for some time and my experience has been fantastic. Their team, whether it's credit or sales, is super supportive. Whenever I have a question, no matter the time of day, I always get a prompt response. What I really appreciate is their competitive payout structure—it's one of the best in the market. The file processing is smooth, and around 80-90% of the files I submit get approved easily. Even payouts are always on time, and I often get a call letting me know that the payment has been credited to my account. We're growing steadily alongside Ratnaafin, and I couldn’t be happier!",
    image: Ashish,
    imageClass: "object-top",
  },
  {
    id: 6,
    name: "Keyur Halani",
    alt: "Join us Today at Ratnaafin",
    role: "Hello Loans, working with Ratnaafin since 2023",
    icon: <Coma />,
    feedback:
      "Working with Ratnaafin has been a game-changer for our business. Their approachable and humble sales and credit teams make every interaction seamless. The weekly payout system is a huge advantage, and their competitive LTV on secured loans is unmatched in the market. I'm proud to partner with Ratnaafin and highly recommend them to my network!",
    image: Keyur,
    imageClass: "object-top",
  },
];

const BanifitsComp = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 xl:gap-12 divide-y items-center justify-center w-fit mx-auto divide-green-400">
      {data.map((item, i) => (
        <div key={i} className={`flex flex-col items-start justify-center gap-5 w-full pt-4 xl:pt-8`}>
          <div className="flex gap-4 items-center">
            <div className="rounded-md p-3">{item.icon}</div>
            <p className="font-medium text-lg xs:text-xl text-wrap" dangerouslySetInnerHTML={{ __html: item.title }} />
          </div>
          {/* <p className="text-tertiary-500">{item.description}</p> */}
        </div>
      ))}
    </div>
  );
};

function Page() {
  const dispatch = useAppDispatch();
  const currentScreen = useSelector(selectScreen);

  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchYouTube = async () => {
      try {
        dispatch(setIsLoading(true));
        const { data, status } = await apiHandler.youtube.lookup(`search=Channel Partner Video`);
        if (status === 200 || status === 201) {
          setVideo(data?.data);
        } else {
          showToast("error", data?.message);
        }
      } catch (error) {
        showToast("error", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchYouTube();
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r sm:from-black/60 from-black/70 sm:via-transparent via-black/30 to-black/0"></div>
        {currentScreen?.isXS ? (
          <Image
            fetchPriority="high"
            loading="eager"
            priority={true}
            src={RegisterBannerMobile}
            alt="Possible hai ratnaafin"
            className="!object-cover !w-full"
          />
        ) : (
          <Image
            fetchPriority="high"
            loading="eager"
            priority={true}
            src={RegisterBanner}
            alt="Possible hai ratnaafin"
            className="sm:!h-[550px] lg:!h-[650px] xl:!h-full !object-cover object-right w-full"
          />
        )}
        <div className="absolute inset-0 2xl:px-8 px-4 container mx-auto flex sm:bottom-0 bottom-5 items-center sm:justify-start">
          <div className="clip-customsxl flex flex-col gap-3 md:gap-6 lg:gap-10 sm:bg-black/5 w-full sm:h-fit h-full sm:max-w-[680px] lg:max-w-[800px] sm:border sm:border-white/10 sm:backdrop-blur-[5px] rounded-l-2xl rounded-tr-[150px] sm:p-4 md:p-6 lg:p-10">
            <div className="sm:block hidden">
              <BreadCrum />
            </div>
            {Array.isArray(registerBanner) &&
              registerBanner.map((item) => (
                <div key={item._id} className="h-full flex sm:items-center items-end justify-center sm:justify-start">
                  <div className="flex flex-col gap-6 sm:gap-10">
                    <div className="flex flex-col gap-3 sm:gap-8">
                      <div className="flex flex-col gap-2 xs:gap-3">
                        <h2 className="text-white text-[22px] sm:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: item.title }}></h2>
                        <h1 className="text-white text-base" dangerouslySetInnerHTML={{ __html: item.description }} />
                      </div>
                      <div className="flex gap-2 sm:gap-9">
                        {Array.isArray(item.box) &&
                          item.box.map((box, index) => (
                            <div
                              key={index}
                              className={`flex flex-col gap-2 text-white pr-2 sm:pr-8 ${index !== item.box?.length - 1 ? "border-r border-gray-200/20" : ""}`}
                            >
                              <div className="text-2xl">{box.icon}</div>
                              <p className="xs:text-sm text-xs" dangerouslySetInnerHTML={{ __html: box.text }}></p>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="sm:min-h-full h-8">
                      <Link
                        href={URLS.PARTNER_PORTAL}
                        target="_blank"
                        className="bg-secondary-600 hover:bg-white md:text-base text-xs text-white hover:text-quinary-100 transition-all px-4 py-2 rounded-full"
                      >
                        {item.button}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto 2xl:px-8 px-4">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Benefits of Becoming a Channel Partner</h3>
            <p className="text-center xl:w-1/2 w-full text-sm sm:text-base text-tertiary-500">
              Unlock new revenue streams and expand your market reach by partnering with us to deliver top-tier solutions. Gain exclusive access to resources,
              support, and incentives that drive business growth.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-2 lg:gap-4 bg-white shadow-[0_2px_5px_rgba(1,1,1,0.1)] rounded-xl p-5">
            {currentScreen?.isLG ? (
              <>
                <BanifitsComp data={Banifits} />

                <div className="flex flex-col gap-4">
                  <div>
                    {video?.[0]?.doc_path && (
                      <>
                        <button onClick={() => dispatch(setShowYouTubeIFrame({ show: true, video: video?.[0] }))} className="relative !w-full !rounded-2xl">
                          <Image loading="lazy" src={ChannelPartner} alt="" className="!h-full !w-full !object-cover !rounded-2xl" />
                          <div className="absolute left-1/2 top-1/2 z-30 flex !rounded-full -translate-x-1/2 -translate-y-1/2 items-center text-white">
                            <PlayIcon className="size-6 min-h-6 min-w-6 " />
                          </div>
                        </button>
                      </>
                    )}
                  </div>
                  {/* <div className="flex flex-col gap-5 pt-4 xl:border-none xl:pb-0 border-y xl:mt-0 mt-4 pb-8">
                <div className="flex gap-4 items-center">
                  <div className="bg-quaternary-200 rounded-md p-3">
                    <Strong />
                  </div>
                  <p className="font-medium text-lg xs:text-xl">Strong Brand Reputation</p>
                </div>
                <p className="text-tertiary-500">
                  Ratnaafin has built a strong brand reputation in the financial industry, which can enhance your credibility as a channel partner and instill
                  trust among your customers.
                </p>
              </div> */}
                </div>

                <BanifitsComp data={BanifitsTwo} />
              </>
            ) : (
              <>
                <div className="!w-full flex justify-center items-center">
                  {video?.[0]?.doc_path && (
                    <>
                      <button onClick={() => dispatch(setShowYouTubeIFrame({ show: true, video: video?.[0] }))} className="relative !w-full rounded-2xl">
                        <Image loading="lazy" src={ChannelPartner} alt="Join us as channel partner" className="!h-full !w-full !object-cover rounded-2xl" />
                        <div className="absolute left-1/2 top-1/2 z-30 flex !rounded-full -translate-x-1/2 -translate-y-1/2 items-center text-white">
                          <PlayIcon className="size-6 min-h-6 min-w-6 " />
                        </div>
                      </button>
                    </>
                  )}
                </div>
                <div className="!w-full flex justify-center items-center">
                  <BanifitsComp data={[...Banifits, ...BanifitsTwo]} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-secondary-600 to-primary-400 py-12">
        <div className="container mx-auto 2xl:px-8 px-4">
          <div className="grid lg:grid-cols-2 gap-x-4 gap-y-10">
            <div className="flex flex-col gap-3 justify-center">
              <p className="text-white font-semibold text-3xl sm:text-4xl">Why Choose us?</p>
              <p className="text-white">
                At Ratnaafin, we combine trust, transparency, and tailored financial solutions to empower your growth. With quick approvals, customer-first
                service, and competitive rates - we’re here to make finance simpler for you.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {WhyChoose.map((i, item) => (
                <div key={item} className="bg-white shadow-[0_2px_5px_rgba(1,1,1,0.1)] rounded-xl p-4 flex sm:flex-col gap-4">
                  <p>{i.icon}</p>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-xl">
                      <span className="text-primary-400">{i.count} </span>
                      {i.title}
                    </p>
                    <p className="text-tertiary-500">{i.subtitle}</p>
                  </div>
                </div>
              ))}
              <div className="bg-white shadow-[0_2px_5px_rgba(1,1,1,0.1)] rounded-xl p-4 flex sm:flex-col gap-4">
                <p>
                  <BranchNetwork />
                </p>
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-xl">
                    Serving more than <span className="text-primary-400">100</span> locations
                  </p>
                  <p className="text-tertiary-500">Wide Branch Network across the region.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-3xl sm:text-4xl font-bold lg:text-left text-center text-quinary-100">Become Our Channel Partner In 4 Simple Steps</h3>
            <p className="text-center md:w-1/2 w-full text-base text-tertiary-500">
              Joining us is easy - just follow four straightforward steps to start your partnership journey. Streamline your onboarding and start accessing
              benefits in no time.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-5 divide-y justify-center lg:order-1 order-2">
              <div className="flex gap-2">
                <p className="font-bold border text-quinary-100 text-xl border-quinary-100 rounded-full w-12 h-12 p-5 flex justify-center items-center">01</p>
                <div className="flex flex-col gap-2">
                  <p className="text-xl text-quinary-100 font-bold">Verify Mobile Number</p>
                  <p>{`Click on "Register as Channel Partner" button from Header menu and verify your mobile number using OTP`}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-5">
                <p className="font-bold border text-quinary-100 text-xl border-quinary-100 rounded-full w-12 h-12 p-5 flex justify-center items-center">02</p>
                <div className="flex flex-col gap-2">
                  <p className="text-xl text-quinary-100 font-bold">Fill up the Form</p>
                  <p>Submit your personal and business details and upload KYC Documents, Education Certificates, Cancelled Cheque to process registration</p>
                </div>
              </div>
              <div className="flex gap-2 pt-5">
                <p className="font-bold border text-quinary-100 text-xl border-quinary-100 rounded-full w-12 h-12 p-5 flex justify-center items-center">03</p>
                <div className="flex flex-col gap-2">
                  <p className="text-xl text-quinary-100 font-bold">E-Sign Agreement</p>
                  <p>
                    Prepare agreement terms, review together, e-sign using secure platform, verify identity, store copies, and commence successful partnership
                    online.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 pt-5">
                <p className="font-bold border text-quinary-100 text-xl border-quinary-100 rounded-full w-12 h-12 p-5 flex justify-center items-center">04</p>
                <div className="flex flex-col gap-2">
                  <p className="text-xl text-quinary-100 font-bold">Generate Channel Partner Code</p>
                  <p>After e-signing the agreement, you code will open which grants access to exclusive benefits of become Ratnaafin Channel Partner.</p>
                </div>
              </div>
            </div>
            <Image
              loading="lazy"
              src={ChannelPartnerImage.src}
              width={1000}
              height={1000}
              alt="ratnaafin channel partner "
              className="rounded-xl !w-full !h-full !object-cover lg:order-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-10" id="testimonial">
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-3xl text-center sm:text-4xl font-bold text-quinary-100">Voices of Victory: Channel Partner’s Testimonial Hub</h3>
            <p className="text-center md:w-1/2 w-full text-base text-tertiary-500">
              Witness the synergy of success in our channel partner testimonials, highlighting the strength and reliability of Ratnaafin.
            </p>
          </div>
          <HappyCustomer testimonials={channelPartnerTestimonialsData} />
        </div>
      </div>
      <LatestBlog title="Finance Insights" description="Discover insights on everything lending & MSME on the Ratnaafin blog" />
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <Faq payload={register_as_channel_partner_faq} />
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export default memo(Page);
