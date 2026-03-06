import { MICRO_PAGES_META_DATA, PUBLIC_IMAGE } from "@/utils/Constant";
import {
  machinery_eligibilitydocument_faq,
  machinery_emicalculator_faq,
  machinery_howtoapply_faq,
  machinery_interestrate_faq,
  machinery_overview_faq,
} from "@/utils/F&Q";
import { generateSchema } from "@/utils/helper";
import { Metadata } from "next";
import { FAQJsonLd } from "next-seo";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  // Get metadata for the specific slug, fallback to overview
  const metaData = MICRO_PAGES_META_DATA.machineryLoan[slug] || MICRO_PAGES_META_DATA.machineryLoan.overview;

  const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/machinery-loan/${slug}`;

  return {
    title: metaData.title,
    description: metaData.description,
    openGraph: {
      title: metaData.title,
      description: metaData.description,
      url: url,
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
      title: metaData.title,
      description: metaData.description,
      images: [`${process.env.NEXT_PUBLIC_FRONTEND_URL}${PUBLIC_IMAGE.rLogo}`],
    },
  };
}

const FAQSData = {
  overview: machinery_overview_faq.data,
  "interest-rates": machinery_interestrate_faq.data,
  "eligibility-document": machinery_eligibilitydocument_faq.data,
  "how-to-apply": machinery_howtoapply_faq.data,
  "emi-calculator": machinery_emicalculator_faq.data,
};

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <>
      <FAQJsonLd questions={generateSchema(FAQSData[slug] || [])} />

      {/* <!-- Meta Pixel Code --> */}
      {/* Added on 03/03/2025 WP group @Zain */}
      {/* <Script id="meta-pixel-bl" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1071914115141655');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1071914115141655&ev=PageView&noscript=1" />
      </noscript> */}
      {/* <!-- End Meta Pixel Code --> */}
      {children}
    </>
  );
}
