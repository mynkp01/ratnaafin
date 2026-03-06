import { PUBLIC_IMAGE, ROUTES } from "@/utils/Constant";
import { commercial_solar_loan_faq } from "@/utils/F&Q";
import { generateSchema } from "@/utils/helper";
import { Metadata } from "next";
import { FAQJsonLd } from "next-seo";

const metaDataConstant = {
  title: "Commercial/Industrial Solar Loan in India | Easy Solar Financing - Ratnaafin",
  description: "Switch to clean energy with Ratnaafin’s Commercial/Industrial Solar Loans. Enjoy low interest rates, quick approval, and flexible EMI options.",
};

export const metadata: Metadata = {
  title: metaDataConstant.title,
  description: metaDataConstant.description,
  openGraph: {
    title: metaDataConstant.title,
    description: metaDataConstant.description,
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.product.commercialSolarLoan}`,
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
  return (
    <>
      <FAQJsonLd questions={generateSchema(commercial_solar_loan_faq.data || [])} />
      {children};
    </>
  );
}
