import dynamic from "next/dynamic";
import { memo } from "react";
const BreadCrum = dynamic(() => import("@/components/BreadCrum"));

function Page() {
  return (
    <div className="flex flex-col gap-12 pt-12">
      <div className="container mx-auto 2xl:px-8 px-4 space-y-8">
        <div className="sm:block hidden">
          <BreadCrum />
        </div>
        <div className="flex flex-col gap-8 p-4 sm:p-8 bg-white rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-quinary-100">Terms & Conditions</h1>
          <div className="flex flex-col gap-4">
            <p className="lg:text-lg font-medium text-quinary-100">
              VISITORS TO THIS WEBSITE ARE BOUND BY THE FOLLOWING TERMS AND CONDITIONS (“TERMS”). SO, PLEASE READ THE TERMS CAREFULLY BEFORE CONTINUING TO USE
              THIS SITE. IF YOU DO NOT AGREE WITH ANY OF THESE TERMS, PLEASE DO NOT USE THIS SITE.
            </p>
            <div className="space-y-3">
              <p className="text-base text-secondary-600 font-medium">The use of this website is subject to the following terms of use:</p>
              <ul className="flex flex-col gap-2 list-disc md:text-base text-sm list-inside text-tertiary-500 px-4">
                <li>
                  The content and information available on the Pages of this website is for your general information and use only. It is subject to change,
                  updating revision, verification and amendment without notice and such information may change materially.
                </li>
                <li>
                  This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, personal information may be stored by us for
                  use by third parties.
                </li>
                <li>
                  Neither Ratnaafin Capital Private Limited (RCPL) nor any third parties provide any warranty or guarantee as to the accuracy, timeliness,
                  performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You
                  acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such
                  inaccuracies or errors to the fullest extent permitted by law.
                </li>
                <li>
                  Your use of any information or materials on this website is entirely at your own risk, for which RCPL shall not be liable. It shall be your
                  own responsibility to ensure that any products, services or information available through this website meet your specific requirements.
                </li>
                <li>
                  This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look,
                  appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and
                  conditions.
                </li>
                <li>Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offence.</li>
                <li>
                  The information available on the Website do not constitute an offer, invitation, advertisement, promotion, or a solicitation of any product or
                  services of <b>RCPL</b> and is not intended to create any rights or obligations.
                </li>
                <li>
                  From time to time this website may also include links to other websites. These links are provided for your convenience to provide further
                  information. They do not signify that RCPL endorse the website(s). RCPL has no responsibility for the content of the linked website(s).
                </li>
                <li>
                  Applicable Law and Jurisdiction of this website are governed by and to be interpreted in accordance with laws of India, without regard to the
                  choice or conflicts of law provisions of any jurisdiction. The user/site visitor agrees that in the event of any dispute arising in relation
                  to this Disclaimer or any dispute arising in relation to the web site whether in contract or tort or otherwise, to submit to the jurisdiction
                  of the courts located at Ahmedabad only for the resolution of all such disputes.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Page);
