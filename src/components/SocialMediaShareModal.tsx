"use client";
import { showToast } from "@/utils/helper";
import { copyToClipboard } from "@/utils/helper.client";
import { Email, FacebookOutlined, Instagram, Twitter, WhatsApp } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Modal, Tooltip } from "@mui/material";
import { memo, useState } from "react";
import { EmailShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

function SocialMediaShareModal({ url, title, open, setOpen }) {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      const success = await copyToClipboard(url);
      if (success) {
        setCopied(true);
        showToast("success", "Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      } else {
        throw new Error("Copy failed");
      }
    } catch (error) {
      showToast("error", "Failed to copy link");
      console.error("Copy failed:", error);
    }
  };

  const handleInstagramShare = async () => {
    try {
      const success = await copyToClipboard();
      if (success) {
        showToast("success", "Content copied! Open Instagram to share");
      } else {
        throw new Error("Copy failed");
      }
    } catch (error) {
      showToast("error", "Failed to prepare content for Instagram");
      console.error("Instagram share failed:", error);
    }
  };

  const shareButtons = [
    {
      name: "Copy To Clipboard",
      icon: <ContentCopyIcon />,
      onClick: handleCopyToClipboard,
      tooltip: copied ? "Copied!" : "Copy to clipboard",
    },
    {
      name: "Facebook",
      component: FacebookShareButton,
      icon: <FacebookOutlined className="size-8 text-blue-600" />,
      props: { url, quote: title },
    },
    {
      name: "Twitter",
      component: TwitterShareButton,
      icon: <Twitter className="text-blue-100" />,
      props: { url, title },
    },
    {
      name: "WhatsApp",
      component: WhatsappShareButton,
      icon: <WhatsApp className="text-green-500" />,
      props: { url, title: title },
    },
    {
      name: "Email",
      component: EmailShareButton,
      icon: <Email className="text-red-500" />,
      props: { url, subject: title },
    },
    {
      name: "Instagram",
      icon: <Instagram className="text-pink-500 h-5 w-5" />,
      onClick: handleInstagramShare,
      props: { url, title },
    },
  ];

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="grid grid-cols-3 gap-4 text-black absolute top-1/2 left-1/2 w-[300px] items-center justify-center -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4 rounded-lg outline-none">
        {shareButtons.map((button) => (
          <Tooltip key={button.name} placement="top" title={button.tooltip || button.name}>
            <div className="flex flex-col items-center justify-center gap-2 text-center text-xs md:text-sm">
              {button.component ? (
                <button.component {...button.props} className="transform transition-transform hover:scale-110">
                  {button.icon}
                </button.component>
              ) : (
                <IconButton onClick={button.onClick} className="transform rounded-full p-2 transition-transform hover:scale-110">
                  {button.icon}
                </IconButton>
              )}
              <p>{button.name}</p>
            </div>
          </Tooltip>
        ))}
      </div>
    </Modal>
  );
}

export default memo(SocialMediaShareModal);
