import { PUBLIC_IMAGE, URLS } from "@/utils/Constant";
import { Metadata } from "next";
import { OrganizationJsonLd } from "next-seo";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"));

const metaDataConstant = {
  title: "MSME loan - RBI registered NBFC | Working Capital Loan",
  description: "Unlock the capital your business needs to thrive with our range of SME financing solutions, from Working Capital Loans to Machinery Loans.",
};

export const metadata: Metadata = {
  title: metaDataConstant.title,
  description: metaDataConstant.description,
  openGraph: {
    title: metaDataConstant.title,
    description: metaDataConstant.description,
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrganizationJsonLd
        type="Organization"
        scriptId={`${process.env.NEXT_PUBLIC_FRONTEND_URL}`}
        name="Ratnaafin"
        alternateName="Fastest-growing non-banking finance (NBFC) in India"
        url={`${process.env.NEXT_PUBLIC_FRONTEND_URL}`}
        logo={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${PUBLIC_IMAGE.ratnaafinLogo}`}
        contactPoint={[
          {
            "@type": "ContactPoint",
            telephone: "1800-309-8010",
            contactType: "customer service",
          },
        ]}
        sameAs={[URLS.FACEBOOK, URLS.INSTAGRAM, URLS.YOUTUBE, URLS.LINKEDIN]}
      />
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
}
