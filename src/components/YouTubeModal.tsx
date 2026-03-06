"use client";
import { selectShowYouTubeIFrame, setShowYouTubeIFrame } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { Modal, Tooltip } from "@mui/material";
import { memo } from "react";
import { useSelector } from "react-redux";

const YouTubeModal = () => {
  const dispatch = useAppDispatch();
  const showYouTubeIFrame = useSelector(selectShowYouTubeIFrame);

  return (
    <Modal
      open={showYouTubeIFrame?.show}
      onClose={() => dispatch(setShowYouTubeIFrame({ show: false, video: null }))}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute overflow-y-auto top-1/2 left-1/2 w-[320px] h-fit xs:w-[400px] md:min-w-[650px] md:min-h-fit -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-2xl outline-none">
        <div id="modal-modal-title" className="p-4 md:p-6">
          <div className="flex flex-col gap-2 sm:gap-4">
            <div className="flex justify-between border-b pb-2">
              <p className="text-quinary-100 font-bold text-ellipsis">{showYouTubeIFrame?.video?.keyword}</p>
              <button
                onClick={() => dispatch(setShowYouTubeIFrame({ show: false, video: null }))}
                className="text-quinary-100 focus:outline-none"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div
              className="h-fit aspect-video w-full"
              dangerouslySetInnerHTML={{
                __html: showYouTubeIFrame?.video?.iframe
                  ?.replace(/width="[^"]*"/gi, "width='100%'")
                  .replace(/height="[^"]*"/gi, "height='100%'")
                  .replace(/src="([^"]+)"/gi, (match, src) => {
                    const hasQuery = src.includes("?");
                    const newSrc = src + (hasQuery ? "&" : "?") + "autoplay=1&mute=1";
                    return `src="${newSrc}"`;
                  }),
              }}
            />
            <div>
              <Tooltip title={showYouTubeIFrame?.video?.link}>
                <p className="font-medium truncate line-clamp-3 whitespace-normal">{showYouTubeIFrame?.video?.link}</p>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default memo(YouTubeModal);
