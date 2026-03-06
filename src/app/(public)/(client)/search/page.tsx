"use client";
import { apiHandler } from "@/api/apiHandler";
import { Calendar, Clock, ExploreIcon, Location } from "@/assets";
import { VideoComp } from "@/components/HomePosiblehHaiSwiper";
import { selectScreen, setIsLoading, setShowFloatingForm } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { LoanSolutions, ROUTES, SEARCHPAGE } from "@/utils/Constant";
import { isEmpty, showToast, timeAgo } from "@/utils/helper";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RenderBlogPost } from "../blogs/BlogClient";

const NoData = dynamic(() => import("@/components/NoData"), {
  ssr: false,
});

const ExploreJob = ({ title, address, time, year, week }) => {
  return (
    <div className="xs:flex grid gap-4 justify-between w-full shadow-[0_2px_5px_rgba(0,0,0,0.1)] bg-white rounded-xl p-4">
      <div className="xs:flex grid gap-4">
        <p>
          <ExploreIcon />
        </p>
        <div className="flex flex-col gap-2">
          <p className="font-medium xs:text-lg text-base">{title}</p>
          <p className="text-tertiary-500 text-sm flex gap-2 items-center">
            <Location />
            {address}
          </p>
          <div className="flex gap-2">
            <p className="text-tertiary-500 text-sm flex gap-2 items-center">
              <Clock className="w-6 h-6" /> {time}
            </p>
            <p className="text-tertiary-500 text-sm flex gap-2 items-center">
              <Calendar className="w-6 h-6" />
              {year}
            </p>
          </div>
        </div>
      </div>
      <p className="text-sm text-tertiary-500 text-nowrap">{week}</p>
    </div>
  );
};

function Page() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentScreen = useSelector(selectScreen);

  const search = searchParams.get("search");
  const [loanSolutions, setLoanSolutions] = useState(LoanSolutions);
  const [video, setVideo] = useState([]);
  const [job, setJob] = useState([]);
  const [blog, setBlog] = useState([]);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (isEmpty(search)) {
      setLoanSolutions([]);
      setPages([]);
      setVideo([]);
      setJob([]);
      setBlog([]);
    } else {
      const regex = new RegExp(search || "", "i");
      setLoanSolutions(LoanSolutions.filter((v) => new RegExp(search || "", "i").test(v?.title)));
      setPages(SEARCHPAGE?.filter((v) => v.keywords.filter((n) => regex.test(n)).length > 0));
      fetchYouTube();
      fetchJobs();
      getBlogs();
    }
  }, [search]);

  const fetchYouTube = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.youtube.lookup(`search=${search}`);
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

  const fetchJobs = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data, status } = await apiHandler.job.lookup(`&search=${search}`);
      if (status === 200 || status === 201) {
        let formattedData = data?.data;
        formattedData = formattedData.map((item: any) => {
          const city = item?.city?.map((cityItem: any) => {
            return cityItem?.city;
          });
          return { ...item, city: city?.join(", ") };
        });
        setJob(formattedData);
      } else {
        showToast("error", data?.message);
      }
    } catch (err: any) {
      showToast("error", err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  async function getBlogs() {
    try {
      const { data, status } = await apiHandler.blog.lookup(`limit=${8}&page=${1}&search=${search}`);
      if ([200, 201].includes(status)) {
        setBlog(data?.data?.docs);
      }
    } catch (e) {
      console.error("Error while getting blogs list:", e);
    }
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="container mx-auto flex flex-col gap-10 2xl:px-8 px-4 pt-10">
        <div className="flex flex-col gap-8">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">
            Search Results for: <span className="text-primary-400">{search}</span>
          </h3>
          {!isEmpty(video) || !isEmpty(blog) || !isEmpty(job) || !isEmpty(loanSolutions) || !isEmpty(pages) ? (
            <>
              {!isEmpty(pages) ? (
                <div className="flex flex-col gap-8">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Pages</h3>
                  <div className="flex flex-wrap gap-4">
                    {pages.map((v) => (
                      <Link
                        href={v?.href}
                        key={v?.name}
                        target={v?.href?.includes("http") ? "_blank" : ""}
                        className="cursor-pointer transition-all duration-200 font-semibold bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] px-4 py-2 w-fit rounded-full relative overflow-hidden sm:text-xl text-black hover:text-white before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
                      >
                        <span className="relative z-10">{v?.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {!isEmpty(loanSolutions) ? (
                <div className="flex flex-col gap-8">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Products</h3>
                  {currentScreen?.isXS ? (
                    <div className="grid gap-6">
                      {loanSolutions.map((item) => (
                        <div key={item._id} className="flex group flex-col gap-4 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-xl">
                          <div className="overflow-hidden rounded-t-xl">
                            <Image
                              loading="lazy"
                              src={item.image.src}
                              width={1920}
                              height={100}
                              className="!object-cover !w-full !h-full rounded-t-xl group-hover:scale-105 transition-all duration-300 !overflow-hidden"
                              alt="loan-solution"
                            />
                          </div>
                          <div className="flex flex-col gap-2 p-4 pt-0">
                            <div className="flex justify-between items-center rounded-b-xl">
                              <h4 className="font-semibold">{item.title}</h4>
                              <button
                                onClick={() => dispatch(setShowFloatingForm(true))}
                                className="rounded-full relative min-w-[90px] sm:w-full px-3 sm:px-5 py-2 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all text-nowrap before:duration-500 hover:before:left-0 hover:before:w-full"
                              >
                                <span className="relative z-10">Apply Now</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {loanSolutions.map((item) => (
                        <div key={item._id} className="flex group flex-col gap-4 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-xl">
                          <div className="overflow-hidden rounded-t-xl">
                            <Image
                              loading="lazy"
                              src={item.image.src}
                              width={1920}
                              height={100}
                              className="!object-cover !w-full !h-full rounded-t-xl group-hover:scale-105 transition-all duration-300 !overflow-hidden"
                              alt="loan-solution"
                            />
                          </div>
                          <div className="flex flex-col gap-2 p-4 pt-0">
                            <h4 className="text-xl font-semibold">{item?.title}</h4>
                            <div className="flex justify-between items-center border-t pt-3 rounded-b-xl">
                              <Link href={item?.href} className="hover:text-primary-400 transition-all">
                                {item?.link}
                              </Link>
                              <button
                                onClick={() => dispatch(setShowFloatingForm(true))}
                                className="rounded-full relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
                              >
                                <span className="relative z-10">Apply Now</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}

              {!isEmpty(job) ? (
                <div className="flex flex-col gap-8">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Jobs</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:mr-60">
                    {job.map((value) => (
                      <div onClick={() => router.push(ROUTES.client.careers)} key={value?._id} className="cursor-pointer">
                        <ExploreJob
                          title={value?.title}
                          address={value?.city}
                          time={value?.workType}
                          year={value?.experience}
                          week={value?.createdAt ? timeAgo(value?.createdAt) : ""}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {!isEmpty(blog) ? (
                <div className="flex flex-col gap-8">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Finance Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {blog.map((item, i) => (
                      <RenderBlogPost blog={item} key={i} />
                    ))}
                  </div>
                </div>
              ) : null}

              {!isEmpty(video) ? (
                <div className="flex flex-col gap-8">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:text-left text-center text-quinary-100">Videos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {video
                      .filter((ele) => !isEmpty(ele?.doc_path))
                      .map((item) => (
                        <VideoComp key={item?._id} item={item} />
                      ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <NoData text="No Search Results !!" />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Page);
