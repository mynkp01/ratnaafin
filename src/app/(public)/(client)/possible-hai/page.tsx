"use client";
import { apiHandler } from "@/api/apiHandler";
import { PlayIcon, PossibalehaiColorLgo, PossibleHerobanner } from "@/assets";
import { setIsLoading, setShowYouTubeIFrame } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { convertMediaUrl, convertVideoUrl, LOOKUP_VALUES, ROUTES } from "@/utils/Constant";
import { isEmpty, showToast } from "@/utils/helper";
import { Tooltip } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BreadCrum = dynamic(() => import("@/components/BreadCrum"), {
  ssr: false,
});
const NewsLatter = dynamic(() => import("@/components/NewsLatter"), {
  ssr: false,
});
const CustomVideo = dynamic(() => import("@/components/CustomVideo"), {
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

const VideoComp = ({ item, className = "flex justify-center", data = null }) => {
  const dispatch = useAppDispatch();
  return (
    <div key={item?._id} className={className}>
      <div className={`relative ${!isEmpty(data) ? "sm:w-1/2 w-full" : "w-full"}`}>
        <img loading="lazy" src={convertMediaUrl(item?.doc_path)} alt="" className="h-full w-full aspect-video xs:object-cover object-contain rounded-xl" />
        <button
          className={`absolute left-1/2 top-1/2 z-30 flex rounded-full -translate-x-1/2 -translate-y-1/2 items-center text-white`}
          onClick={() => {
            dispatch(setShowYouTubeIFrame({ show: true, video: item }));
          }}
        >
          <PlayIcon className={"size-6 min-h-6 min-w-6"} />
        </button>
      </div>

      {React.isValidElement(data) ? data : null}
    </div>
  );
};

function Page() {
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [testimonialVideo, setTestimonialVideo] = useState([]);
  const [playVideo, setPlayVideo] = useState(false);

  const fetchYouTubeTestimonial = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.youtube.lookup(`value_code=${LOOKUP_VALUES.TESTIMONIAL}`);
      if (status === 200 || status === 201) {
        setTestimonialVideo(data?.data);
      } else {
        showToast("error", data?.message);
      }
    } catch (error) {
      showToast("error", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    fetchYouTubeTestimonial();
  }, []);

  return (
    <div className="flex flex-col gap-12 lg:gap-20">
      {/* possible hai hero banner */}
      <div>
        <div className="bg-senary-100 py-10 h-[450px] sm:h-[500px] md:h-[630px]">
          <div className="flex flex-col gap-12 justify-center items-center">
            <BreadCrum />
            <div className="flex flex-col gap-8 items-center">
              <Image fetchPriority="high" loading="eager" priority={true} src={PossibalehaiColorLgo} width={300} height={150} alt="PossibalehaiColorLgo" />
              <h1 className="md:w-10/12 text-center px-4">
                Turning dreams into reality - because with Ratnaafin, Possible Hai. Empowering your financial journey with solutions that make the impossible,
                possible.
              </h1>
            </div>
          </div>
        </div>
        <div className="relative flex justify-center -mt-20 xs:-mt-36 container mx-auto px-4 sm:-mt-40 md:-mt-80 w-[1080px]">
          <div className={`aspect-video h-full max-h-fit w-full ${playVideo ? "block" : "hidden"}`}>
            <CustomVideo
              src={convertVideoUrl("/Documents/Ratnaafin_Brand_Film.mp4")}
              controls
              muted
              className="!h-full rounded-xl  aspect-video  !w-full !object-cover"
              ref={videoRef}
            />
          </div>
          <div
            className={`cursor-pointer w-full ${!playVideo ? "block" : "hidden"}`}
            onClick={() => {
              setPlayVideo(true);
              videoRef?.current?.play();
            }}
          >
            <Image
              fetchPriority="high"
              loading="eager"
              priority={true}
              src={PossibleHerobanner}
              width={1000}
              height={300}
              alt="PossibleHerobanner"
              className="!h-full rounded-xl !w-full !object-cover"
            />
            <button className="absolute left-1/2 top-1/2 z-30 flex !rounded-full -translate-x-1/2 -translate-y-1/2 items-center text-white">
              <PlayIcon className="size-6 min-h-6 min-w-6" />
            </button>
          </div>
        </div>
      </div>
      {/* video */}
      <div className="flex flex-col gap-8">
        <div className="container mx-auto lg:grid-cols-2 grid gap-5 2xl:px-8 px-4">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-left text-quinary-100">Jaha Iraade Bade Hain, Waha Hum Aapke Saath Khade Hain</h2>
          <div className="space-y-4">
            <p className="text-left text-sm sm:text-base text-tertiary-500">
              At Ratnaafin, we believe growth isn’t just about capital - it’s about confidence, clarity, and the courage to move forward.
            </p>
            <p className="text-left text-sm sm:text-base text-tertiary-500">
              Discover how business owners like you turned ambition into action, explore insights that simplify finance, and resources that will help you make
              the next move. From customer journeys to expert blogs and real-life breakthroughs — it’s all here.
            </p>
            <p className="text-left text-sm sm:text-base text-tertiary-500">
              Because with the right support,{" "}
              <Link href={ROUTES.client.possibleHai} className="text-primary-400 font-semibold">
                Possible Hai.
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        {/* top video */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl sm:text-4xl font-bold text-quinary-100">Videos</h3>
            <p className="md:w-1/2 w-full text-base text-tertiary-500">Watch our most popular videos to stay informed and inspired.</p>
          </div>
          <div className="grid lg:grid-cols-2 h-auto gap-5">
            <div className="flex flex-1 flex-col gap-3 h-fit">
              <div className="relative flex justify-center">
                {testimonialVideo?.[0]?.doc_path && (
                  <>
                    <Image
                      loading="lazy"
                      src={convertMediaUrl(testimonialVideo?.[0]?.doc_path)}
                      alt=""
                      width={845}
                      height={300}
                      className="w-full h-full !object-cover rounded-xl"
                    />
                    <button
                      onClick={() => dispatch(setShowYouTubeIFrame({ show: true, video: testimonialVideo?.[0] }))}
                      className="absolute left-1/2 top-1/2 z-30 flex rounded-full -translate-x-1/2 -translate-y-1/2 items-center text-white"
                    >
                      <PlayIcon className="size-6 min-h-6 min-w-6" />
                    </button>
                  </>
                )}
              </div>
              <div>
                <p className="text-quinary-100 font-semibold flex justify-between">{testimonialVideo?.[0]?.keyword}</p>
                <p className="mt-2">{testimonialVideo?.[0]?.link}</p>
              </div>
            </div>

            <div className="flex flex-1 aspect-video flex-col gap-4 overflow-y-auto">
              <Swiper
                direction="vertical"
                slidesPerView={2.5}
                spaceBetween={20}
                speed={7000}
                loop={true}
                allowTouchMove={true}
                grabCursor={true}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  375: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  536: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2.5,
                    spaceBetween: 5,
                  },
                  1023: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1280: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                  },
                  1440: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
                modules={[Autoplay]}
                className="h-[465px] overflow-hidden smooth-autoplay"
                wrapperClass="mySwiper"
              >
                {testimonialVideo.slice(1).map((tab) => (
                  <SwiperSlide key={tab?._id}>
                    <VideoComp
                      className="flex bg-gray-100 w-full rounded-xl"
                      item={tab}
                      data={
                        <div className="flex flex-col gap-2 w-full p-2 overflow-hidden">
                          <p className="text-xs sm:text-sm bg-gray-200 w-fit px-2 rounded-lg py-1 text-gray-500 ">{tab?.keyword}</p>
                          <Tooltip title={tab?.link}>
                            <p className="font-medium truncate line-clamp-3 whitespace-normal">{tab?.link}</p>
                          </Tooltip>
                        </div>
                      }
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        {/* Latest Blog */}
      </div>
      <LatestBlog title="Finance Insights" description="Flexible loans with competitive rates and quick approvals to meet your financial needs." />
      <div className="container mx-auto flex flex-col gap-12 2xl:px-8 px-4">
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export default memo(Page);
