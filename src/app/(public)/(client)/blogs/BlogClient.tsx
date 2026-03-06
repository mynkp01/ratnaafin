"use client";

import { apiHandler } from "@/api/apiHandler";
import { Search, Share } from "@/assets";
import { convertMediaUrl, LOOKUP_VALUES, ROUTES } from "@/utils/Constant";
import { isEmpty } from "@/utils/helper";
import { Box, Tab, Tabs } from "@mui/material";
import moment from "moment";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";

const NoData = dynamic(() => import("@/components/NoData"), {
  ssr: false,
});
const SocialMediaShareModal = dynamic(() => import("@/components/SocialMediaShareModal"), {
  ssr: false,
});

type BlogClientProps = { initialCategories; initialBlogsData; initialTotalPages: number };

function a11yProps(index: number) {
  return {
    id: `blogs-categories-tab-${index}`,
    "aria-controls": `blogs-categories-${index}`,
    "aria-expanded": "true",
  };
}

export const RenderBlogPost = memo(({ blog }: { blog: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="group h-full relative">
      <Link href={`${ROUTES.client.blogs}/${blog?.Url?.trim()}`} target="_blank">
        {open && (
          <SocialMediaShareModal
            setOpen={setOpen}
            open={open}
            url={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.client.blogs}/${blog?.Url?.trim()}`}
            title={"AB"}
          />
        )}
        <div className="overflow-hidden rounded-2xl">
          <Image
            loading="lazy"
            src={convertMediaUrl(blog?.doc_path)}
            alt={blog?.alt_text ? blog?.alt_text : blog?.title}
            width={1920}
            height={100}
            className="!object-cover !w-full !h-full rounded-t-xl group-hover:scale-105 transition-all duration-300 !overflow-hidden"
          />
        </div>
        <div className="relative">
          <div className="2xl:min-h-[200px] lg:min-h-[220px] sm:min-h-[200px] -mt-8 justify-between flex flex-col gap-3 p-4 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-xl mx-5">
            <p className="sm:text-lg font-semibold">{blog?.title}</p>
            <div className="flex flex-col rounded-b-xl">
              <p> {blog?.category.length && <span className="mb-1 block text-xs text-gray-500">{blog?.category?.map((ele) => ele.name).join(", ")}</span>}</p>
              <div className="flex justify-between items-center rounded-b-xl">
                <p>{blog?.createdAt ? moment(blog?.createdAt).format("DD MMM, YYYY") : ""}</p>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(true);
            }}
            className="absolute bottom-3 right-8 z-30 pointer-events-auto"
            style={{ pointerEvents: "auto", overlay: "auto" }}
          >
            <Share aria-label="Share" />
          </button>
        </div>
      </Link>
    </div>
  );
});

RenderBlogPost.displayName = "RenderBlogPost";

function BlogClient({ initialCategories, initialBlogsData, initialTotalPages }: BlogClientProps) {
  const limitPerPage = 8;

  const [currentCategory, setCurrentCategory] = useState(0);
  const [ourBlogsData, setOurBlogsData] = useState(initialBlogsData);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [categories, setCategories] = useState(initialCategories);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState({
    input: "",
    value: "",
  });

  async function fetchCategories() {
    try {
      const { data, status } = await apiHandler.value.lookup(`value=${LOOKUP_VALUES.BLOGS_CATEGORY}`);
      if ([200, 201].includes(status)) {
        data?.data?.unshift({ _id: "", name: "ALL TOPICS" });
        setCategories(data?.data);
      }
    } catch (e) {
      console.error("Error while getting categories:", e);
      setCategories([]);
    }
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data, status } = await apiHandler.blog.lookup(
          `limit=${limitPerPage}&page=${currentPage}&categoryId=${categories?.[currentCategory]?._id}&search=${search?.value}`
        );

        if ([200, 201].includes(status)) {
          setOurBlogsData((prev) => (currentPage === 1 ? [...data?.data?.docs] : [...prev, ...data?.data?.docs]));
          setTotalPages(data?.data?.totalPages);
        }
      } catch (e) {
        console.error("Error while getting blogs list:", e);
      }
    };
    if (!isEmpty(categories)) getPosts();
    else fetchCategories();
  }, [currentCategory, currentPage, categories, search?.value]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch((prev) => ({ ...prev, input: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-5">
      <Box className="flex flex-col gap-6 sm:gap-10">
        <div className="md:flex grid justify-between items-center gap-4">
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={currentCategory}
            onChange={(e, newValue) => {
              setCurrentCategory(newValue);
              setCurrentPage(1);
            }}
            aria-label="horizontal tabs example"
            className="xl:min-w-fit overflow-hidden pb-3 sm:pb-0 order-2 md:order-1 flex items-center lg:!w-[70%]"
            sx={{
              "& .MuiTab-root": {
                textAlign: "center",
                textTransform: "capitalize",
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                borderRadius: "20px",
                marginRight: "8px",
                paddingX: 2,
                paddingY: 1,
                minHeight: "auto",
                minWidth: "120px",
              },
              "& .MuiTabs-list": {
                padding: "1px",
              },
              "& .Mui-selected": {
                backgroundColor: "#046EB6",
                color: "#ffffff !important",
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            {categories?.map((tab, tabIndex) => (
              <Tab key={tab._id} disableRipple label={tab.name} {...a11yProps(tabIndex)} />
            ))}
          </Tabs>
          <div className="relative md:order-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-full w-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-secondary-600"
              onChange={handleSearch}
              onBlur={(e) => {
                setSearch((prev) => ({ ...prev, value: e.target.value }));
                setCurrentPage(1);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch((prev) => ({ ...prev, value: search?.input }));
                  setCurrentPage(1);
                }
              }}
            />
          </div>
        </div>
        <div className="flex w-full flex-col">
          {!isEmpty(ourBlogsData) ? (
            <div className="py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid gap-x-4 gap-y-10">
              {ourBlogsData?.map((blog, index) => (
                <RenderBlogPost blog={blog} key={index} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <NoData text="No Blogs Found" />
            </div>
          )}
        </div>
      </Box>
      {totalPages > currentPage && (
        <div className="text-center">
          <button
            className="rounded-full w-fit relative px-6 py-3 overflow-hidden xs:text-sm text-xs bg-primary-400 text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <span className="relative z-10">Load More</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(BlogClient);
