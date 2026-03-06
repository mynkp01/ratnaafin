import NotFound from "@/app/not-found";
import { API_V1, convertMediaUrl, PUBLIC_IMAGE, ROUTES } from "@/utils/Constant";
import { generateSchema, isEmpty } from "@/utils/helper";
import moment from "moment";
import { ArticleJsonLd, FAQJsonLd } from "next-seo";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { memo } from "react";

const BlogShare = dynamic(() => import("./BlogShare"));
const BreadCrum = dynamic(() => import("@/components/BreadCrum"));
const LatestBlog = dynamic(() => import("@/components/LatestBlog"));
const NewsLatter = dynamic(() => import("@/components/NewsLatter"));
const BlogFAQ = dynamic(() => import("./BlogFAQ"));

const newsLatterData = {
  title: "Ready to unlock the potential of your dreams?",
  description: "Take the first step toward turning your vision into reality. Embrace new possibilities, explore opportunities, and make your dreams happen",
  button: "Request a Call Back",
};

async function getBlogData(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_LOCAL}${API_V1}/blog-by-url?url=${slug}`);

    if (!response.ok) {
      throw new Error("Failed to fetching blog data");
    }

    const data = await response.json();

    if (data?.data?.isRedirect) {
      redirect(`${ROUTES.client.blogs}/${data?.data?.Url?.trim()}`);
    }
    return { data: data?.data, isError: false };
  } catch (e) {
    if (e?.message === "NEXT_REDIRECT") {
      throw e;
    }
    console.error("Error fetching blog data:", e);
    return { data: null, isError: true };
  }
}

async function fetchBlogs(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_LOCAL}${API_V1}/blog-lookup?limit=${8}&page=${1}&notUrl=${slug}`);

    if (!response.ok) {
      throw new Error("Failed to fetching blog details");
    }

    const data = await response.json();
    return data?.data?.docs || [];
  } catch (e) {
    console.error("Error while getting blogs list:", e);
    return [];
  }
}

async function BlogDetail({ params }: { params: { slug: string } }) {
  let { slug } = await params;
  const originalSlug = slug?.trim();
  const decodedSlug = decodeURIComponent(originalSlug || "")?.trim();

  if (decodedSlug !== originalSlug && decodedSlug) {
    redirect(`${ROUTES.client.blogs}/${encodeURIComponent(decodedSlug)}`);
  }

  slug = decodedSlug;

  const { data } = await getBlogData(slug);
  const blogs = await fetchBlogs(slug);

  return isEmpty(data) ? (
    <NotFound />
  ) : (
    <>
      <ArticleJsonLd
        type="BlogPosting"
        mainEntityOfPage={{ "@id": `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blogs/${slug}`, "@type": "WebPage" }}
        headline={data?.title}
        description={data?.content?.replace(/<[^>]+>/g, "")?.slice(0, 160)}
        image={[convertMediaUrl(data?.doc_path)]}
        author={{ "@type": "Organization", name: "Ratnaafin", url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}` }}
        publisher={{
          "@type": "Organization",
          name: "Ratnaafin",
          logo: { "@type": "ImageObject", url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${PUBLIC_IMAGE.ratnaafinLogo}` },
        }}
        url={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/blogs/${slug}`}
        datePublished={new Date(data?.createdAt)?.toISOString()}
        dateModified={new Date(data?.updatedAt)?.toISOString()}
      />
      <div className="container mx-auto flex flex-col gap-2 lg:gap-6 2xl:px-8 px-4 pt-8">
        <BreadCrum />
        <div className="flex flex-col gap-2 lg:gap-6">
          <h1 className="text-quinary-100 text-2xl md:text-3xl lg:text-4xl font-bold ">{data?.title}</h1>
          <div className="flex justify-center">
            <Image
              fetchPriority="high"
              loading="eager"
              priority={true}
              src={convertMediaUrl(data?.doc_path)}
              alt={data?.alt_text ? data?.alt_text : data?.title}
              height={744}
              width={1000}
              className="object-contain object-center rounded-xl h-fit"
            />
          </div>
          <div className="lg:flex w-full gap-5 lg:divide-x">
            <div className="lg:w-[15%] lg:flex flex-col gap-10 hidden">
              <div className="flex flex-col gap-5">
                <h5 className="uppercase font-semibold border-b pb-3 text-quinary-100">Details</h5>
                <p className="flex justify-between uppercase text-quinary-100">
                  Date <span className="capitalize">{data?.createdAt ? moment(data?.createdAt).format("DD MMM, YYYY") : ""}</span>
                </p>
                <p className="flex justify-between uppercase text-quinary-100">
                  Author <span className="capitalize">{data?.users?.userName}</span>
                </p>
              </div>
              <BlogShare />
            </div>
            <div className="lg:w-[60%] pl-5 space-y-10">
              <div className="ck-content !text-quinary-100" dangerouslySetInnerHTML={{ __html: data?.content }} />
              {!isEmpty(data?.faqs) ? (
                <>
                  <FAQJsonLd questions={generateSchema(data?.faqs || [])} />
                  <BlogFAQ faqs={data?.faqs || []} />
                </>
              ) : null}
            </div>
            <div className="lg:w-[25%] pl-5 lg:flex flex-col gap-3 hidden">
              <h5 className="uppercase font-semibold border-b pb-3 mb-3 text-quinary-100">RELATED article</h5>
              {blogs?.map((item, index) => (
                <Link
                  href={`${ROUTES.client.blogs}/${item?.Url?.trim()}`}
                  target="_blank"
                  key={index}
                  className="flex gap-3 items-center xl:flex-row  flex-col p-3 shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-md"
                >
                  <Image
                    loading="lazy"
                    src={convertMediaUrl(item?.doc_path)}
                    alt={item?.alt_text ? item?.alt_text : item?.title}
                    height={200}
                    width={400}
                    className="!object-contain w-full xl:max-w-36 !aspect-video"
                  />
                  <div className="flex flex-col gap-2 justify-between">
                    <h3 className="text-quinary-100 font-bold line-clamp-2">{item?.title}</h3>
                    <p className="text-sm text-tertiary-500">{item?.createdAt ? moment(item?.createdAt).format("DD MMM, YYYY") : ""}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <LatestBlog title="Related Article" description="" />
      </div>
      <div className="container mx-auto flex flex-col gap-10 2xl:px-8 pt-8 px-4">
        <NewsLatter {...newsLatterData} />
      </div>
    </>
  );
}

export default memo(BlogDetail);
