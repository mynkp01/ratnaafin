"use client";

import { NotFoundImage } from "@/assets";
import { ROUTES } from "@/utils/Constant";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const NotFound = () => {
  return (
    <>
      <div>
        <div className="container mx-auto h-screen flex flex-col items-center px-4 justify-center gap-5">
          <div className="error">
            <Image loading="lazy" alt="not found image" className="object-cover" width={800} height={500} src={NotFoundImage?.src} />
          </div>
          <p className="text-quinary-100 font-bold">Sorry, we couldn’t find this page.</p>
          <Link className="bg-primary-400 xs:text-base text-xs text-white px-4 py-2 rounded-full" href={ROUTES.home}>
            Back to Homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default memo(NotFound);
