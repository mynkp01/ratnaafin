import { BlogBanner, BlogBannerMobile } from "@/assets";
import { API_V1, LOOKUP_VALUES } from "@/utils/Constant";
import { isEmpty } from "@/utils/helper";
import dynamic from "next/dynamic";
import Image from "next/image";
import { memo, Suspense } from "react";

const BlogClient = dynamic(() => import("./BlogClient"));
const BreadCrum = dynamic(() => import("@/components/BreadCrum"));
const NewsLatter = dynamic(() => import("@/components/NewsLatter"));

type Category = {
  _id: string;
  name: string;
  // count: number;
};

type BlogPost = {
  id: number;
  title: { rendered: string };
  date: string;
  link: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string }>;
    "wp:term"?: Array<Array<{ name: string }>>;
  };
};

const limitPerPage = 8;
let totalPages = 1;
const newsLatterData = {
  title: "Ready to unlock the potential of your dreams?",
  description: "Take the first step toward turning your vision into reality. Embrace new possibilities, explore opportunities, and make your dreams happen",
  button: "Request a Call Back",
};

async function fetchCategories() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_LOCAL}${API_V1}/value-lookup?value=${LOOKUP_VALUES.BLOGS_CATEGORY}`);

    if (!response.ok) {
      throw new Error("Failed to fetching blogs category");
    }

    const data = await response.json();
    data?.data?.unshift({ _id: "", name: "ALL TOPICS" });
    return data?.data || [];
  } catch (e) {
    console.error("Error while getting categories:", e);
    return [];
  }
}

async function fetchBlogs(categories = []) {
  if (!isEmpty(categories)) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_LOCAL}${API_V1}/blog-lookup?limit=${limitPerPage}&page=1`);

      if (!response.ok) {
        throw new Error("Failed to fetching blogs");
      }

      const data = await response.json();
      return data?.data?.docs || [];
    } catch (e) {
      console.error("Error while getting blogs list:", e);
      return [];
    }
  } else {
    return [];
  }
}

async function BlogPage() {
  const categories: Category[] = await fetchCategories();
  const initialBlogsData: BlogPost[] = await fetchBlogs(categories);

  return (
    <div className="flex flex-col gap-12">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r sm:from-black/60 from-black/70 sm:via-transparent via-black/30 to-black/0"></div>
        <Image
          fetchPriority="high"
          loading="eager"
          priority={true}
          src={BlogBanner}
          alt="collateral free loans,"
          className="sm:block hidden !object-cover object-right w-full"
        />
        <Image
          fetchPriority="high"
          loading="eager"
          priority={true}
          src={BlogBannerMobile}
          alt="collateral free loans,"
          className="!object-cover sm:hidden !w-full"
        />
        <div className="absolute inset-0 2xl:px-8 container px-4 mx-auto flex 2xl:h-fit 2xl:top-1/4 items-end sm:bottom-0 bottom-5 sm:items-center sm:justify-start">
          <div className="clip-customblog flex flex-col gap-3 sm:gap-8 md:gap-10 lg:gap-12 sm:bg-black/15 w-full sm:max-w-[400px] md:max-w-[480px] lg:max-w-[650px] sm:border sm:border-white/10 sm:backdrop-blur-[5px] rounded-l-2xl rounded-tr-[90px] md:rounded-tr-[105px] xl:rounded-tr-[100px] sm:p-4 md:p-6 lg:p-10">
            <div className="sm:block hidden">
              <BreadCrum />
            </div>
            <div className="flex flex-col gap-1 sm:gap-4 md:gap-8">
              <h2 className="text-white text-[22px] md:text-3xl lg:w-5/6 lg:text-4xl font-bold">Let’s Talk Finance</h2>
              <h1 className="text-white lg:w-5/6">Discover insights on everything lending & MSME on the Ratnaafin blog</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-10 2xl:px-8 px-4">
        <Suspense fallback={<div>Loading blog posts...</div>}>
          <BlogClient initialCategories={categories} initialBlogsData={initialBlogsData} initialTotalPages={totalPages} />
        </Suspense>
        <NewsLatter {...newsLatterData} />
      </div>
    </div>
  );
}

export const revalidate = 86400;
export default memo(BlogPage);
