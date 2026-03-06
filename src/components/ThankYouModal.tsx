"use client";
import { ThankYouBg, ThankYouIcon } from "@/assets";
import { selectThankYouModal, setThankYouModal } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { Modal } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useSelector } from "react-redux";

function ThankYouModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const thankYouModal = useSelector(selectThankYouModal);
  return (
    <div>
      <Modal open={thankYouModal?.open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <div className="absolute top-1/2 left-1/2 w-[320px] h-[350px] xs:w-[400px] xs:h-[380px] md:min-w-[650px] md:min-h-[530px] -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-2xl outline-none">
          <div id="modal-modal-title">
            <div className="relative w-full h-full">
              <Image loading="lazy" src={ThankYouBg} alt="ThankYouBg" className="w-full h-full !object-cover" />
            </div>
            <div className="flex flex-col gap-10 sm:gap-16 items-center absolute inset-0 justify-center p-5">
              <ThankYouIcon />
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1 items-center">
                  <h3 className="font-semibold text-3xl">Thank You!</h3>
                  <p className="text-center text-sm xs:text-base text-tertiary-500 md:w-10/12">
                    {`We have received your ${thankYouModal?.formType} request. We will reach out to you soon!`}
                  </p>
                </div>
                <div className="w-full flex justify-center">
                  <button
                    onClick={() => {
                      if (thankYouModal?.formType === "apply loan" && thankYouModal?.url) router.replace(thankYouModal?.url, undefined);
                      dispatch(setThankYouModal({ open: false, formType: "", url: "" }));
                    }}
                    className="relative rounded-full px-8 py-2 w-fit text-xs xs:text-sm bg-primary-400 text-white overflow-hidden transition-all before:absolute before:inset-y-0 before:left-0 before:w-0 before:bg-gradient-to-r before:from-primary-400 before:to-secondary-600 before:transition-all before:duration-500 hover:before:w-full"
                  >
                    <span className="relative z-10">Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default memo(ThankYouModal);
