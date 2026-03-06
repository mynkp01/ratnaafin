import dynamic from "next/dynamic";
import { memo } from "react";
const BreadCrum = dynamic(() => import("@/components/BreadCrum"));
function Page() {
  return (
    <div className="flex flex-col gap-12 pt-12">
      <div className="container mx-auto 2xl:px-8 space-y-8 px-4">
        <div className="sm:block hidden">
          <BreadCrum />
        </div>
        <div className="flex flex-col gap-8 p-4 sm:p-8 bg-white rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-quinary-100">Disclaimer</h1>
          <ul className="flex flex-col gap-1 md:text-base text-sm list-inside text-tertiary-500 px-4">
            <li>
              Ratnaafin CAPITAL PRIVATE LIMITED (Ratnaafin/ COMPANY) retains copyright on all the text, contents, graphics and trademarks displayed on this
              site. All the text, graphics and trademarks displayed on this site are owned by Ratnaafin.
            </li>
            <li>
              The information on this site has been included in good faith and is for general purpose only and should not be relied upon for any specific
              purpose. The user shall not distribute text or graphics to others without the express written consent of the Company. The user shall also not,
              without Company’s prior permission, copy and distribute this information on any other server, or modify or reuse text or graphics on this or any
              another system.
            </li>
            <li>
              Although Ratnaafin tries to ensure that all information and recommendations, whether in relation to the products, services, offerings or otherwise
              (hereinafter “information”), provided as part of this website is correct at the time of inclusion on the web site, Ratnaafin does not guarantee
              the accuracy of the Information. The Company makes no representations or warranties as to the completeness or accuracy of Information. Certain
              links in this site connect to other Web Sites maintained by third parties over whom Ratnaafin has no control. Ratnaafin makes no representations
              as to the accuracy or any other aspect of information contained in such other Web Sites.
            </li>
            <li>
              Ratnaafin hereby disclaims all warranties and conditions with regard to this information, including all implied warranties and conditions of
              merchantability, fitness for any particular purpose, title and non-infringement. In no event will Ratnaafin, its related partnerships or
              corporations, or the partners, agents or employees thereof be liable for any decision made by the user and/or site visitor for any inference or
              action taken in reliance on the information provided in this site or for any consequential, special or similar damages. Applicable Law and
              Jurisdiction of this Disclaimer are governed by and to be interpreted in accordance with laws of India, without regard to the choice or conflicts
              of law provisions of any jurisdiction. The user/site visitor agrees that in the event of any dispute arising in relation to this Disclaimer or any
              dispute arising in relation to the web site whether in contract or tort or otherwise, to submit to the jurisdiction of the courts located at
              Ahmedabad (Gujarat) (India) only for the resolution of all such disputes.
            </li>
            <li>
              Except for the historical information herein, statement in this website, which includes words or phrases such as “will”, “aim”, “will likely
              result”, “would”, “believe”, “may”, “expect”, “will continue”, “anticipate”, “estimate”, “intend”, “plan”, “contemplate”, “seek to “, “future”,
              “objective”, “goal”, “likely”, “project”, “should”, “potential”, “will pursue”, and similar expressions or variations of such expressions may
              constitute “forward-looking statements”. These forward-looking statements involve a number of risks, uncertainties and other factors that could
              cause actual results to differ materially from those suggested by the forward-looking statements. These risks and uncertainties include, but are
              not limited to our liability to successfully implement our strategy, our growth and expansion plans, obtain regulatory approvals, our provisioning
              policies, technological changes, investment and business income, cash flow projections, our exposure to the market risks as well as other risks.
              The company does not undertake any obligation to update forward-looking statements to reflect events or circumstances after the date thereof.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default memo(Page);
