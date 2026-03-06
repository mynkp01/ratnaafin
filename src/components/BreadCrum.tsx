"use client";
import { ROUTES } from "@/utils/Constant";
import { customDecodeURIComponent } from "@/utils/helper";
import { BreadcrumbJsonLd } from "next-seo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo, useEffect, useState } from "react";

interface BreadCrumProps {
  homeElement?: string;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  separator?: string;
}

const Comp = ({ setBreadCrumbData, index, displayText, href, changeColor, pathNames, paths, listClasses, activeClasses, separator }) => {
  useEffect(() => {
    const breadCrumbItem = {
      position: index + 2,
      name: customDecodeURIComponent(displayText),
      item: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${href}`,
    };
    setBreadCrumbData((prevData) => [...prevData, breadCrumbItem]);
  }, [href]);

  return (
    <React.Fragment key={index}>
      <li
        className={`mx-1 text-nowrap ${
          !changeColor?.includes(pathNames[pathNames?.length - 1]) && !paths?.includes("/blogs/") ? "text-white" : "text-black"
        } hover:underline ${listClasses} ${paths === href ? activeClasses : ""}`}
      >
        <Link href={href} className="capitalize">
          {customDecodeURIComponent(displayText)}
        </Link>
      </li>
      {pathNames?.length !== index + 1 && <span className="mx-1 text-white">{separator}</span>}
    </React.Fragment>
  );
};

const BreadCrum = ({ homeElement = "Home", containerClasses, listClasses, activeClasses, separator = ">" }: BreadCrumProps) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  const ignorePaths = ["loans-backed-by-property", "supply-chain-finance"];
  const changeColor = ["possible-hai", "privacy-policy", "terms-and-conditions", "disclaimer"];

  const [breadCrumbData, setBreadCrumbData] = useState([
    {
      position: 1,
      name: "Homepage",
      item: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
    },
  ]);

  const cleanSlug = (slug: string) => {
    return slug?.replace(/-[0-9a-fA-F]{24}$/, "");
  };

  return (
    <>
      <BreadcrumbJsonLd items={breadCrumbData} />

      <div>
        <ul className={`text-14-700 flex flex-wrap !font-normal ${containerClasses}`}>
          <li
            className={`mx-1 ${
              !changeColor?.includes(pathNames[pathNames?.length - 1]) && !paths?.includes("/blogs/") ? "text-white" : "text-black"
            } hover:underline ${listClasses}`}
          >
            <Link href={ROUTES.home}>{homeElement}</Link>
          </li>
          {pathNames?.length > 0 && (
            <span className={`mx-1 ${!changeColor?.includes(pathNames[pathNames?.length - 1]) && !paths?.includes("/blogs/") ? "text-white" : "text-black"}`}>
              {separator}
            </span>
          )}

          {pathNames?.map((link, index) => {
            const href = `/${pathNames.slice(0, index + 1).join("/")}`;
            const itemLink = link[0].toUpperCase() + link.slice(1, link?.length);

            const displayText = index === pathNames?.length - 1 ? cleanSlug(itemLink) : itemLink;

            return ignorePaths.includes(link) ? null : (
              <Comp
                key={index}
                setBreadCrumbData={setBreadCrumbData}
                index={index}
                displayText={displayText}
                href={href}
                changeColor={changeColor}
                pathNames={pathNames}
                paths={paths}
                listClasses={listClasses}
                activeClasses={activeClasses}
                separator={separator}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default memo(BreadCrum);
