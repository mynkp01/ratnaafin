import { PUBLIC_IMAGE, ROUTES } from "@/utils/Constant";
import { Metadata } from "next";

const metaDataConstant = {
  title: "Apply Home Loan Online 2025 at Low Interest Rates up to 75 Lakhs",
  description:
    "Apply for your dream home with Ratnaafin’s home loan. Enjoy low interest rates, fast processing, minimal documentation & flexible repayment options.",
};
export const metadata: Metadata = {
  title: metaDataConstant.title,
  description: metaDataConstant.description,
  openGraph: {
    title: metaDataConstant.title,
    description: metaDataConstant.description,
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.product.homeLoan}`,
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
