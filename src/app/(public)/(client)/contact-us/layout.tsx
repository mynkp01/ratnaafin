import { EMAILS, PUBLIC_IMAGE, ROUTES } from "@/utils/Constant";
import { Metadata } from "next";
import { LocalBusinessJsonLd } from "next-seo";

const metaDataConstant = {
  title: "Contact Ratnaafin – Get in Touch for Financial Solutions",
  description:
    "Contact Ratnaafin for expert assistance on business loans, MSME finance, and more. Reach us via phone, email, or visit our nearest branch today.",
};

export const metadata: Metadata = {
  title: metaDataConstant.title,
  description: metaDataConstant.description,
  openGraph: {
    title: metaDataConstant.title,
    description: metaDataConstant.description,
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.client.contactUs}`,
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
      <LocalBusinessJsonLd
        scriptId={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.client.contactUs}`}
        name="Ratnaafin"
        url={`${process.env.NEXT_PUBLIC_FRONTEND_URL}`}
        telephone="1800-309-8010"
        email={EMAILS.INFO}
        address={{
          "@type": "PostalAddress",
          streetAddress: "2nd and 3rd Floor, The Ridge, Opposite Novotel, Iscon Char Rasta",
          addressLocality: "Ahmedabad",
          addressRegion: "Gujarat",
          postalCode: "380060",
          addressCountry: "IN",
        }}
      />
      {children}
    </>
  );
}
