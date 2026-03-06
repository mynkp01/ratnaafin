"use client";

import { useSearchParams } from "next/navigation";
import { memo, useEffect, useRef } from "react";
import Page from "../[slug]/page";

const ThankYou = () => {
  const searchParams = useSearchParams();
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const affClickId = searchParams.get("aff_click_id");

    if (affClickId && !hasTrackedRef.current) {
      console.log("Firing conversion pixel for aff_click_id:", affClickId);
      const trackingUrl = `https://prodigiousonline846.o18.click/p?m=3808&tid=${affClickId}`;

      const img = new Image();
      img.src = trackingUrl;
      hasTrackedRef.current = true;
    } else {
      console.log("No affiliate click ID found - this may be a direct conversion");
    }
  }, [searchParams]);

  return (
    <>
      <Page />
    </>
  );
};

export default memo(ThankYou);
