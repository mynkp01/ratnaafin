import { API_V1, PUBLIC_IMAGE } from "@/utils/Constant";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};
const metaConstant = {
  title: "Insights & Updates – Ratnaafin Blog | MSME Finance, Business Growth, NBFC News",
  description:
    "Read the latest blogs from Ratnaafin on MSME finance, business growth strategies, NBFC trends, loan tips, and financial solutions tailored for Indian businesses.",
  keyword: "Ratnaafin, MSME finance, business growth, NBFC news, loan tips, financial solutions, Indian businesses",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_LOCAL}${API_V1}/blog-by-url?url=${slug}`, {
      cache: "no-store",
    });

    const { data } = await response.json();
    const metaTitle = data?.meta_title ? data?.meta_title : metaConstant?.title;
    const metaDescription = data?.meta_description ? data?.meta_description : metaConstant?.description;
    const metaKeyword = data?.meta_keyword ? data?.meta_keyword : metaConstant?.keyword;
    const metaImagesURL = data?.doc_path
      ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}${API_V1}${data?.doc_path}`
      : `${process.env.NEXT_PUBLIC_FRONTEND_URL}${PUBLIC_IMAGE.ratnaafinLogo}`;

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeyword,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blogs/${slug}`,
        siteName: "Ratnaafin",
        images: [
          {
            url: metaImagesURL,
            width: 1200,
            height: 630,
            alt: "Ratnaafin - Leading NBFC for MSME Financial Solutions",
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaTitle,
        images: [`${process.env.NEXT_PUBLIC_FRONTEND_URL}${PUBLIC_IMAGE.rLogo}`],
      },
    };
  } catch (e) {
    console.error("Error fetching blog title", e);

    return {
      title: metaConstant.title,
      description: metaConstant.description,
      keywords: metaConstant.keyword,
      openGraph: {
        title: metaConstant.title,
        description: metaConstant.description,
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blogs/${slug}`,
        siteName: "Ratnaafin",
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${PUBLIC_IMAGE.ratnaafinLogo}`,
            width: 1200,
            height: 630,
            alt: "Ratnaafin - Leading NBFC for MSME Financial Solutions",
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: metaConstant.title,
        description: metaConstant.description,
        images: [`${process.env.NEXT_PUBLIC_FRONTEND_URL}${PUBLIC_IMAGE.rLogo}`],
      },
    };
  }
}

export default function BlogsLayout({ children }) {
  return children;
}
