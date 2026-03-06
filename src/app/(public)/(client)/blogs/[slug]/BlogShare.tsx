"use client";
import { FacebookIcon, LinkedinIcon } from "@/assets";
import { Tooltip } from "@mui/material";
import { memo } from "react";
import { FacebookShareButton, LinkedinShareButton } from "react-share";

const BlogShare = () => {
  const shareButtons = [
    {
      name: "Facebook",
      component: FacebookShareButton,
      icon: <FacebookIcon className="size-8 text-blue-600" />,
      props: { url: window.location.href, quote: "" },
    },
    {
      name: "Linkedin",
      component: LinkedinShareButton,
      icon: <LinkedinIcon className="size-8 text-blue-600" />,
      props: { url: window.location.href, quote: "" },
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <h5 className="uppercase font-semibold border-b pb-3 text-quinary-100">Share</h5>
      {shareButtons.map((button) => (
        <Tooltip key={button.name} placement="top" title={button.name}>
          <div className="flex w-fit items-center gap-2 text-center text-xs md:text-sm text-quinary-100">
            <button.component {...button.props} className="transform transition-transform hover:scale-110 ">
              {button.icon}
            </button.component>
            <p>{button.name}</p>
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default memo(BlogShare);
