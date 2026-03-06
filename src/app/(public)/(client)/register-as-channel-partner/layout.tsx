import { PUBLIC_IMAGE, ROUTES } from "@/utils/Constant";
import { Metadata } from "next";

const metaDataConstant = {
  title: "Become a Channel Partner with Ratnaafin – Register Today",
  description:
    "Partner with Ratnaafin, India’s leading NBFC, and earn by offering business loan solutions. Register as a Channel Partner today and join a network that empowers MSME growth across India.",
};

export const metadata: Metadata = {
  title: metaDataConstant.title,
  description: metaDataConstant.description,
  openGraph: {
    title: metaDataConstant.title,
    description: metaDataConstant.description,
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.client.registerAsChannelPartner}`,
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
