import { PUBLIC_IMAGE, ROUTES } from "@/utils/Constant";
import { Metadata } from "next";

const metaDataConstant = {
  title: "Apply Loan Against Property at Low Interest Rates 2025",
  description:
    "Unlock the value of your property with Ratnaafin’s Loan Against Property. Get high-value loans at attractive rates with easy EMIs and minimal documentation.",
};

export const metadata: Metadata = {
  title: metaDataConstant.title,
  description: metaDataConstant.description,
  openGraph: {
    title: metaDataConstant.title,
    description: metaDataConstant.description,
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.product.loanAgainstProperty}`,
    siteName: "Ratnaafin",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${PUBLIC_IMAGE.ratnaafinLogo}`,
        width: 1200,
        height: 630,
        alt: "Ratnaafin - Leading NBFC for MSME Financial Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: metaDataConstant.title,
    description: metaDataConstant.description,
    images: [`${process.env.NEXT_PUBLIC_FRONTEND_URL}${PUBLIC_IMAGE.rLogo}`],
  },
};

export default function Layout({ children }) {
  return children;
}
