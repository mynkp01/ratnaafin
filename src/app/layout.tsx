import ReduxProvider from "@/redux/store/ReduxProvider";
import { PUBLIC_IMAGE } from "@/utils/Constant";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { Canonicals } from "./ClientLayout";
import "./globals.css";

const CookieConsentBanner = dynamic(() => import("@/components/CookieConsent"));
const ClientLayout = dynamic(() => import("./ClientLayout"));

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

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "arial", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <head>
        {/* <!-- Google site verification (gtag.js) --> */}
        <meta name="google-site-verification" content="dS3w1ICLVMImYZEt1BcojA20Dr4ohZQnwmYgf4O37mU" />
        {/* <!-- End Google site verification (gtag.js) --> */}

        <meta name="robots" content="INDEX,FOLLOW" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes, viewport-fit=cover" />

        <Suspense>
          <Canonicals />
        </Suspense>

        {/* <!-- Google tag (gtag.js) --> */}
        <Script id="google-tag" src="https://www.googletagmanager.com/gtag/js?id=G-L09X00V33Q" strategy="lazyOnload" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
	          window.dataLayer = window.dataLayer || [];
	          function gtag(){dataLayer.push(arguments);}
	          gtag('js', new Date());
                  
	          gtag('config', 'G-L09X00V33Q');
          `}
        </Script>
        <Script id="google-tag-2" src="https://www.googletagmanager.com/gtag/js?id=G-2D9HZM20J8" strategy="lazyOnload" />
        <Script id="google-analytics-2" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
	          function gtag(){dataLayer.push(arguments);}
	          gtag('js', new Date());

	          gtag('config', 'G-2D9HZM20J8');
          `}
        </Script>
        <Script id="google-tag-3" src="https://www.googletagmanager.com/gtag/js?id=AW-17086422837" strategy="lazyOnload" />
        <Script id="google-analytics-3" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || []; 
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date()); 
 
            gtag('config', 'AW-17086422837');
          `}
        </Script>
        {/* <!-- End Google tag (gtag.js) --> */}

        {/* <!-- Google Tag Manager --> */}
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	          })(window,document,'script','dataLayer','GTM-NZFLNVQ8');
          `}
        </Script>
        {/* <!-- End Google Tag Manager --> */}

        {/* <!--LeadSquared Tracking Code Start--> */}
        <Script id="lead-squared-1" type="text/javascript" src="https://web-in21.mxradon.com/t/Tracker.js" strategy="lazyOnload" />
        <Script id="lead-squared-2" type="text/javascript" strategy="lazyOnload">
          {`
            pidTracker('74994');
          `}
        </Script>
        {/* <!--LeadSquared Tracking Code End--> */}

        {/* <!-- Meta Pixel Code --> */}
        <Script id="meta-pixel-code-v2-1" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1218998886611437');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1218998886611437&ev=PageView&noscript=1" />
        </noscript>
        {/* <!-- End Meta Pixel Code --> */}

        {/* <!-- Clarity code --> */}
        {/* Removed on 03/03/2025 Mail @Vishwa */}
        {/* <Script id="clarity-code-1" type="text/javascript" strategy="beforeInteractive">
          {`       
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ov6keup092");
          `}
        </Script> */}
        {/* <!-- End Clarity code --> */}
      </head>

      <body className={`min-h-screen antialiased`}>
        <ReduxProvider>
          <ToastContainer stacked />
          <ClientLayout>{children}</ClientLayout>
        </ReduxProvider>

        <CookieConsentBanner />
      </body>
    </html>
  );
}
