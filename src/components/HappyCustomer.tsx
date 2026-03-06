"use client";
import { AccordionIcon, Coma, DharamAgarwal, NehaJain, RomiPatel, RonakPatel, Shakti, SumitRastogi, TejasParikh, VishrutPathak } from "@/assets";
import { selectScreen } from "@/redux/slices/utilSlice";
import Image from "next/image";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css/effect-coverflow";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const customerTestimonialsData = [
  {
    id: 1,
    name: "Tejas Parikh",
    role: "Ambika Industries",
    icon: <Coma />,
    feedback:
      "Our manufacturing business thrives on efficiency. Ratnaafin’s Business Loan helped us invest in production upgrades, leading to a 20% increase in turnover. Their quick and reliable loan disbursal within 48 hours gave us the edge to stay ahead in both local and export markets. If you need a financial partner who truly understands business growth, Ratnaafin is the way to go.",
    image: TejasParikh,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
  {
    id: 2,
    name: "Ronak Patel",
    role: "Sypram Rubber Profile Pvt Ltd",
    icon: <Coma />,
    feedback:
      "My journey in the rubber industry began in 2009, and in 2022, I took a big step toward setting up my dream project. Ratnaafin’s Business Loan provided the capital I needed to set up and start operations smoothly.Their professionalism made the entire experience stress-free.",
    image: RonakPatel,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
  {
    id: 3,
    name: "Shakti Bharihok",
    role: "EverGreen Media",
    icon: <Coma />,
    feedback:
      "Expanding my printing and signage business required an investment of ₹25-30 lakh, and Ratnaafin made the entire financing process seamless. Their team guided us step-by-step, with reasonable charges, competitive interest rates, and quick processing. The support was professional, efficient, and hassle-free. We’re glad to have chosen Ratnaafin and look forward to working with them again.",
    image: Shakti,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
  {
    id: 4,
    name: "Vishrut Pathak",
    role: "Pi Square Investments",
    icon: <Coma />,
    feedback:
      "I’ve always been conservative when it comes to taking on debt, and this was actually my first time borrowing. When an opportunity came up to acquire a business, I needed quick liquidity, and that’s when I approached Ratnaafin. The team was responsive, efficient, and made the process incredibly smooth. Within a couple of days, the funds were in my account and I was able to close the deal. The experience was excellent, and everything played out just the way I had hoped.",
    image: VishrutPathak,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
  {
    id: 5,
    name: "Neha Jain",
    role: "Mivik Fabrics & Antiques",
    icon: <Coma />,
    feedback:
      "We started our journey from a small rented space, and with the support of Ratnaafin, we were able to move into our own workshop and studio. Their timely funding helped us scale our business—whether it was investing in raw materials, adding manpower, or building stock for festive orders. The process was smooth, and the team was extremely cooperative. In a business like ours, where every season brings a surge in demand and custom requirements, having a reliable financial partner is invaluable. Ratnaafin has been that partner, helping us grow with every new milestone.",
    image: NehaJain,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
  {
    id: 6,
    name: "Romi Patel",
    role: "Creative Fiber Products Pvt Ltd",
    icon: <Coma />,
    feedback:
      "We’ve been in business since 2009, manufacturing non-woven fabric from glass and carbon fiber. After COVID, we approached Ratnaafin in 2020 to increase our bank limits and working capital, and the experience was smooth and transparent right from the start. Since then, we’ve worked with them across multiple needs—term loans, solar financing, and even insurance. As a small-scale industry taking on a 12x capacity expansion, getting the right funding was challenging, but with Ratnaafin, it became possible. They’ve truly been a one-stop solution for all our financial requirements, and my experience with their team has been nothing short of excellent.",
    image: RomiPatel,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
  {
    id: 7,
    name: "Sumit Rastogi",
    role: "Konart Steel Pvt Ltd",
    icon: <Coma />,
    feedback:
      "We started our journey in 2019, and just as we were finding our footing, COVID and a sharp rise in steel prices hit the industry hard. That’s when Ratnaafin stepped in—not just as a lender, but as a true partner who understood our business and helped us access funding without collateral. From moving out of a rented setup to building our own plant, they’ve supported us at every step. Each year brought new financial challenges, and Ratnaafin consistently guided us with the right solutions. Our growth story over the past five years has been backed by their trust and belief in us.",
    image: SumitRastogi,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
  {
    id: 8,
    name: "Dharam Agarwal",
    role: "Ashwika Group",
    icon: <Coma />,
    feedback:
      "I’ve been working with Ratnaafin for the past seven years, and the experience has been consistently excellent. Their team is professional, committed, and always delivers on their word. Timely funding from Ratnaafin helped us acquire land, carry out construction, and ensure on-time delivery of our warehousing and commercial projects. We’ve developed over 1.5 million square feet of warehousing for major clients like Flipkart, Delhivery, Godrej, and more. For us, Ratnaafin has truly made ambitious projects possible.",
    image: DharamAgarwal,
    alt: "Join us Today at Ratnaafin",
    imageClass: "object-top",
  },
];

function HappyCustomer({ testimonials = customerTestimonialsData }) {
  const currentScreen = useSelector(selectScreen);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);

  return (
    <div className="overflow-hidden">
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        centeredSlides={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1450: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        effect="coverflow"
        loop
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        speed={500}
        grabCursor={true}
        modules={[Autoplay, EffectCoverflow]}
        className="mySwiper !h-full relative"
        onSlideChangeTransitionStart={(swiper) => setActiveIndex(swiper.realIndex)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => {
          setActiveIndex(swiper.realIndex);
          setSwiper(swiper);
        }}
      >
        {testimonials.map((item, i) => (
          <SwiperSlide
            key={item.id}
            className={`py-4 ${
              i === activeIndex
                ? "!h-auto !flex !items-center md:!w-[600px] xl:!w-[500px] 2xl:!w-[700px] !scale-100 opacity-100"
                : i === (activeIndex - 1 + testimonials.length) % testimonials.length
                  ? "!h-auto !flex !items-end xl:!scale-[70%] !scale-90 md:!w-[460px] xl:-mb-20 xl:!w-[363px] opacity-80"
                  : i === ((activeIndex - 1 + testimonials.length) % testimonials.length) - 1
                    ? "!h-auto !flex !items-end !scale-0 opacity-0"
                    : i === (activeIndex + 1) % testimonials.length
                      ? "!h-auto !flex !items-start xl:!scale-[70%] !scale-90 md:!w-[460px] xl:-mt-20 xl:!w-[363px] opacity-80"
                      : i === ((activeIndex + 1) % testimonials.length) + 1
                        ? "!h-auto !flex !items-start !scale-0 opacity-0"
                        : "!scale-0 opacity-0"
            }`}
          >
            <div
              className={`w-full bg-white shadow-md rounded-lg p-4 sm:p-6 items-center transition-all duration-500 ease-in-out ${
                activeIndex === i ? "xs:flex grid gap-3 min-h-[350px]" : "min-h-fit"
              }`}
            >
              <div className={`flex xs:grid xs:justify-normal justify-between gap-3 ${activeIndex === i ? "flex-row" : "flex-col pb-2"}`}>
                <div className={`${activeIndex === i ? "xs:w-[230px] xs:h-full" : ""} w-[70px] h-[70px] rounded-lg overflow-hidden`}>
                  <Image loading="lazy" src={item.image} alt={item?.alt} className={`w-full h-full !object-cover ${item?.imageClass || ""}`} />
                </div>
                {currentScreen?.isXS ? <Coma /> : null}
              </div>
              <div className={`flex flex-col sm:justify-center gap-3 sm:gap-5 ${activeIndex === i ? "sm:min-h-[300px]" : ""}`}>
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-semibold text-sm text-quinary-100 text-nowrap">{item.name}</p>
                    <p className="text-tertiary-500 text-sm">{item.role}</p>
                  </div>
                  {currentScreen?.isSM ? (
                    <div className={`flex justify-end w-full`}>
                      <Coma />
                    </div>
                  ) : null}
                </div>
                <p className={`text-sm transition-all duration-500 ease-in-out ${activeIndex === i ? "opacity-100 block" : "opacity-0 hidden"}`}>
                  {item.feedback}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {currentScreen?.isMD ? (
          <>
            <div
              onClick={() => swiper?.slidePrev()}
              className="button-prev group absolute top-5 left-10 lg:left-[160px] xl:left-[320px] 2xl:left-[330px] -translate-y-1/2 border border-black rounded-full p-2 cursor-pointer z-10"
            >
              <AccordionIcon className="w-4 h-4 text-quinary-100 rotate-180 group-hover:rotate-[135deg] transform transition-transform duration-300" />
            </div>
            <div
              onClick={() => swiper?.slideNext()}
              className="button-next group absolute bottom-0 right-10 md: lg:right-[160px] xl:right-[320px] 2xl:right-[330px] -translate-y-1/2 border border-black rounded-full p-2 cursor-pointer z-10"
            >
              <AccordionIcon className="w-4 h-4 text-quinary-100 -rotate-90 group-hover:-rotate-45 transform transition-transform duration-300" />
            </div>
          </>
        ) : null}
      </Swiper>
    </div>
  );
}

export default memo(HappyCustomer);
