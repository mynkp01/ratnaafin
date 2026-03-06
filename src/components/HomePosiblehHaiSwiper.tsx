"use client";
import { PlayIcon } from "@/assets";
import { selectScreen, setShowYouTubeIFrame } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { convertMediaUrl } from "@/utils/Constant";
import { isEmpty } from "@/utils/helper";
import Image from "next/image";
import { memo } from "react";
import { useSelector } from "react-redux";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const VideoComp = memo(({ item }) => {
  const dispatch = useAppDispatch();
  return (
    <div key={item?._id} className="relative flex justify-center">
      <>
        <Image loading="lazy" src={convertMediaUrl(item?.doc_path)} alt="slider" width={340} height={100} className="!object-cover rounded-xl" />
        <button
          className="absolute left-1/2 top-1/2 z-30 flex  rounded-full -translate-x-1/2 -translate-y-1/2 items-center text-white"
          onClick={() => dispatch(setShowYouTubeIFrame({ show: true, video: item }))}
        >
          <PlayIcon className="size-6 min-h-6 min-w-6" />
        </button>
      </>
    </div>
  );
});

VideoComp.displayName = "VideoComp";

const SwiperComp = ({ video = [], reverseDirection = false }) => {
  return (
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
        reverseDirection: reverseDirection,
      }}
      breakpoints={{
        375: {
          slidesPerView: 2.5,
          spaceBetween: 30,
        },
        536: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        1023: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        1440: {
          slidesPerView: 2.5,
          spaceBetween: 30,
        },
      }}
      modules={[Autoplay]}
      className="h-[465px] overflow-hidden smooth-autoplay"
      wrapperClass="mySwiper"
    >
      {video.map((item, i) => (
        <SwiperSlide key={item._id + i}>
          <VideoComp item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const HomePosiblehHaiSwiper = ({ testimonialVideo = [], promotionalVideo = [] }) => {
  const currentScreen = useSelector(selectScreen);

  return (
    <>
      {currentScreen?.isSM ? (
        <>
          {!isEmpty(testimonialVideo) ? <SwiperComp video={testimonialVideo} /> : null}
          {!isEmpty(promotionalVideo) ? <SwiperComp video={promotionalVideo} reverseDirection={true} /> : null}
        </>
      ) : (
        <>{!isEmpty(testimonialVideo) || !isEmpty(promotionalVideo) ? <SwiperComp video={[...testimonialVideo, ...promotionalVideo]} /> : null}</>
      )}
    </>
  );
};

export default memo(HomePosiblehHaiSwiper);
