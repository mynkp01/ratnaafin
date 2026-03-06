import { EMAILS } from "@/utils/Constant";
import dynamic from "next/dynamic";
import Link from "next/link";
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
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-quinary-100">Privacy Policy</h3>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Scope</h3>
            <p className="text-quinary-100">
              The Data Privacy Policy sets out the requirements for ensuring that Ratnaafin Capital Private Limited (RCPL/we) collect, use, retain and disclose
              personal information in a fair, transparent and secured way. This Data Privacy Policy is applicable to the personal information (including
              sensitive personal data or information) of:
            </p>
            <ul className="flex flex-col gap-2 list-disc md:text-base text-sm list-inside text-tertiary-500 px-4">
              <li>RCPL customers,</li>
              <li>Users of the website, mobile applications (if any), and social media accounts of RCPL,</li>
              <li>Employees or temporary staff,</li>
              <li>Contractors,</li>
              <li>Third party vendors, or</li>
              <li>Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offence.</li>
              <li>Any other persons that are associated with RCPL for any business-related transactions /</li>
            </ul>
            <p className="text-quinary-100">
              This Data Privacy Policy is not applicable to independent data held by third-parties, but will continue to be applicable to:
            </p>
            <ul className="flex flex-col gap-2 list-disc md:text-base text-sm list-inside text-tertiary-500 px-4">
              <li>Personal information collected or processed by third parties on behalf of RCPL.</li>
              <li>Personal information of third-parties collected by</li>
            </ul>
            <p className="text-quinary-100">
              By accessing or using this website or services provided by RCPL, you agree to be bound by the terms described herein and all the terms
              incorporated by reference. If you do not agree to all of these terms, do not use this website or services provided by RCPL.
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Objective</h3>
            <p className="text-quinary-100">
              This Data Privacy Policy provides guidance on processing of personal information, which includes, but is not limited to, collecting, using,
              retaining/storing, accessing and/or disclosing such information by RCPL as often as is necessary. RCPL is committed in respecting the individual’s
              privacy rights and expectations and in protecting the individual’s personal information collected by RCPL from unauthorized access, use,
              retention/storage and/or disclosure. Meeting this commitment is a primary management objective and collective responsibility of all RCPL employees
              as well as third parties conducting business with or on behalf of RCPL.
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Responsibility for Compliance</h3>
            <p className="text-quinary-100">
              The Data Privacy Policy contained in this document has been established to cover information and information systems such as software, hardware,
              firmware, storage, transmission media and computer networks (collectively referred to as ‘Information Assets’) used by RCPL. RCPL employees,
              senior professionals, and third-party vendor/contractor etc., shall ensure compliance with the obligations outlined in this policy document.
              Compliance with this Data Privacy Policy shall be ensured by:
            </p>
            <ul className="flex flex-col gap-2 list-disc md:text-base text-sm list-inside text-tertiary-500 px-4">
              <li>All RCPL employees and temporary staff who have access to personal information as part of their business activities</li>
              <li>Senior professionals, who are accountable for ensuring that appropriate privacy controls are in place within their business function</li>
              <li>
                Third party vendors and contractors or any outsourcing partners, who perform services for or on behalf of RCPL and are expected to embrace
                standards of conduct consistent with the principles of this Data Privacy
              </li>
            </ul>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Consequence Management & Non-Compliance</h3>
            <p className="text-quinary-100">
              Any violation of this Data Privacy Policy is subject to disciplinary action. The specific disciplinary action depends upon the nature of the
              violation. Violations will be handled as per the existing HR processes and could range from a verbal reprimand to termination of
              employment/contract and/or legal action.
            </p>
            <p className="text-quinary-100">
              If a department or function is unable to comply with any requirements detailed within this Data Privacy Policy, an exception shall be obtained.
              Such exceptions shall be documented, indicating the rationale for the exception and the related risks.
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Policy statement</h3>
            <p className="text-quinary-100">
              All RCPL employees shall comply with Indian IT Act of 2000 (including IT Amendment Act of 2008 and IT Rules of 2011) for privacy and protection of
              personal information and sensitive personal data or information of customers, employees, contractors and third party vendors or any other persons
              or entities that are associated with RCPL for any business related transactions / communications – verbal or implied.
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Key Data Privacy Principles</h3>
            <p className="text-quinary-100">
              The Data Privacy Policy represents the minimum standards that RCPL has set with respect to data privacy. It aligns with (and in some cases
              exceeds) the requirements of applicable laws and regulations (i.e. Indian IT Act of 2000, IT Amendment Act of 2008 and IT Rules of 2011).
            </p>
            <p className="text-quinary-100">
              Personal information refers to any information that relates to a natural person, which, either directly or indirectly, in combination with other
              information available or likely to be available with RCPL, can identify such person. Personal information includes sensitive personal data or
              information. The personal information (including sensitive personal data or information) collected by RCPL includes:
            </p>
            <ul className="flex flex-col gap-2 list-disc md:text-base text-sm list-inside text-tertiary-500 px-4">
              <li>Name</li>
              <li>PAN card number</li>
              <li>Driver’s license number</li>
              <li>Bank Account number</li>
              <li>Passport number</li>
              <li>Email Address</li>
              <li>Aadhaar Card</li>
              <li>Account statement</li>
              <li>
                Any other personal information (including sensitive personal data or information) received by RCPL for processing, stored or processed by RCPL
                under lawful contract or
              </li>
            </ul>
            <p className="text-quinary-100">
              RCPL values the personal information entrusted to it and the NBFC is committed to collecting, using, retaining and disclosing personal information
              in a fair, transparent and secure way by adhering to the following key principles:
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Collection Limitation:</h3>
            <p className="text-quinary-100">
              Personal information shall be collected by fair, lawful and transparent means. RCPL shall be open with individuals about how the NBFC will use
              their personal information, with whom it will be shared and where it may be sent.
            </p>
            <ul className="flex flex-col gap-2 list-disc md:text-base text-sm list-inside text-tertiary-500 px-4">
              <li>
                Consent shall be taken in writing or electronically from the provider of the sensitive personal data or information regarding purpose of usage
                before collection of such information.
              </li>
              <li>
                While collecting the personal information directly from the concerned person, RCPL shall take reasonable steps to ensure that the provider of
                information is aware of the following aspects:
              </li>
            </ul>
            <ul className="flex flex-col gap-2 list-disc md:text-base text-sm list-inside text-tertiary-500 px-8">
              <li>The fact that personal information is being collected</li>
              <li>The purpose for collecting such information</li>
              <li>The intended recipients of such information</li>
              <li>The name and address of entities who are collecting and retaining such information</li>
              <li>
                The provider of information shall, at any time while availing the services or otherwise, also have an option to withdraw its consent given
                earlier to RCPL. Such withdrawal of the consent shall be sent in writing to RCPL on Communication address at 2nd and 3rd Floor, The Ridge,
                Opposite Novotel, Iscon Char Rasta, Ahmedabad, Gujarat - 380060 or through email on{" "}
                <Link href={`mailto:${EMAILS.GRIEVANCE}`} className="text-secondary-600">
                  {EMAILS.GRIEVANCE}
                </Link>{" "}
                In case the provider of information withdraws his / her consent in relation to personal information, RCPL shall evaluate the request and take
                appropriate If an individual does not provide their personal information or subsequently, withdraws consent in relation to personal information,
                RCPL shall have the option not to provide services for which the said information was sought. RCPL may retain some data to meet its obligations
                under applicable law.
              </li>
            </ul>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Data Minimization:</h3>
            <p className="text-quinary-100">
              Only personal information required for authorized business activities shall be collected from the information provider. Personal information shall
              not be made available to anyone (including internal staff) who is not authorized or does not have a business need to know the information.
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Purpose of collection:</h3>
            <p className="text-quinary-100">
              As per regulatory requirement, RCPL collect personal information for performing KYC of the customer, bank account statements are collected to
              establish credit worthiness of the customer, bank account details are collected for collection of dues/loan repayment. Personal Information of
              employees is collected for the purposes of background verification, salary payment, insurance etc.
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Use Limitation:</h3>
            <p className="text-quinary-100">
              The personal information shall be used for the purpose for which it has been collected. The privacy risks shall be taken into consideration,
              before the collection, use, retention, or disclosure of personal information, such as in a new system or as part of a project.
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Security:</h3>
            <p className="text-quinary-100">
              There shall be adequate protection for the personal information collected, used, retained and disclosed to support RCPL business activities by
              following the relevant usage, technical and organizational policies, standards and processes:
            </p>
            <p className="text-quinary-100">
              RCPL has comprehensive documented information security program and information security policies that contain managerial, technical, operational
              and physical security control measures.
            </p>
            <p className="text-quinary-100">
              However, RCPL will not be responsible for any loss, unauthorized access or any harm caused to the information provider by any misuse of his or her
              personal information, unless it is a direct and foreseeable consequence of negligence and non-compliance on the part of RCPL only. The information
              provider hereby acknowledges that RCPL will not be responsible, in particular, for any third party action or action on the part of the information
              provider leading to loss, damage or harm to such information provider or any other person.
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Access, Correction and Update: </h3>
            <p className="text-quinary-100">
              Processes shall be defined to enable the providers of information, as and when requested by them, to review the information they had provided and
              ensure that any personal information or sensitive personal data or information found to be inaccurate or deficient shall be corrected or amended
              as feasible. RCPL shall not be responsible for the authenticity of the personal information or sensitive personal data or information supplied by
              the provider of information. RCPL shall ensure that the data provided by customers is correct through verification of documents submitted by them
              as per process laid out in the ‘AML / KYC Policy’.
            </p>
            <p className="text-quinary-100">
              To review, correct or update their personal information, customers can write to us at-{" "}
              <Link href={`mailto:${EMAILS.GRIEVANCE}`} className="text-secondary-600">
                {EMAILS.GRIEVANCE}
              </Link>{" "}
              or reach out to us at our Communication address 2nd and 3rd Floor, The Ridge, Opposite Novotel, Iscon Char Rasta, Ahmedabad, Gujarat - 380060
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Retention:</h3>
            <p className="text-quinary-100">
              Sensitive personal data or information shall be retained no longer than required, to support a specific business activity or legal or regulatory
              requirement.
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Disclosure:</h3>
            <p className="text-quinary-100">
              The personal information (including sensitive personal data or information) collected or stored by RCPL, may be disclosed to comply with
              applicable law, directions from Government agencies mandated under law for prevention and investigation of offences, or to comply with an order
              issued by a competent court.
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Transfer of Personal Information to Third Parties: </h3>
            <p className="text-quinary-100">
              Adequate protection mechanism shall be provided for personal information in case it is transferred outside RCPL network.
            </p>
            <p className="text-quinary-100">
              RCPL may transfer sensitive personal data or information to any other entity or person located in India or any other country that ensures the same
              level of data protection that is adhered to by RCPL under the IT Rules of 2011. Transfer of information shall be allowed only if it is necessary
              for the performance of lawful contract entered into between RCPL or any person on its behalf and the information provider or where the information
              provider has consented to such transfer.
            </p>
            <p className="text-quinary-100">
              Personal information, including sensitive personal data or information, may be disclosed or transferred to insurance providers, credit bureau,
              verification agencies, collection partner, Regulatory & legal authorities (Credit information agencies, law enforcement agencies, judicial
              agencies), affiliates and business partner
            </p>
            <p className="text-quinary-100">
              Reasonable due diligence activities shall be conducted to ensure that the third party has appropriate security & privacy controls in place prior
              to sharing of any personal information (including sensitive personal data or information)
            </p>
            <p className="text-quinary-100">
              Marketing and Promotional Activities: Marketing and promotional communications shall be sent to providers of information / customers only after
              obtaining required consent from them in adherence to obligations under applicable law.
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Grievance Officer</h3>
            <p className="text-quinary-100">
              The grievances or discrepancies reported by provider of information with respect to processing of personal information shall be addressed in a
              time-bound manner by the designated ‘Grievance Officer ’. Customers can write to us at{" "}
              <Link href={`mailto:${EMAILS.GRIEVANCE}`} className="text-secondary-600">
                {EMAILS.GRIEVANCE}
              </Link>{" "}
              or reach out to us on our Communication address on 2nd and 3rd Floor, The Ridge, Opposite Novotel, Iscon Char Rasta, Ahmedabad, Gujarat - 380060
            </p>
            <p className="text-quinary-100">
              <b>Grievance Officer Details:</b> Mr. Bhavesh Patel
            </p>
            <p className="text-quinary-100">
              <b>Communication Address:</b> 2nd and 3rd Floor, The Ridge, Opposite Novotel, Iscon Char Rasta, Ahmedabad, Gujarat - 380060
            </p>
            <p className="text-quinary-100">
              <b>Email:</b>{" "}
              <Link href={`mailto:${EMAILS.GRIEVANCE}`} className="text-secondary-600">
                {EMAILS.GRIEVANCE}
              </Link>{" "}
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Third Party Websites and Services</h3>
            <p className="text-quinary-100">
              RCPL’s website and services may contain links to third party services, and give the user the ability to access such third-party websites,
              products, and services. Customer / borrower to proceed to use such third party website or service at r own risk. RCPL will not be held liable for
              any outcome or harm arising as a result of such use of such third party websites or services. Please read the privacy policies of any third party
              before proceeding to use their websites, products, or services.
            </p>
            <h3 className="text-xl sm:text-3xl font-bold text-secondary-600">Changes to this Data Privacy Policy</h3>
            <p className="text-quinary-100">
              RCPL may periodically revise or update this Data Privacy Policy. Continued use of RCPL’s website and / or services after the effective date of the
              Data Privacy Policy means that the user accepts the revised Data Privacy Policy. If the user does not agree with any such revised terms, please
              refrain from using RCPL’s website and / or services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Page);
