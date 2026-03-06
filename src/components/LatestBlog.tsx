"use client";
import { apiHandler } from "@/api/apiHandler";
import { RenderBlogPost } from "@/app/(public)/(client)/blogs/BlogClient";
import { selectLatestBlogs, setLatestBlogs } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { ROUTES } from "@/utils/Constant";
import { isEmpty } from "@/utils/helper";
import Link from "next/link";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function LatestBlog({
  title = "Finance Insights",
  description = "Flexible loans with competitive rates and quick approvals to meet your financial needs.",
  blogs = [],
}) {
  const dispatch = useAppDispatch();
  const latestBlogs = useSelector(selectLatestBlogs);

  useEffect(() => {
    if (!isEmpty(blogs)) {
      dispatch(setLatestBlogs(blogs));
    } else if (isEmpty(latestBlogs)) {
      getPosts();
    }
  }, [blogs]);

  const getPosts = async () => {
    try {
      const { data, status } = await apiHandler.blog.lookup(`limit=${8}&page=${1}`);
      if ([200, 201].includes(status)) {
        dispatch(setLatestBlogs(data?.data?.docs));
      }
    } catch (e) {
      console.error("Error while getting blogs list:", e);
    }
  };

  return (
    <div className="bg-senary-100">
      <div className="flex flex-col gap-8 container mx-auto py-10 sm:px-0 px-4 2xl:px-8">
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-2xl sm:text-4xl font-bold text-quinary-100">{title}</h3>
          <p className="text-center md:w-1/2 w-full text-base text-tertiary-500">{description}</p>
        </div>
        <div className="container mx-auto">
          {!isEmpty(latestBlogs) ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              loop
              // speed={2000}
              breakpoints={{
                650: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              navigation={true}
              grabCursor={true}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
            >
              {latestBlogs.map((blog) => (
                <SwiperSlide key={blog?._id} className="py-4">
                  <RenderBlogPost blog={blog} key={blog?._id} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </div>
        <div className="flex justify-center">
          <Link
            href={ROUTES.client.blogs}
            className="rounded-full w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
          >
            <span className="relative z-10">View More</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(LatestBlog);
