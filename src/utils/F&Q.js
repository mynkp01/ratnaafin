import {
  FaqImage,
  FaqImage1,
  FaqImage10,
  FaqImage11,
  FaqImage12,
  FaqImage13,
  FaqImage2,
  FaqImage3,
  FaqImage4,
  FaqImage5,
  FaqImage6,
  FaqImage7,
  FaqImage8,
  FaqImage9,
} from "@/assets";

export const business_loan_faq = {
  image: FaqImage.src,
  alt: "Unsecured business loan, ahmedabad",
  data: [
    {
      _id: 0,
      question: "Do I have to visit a physical branch to apply for a Ratnaafin Business Loan?",
      answer: `If you wish to apply for our Business Loan, you can either choose to visit our branch or apply online instantly in just a few simple steps with minimal documentation.`,
    },
    {
      _id: 1,
      question: "Can I apply for a Business Loan online?",
      answer: [
        "Yes, you can easily apply online! Follow these simple steps:",
        `<ul style= "display: grid; gap: 5px; list-style-type: decimal; margin-left: 35px;">
                    <li><a href=${process.env.NEXT_PUBLIC_FRONTEND_URL}/#apply-now style = "color: #046EB6;">Visit the website</a></li>
                    <li style = "color: #046EB6;">Fill in the required details on the loan application form.</li>
                    <li style = "color: #046EB6;">Click on Submit</li>
                </ul>`,
      ],
    },
    {
      _id: 2,
      question: "Do I need collateral to apply for a Business Loan?",
      answer:
        "No collateral needed! Our Business Loan is an unsecured offering. You only need to meet the simple Business Loan eligibility criteria to qualify for business financing.",
    },
    {
      _id: 3,
      question: "How much processing fee is applicable on the Business Loan?",
      answer: "A nominal up to 2% Processing Fee is applicable on the sanctioned loan amount",
    },
    {
      _id: 4,
      question: "What is the maximum loan amount that I can avail?",
      answer: "Ratnaafin's Business Loan let's you avail up to ₹ 50,00,000 to fund your business needs",
    },
  ],
};

export const loan_against_property_faq = {
  image: FaqImage1.src,
  alt: "loan against property, loan against property interest rate",
  data: [
    {
      _id: 0,
      question: "What is a Loan Against Property (LAP)?",
      answer: `A LAP allows you to borrow money by pledging your residential, commercial, or industrial property as collateral. It offers high loan amounts at relatively lower interest rates since it's a secured loan.`,
    },
    {
      _id: 1,
      question: "What types of properties are accepted?",
      answer: "We accept self-owned residential, commercial, and industrial properties. Properties under a gift deed or sale deed are also considered.",
    },
    {
      _id: 2,
      question: "Do I need to show income proof?",
      answer:
        "Yes, but we also assess liquid income or informal cash flows. This makes it easier for self-employed individuals or business owners with limited formal documents to qualify.",
    },
    {
      _id: 3,
      question: "How much loan can I get against my property?",
      answer: "You can typically get up to 70% of your property’s market value, depending on the location, age, and legal status of the asset.",
    },
    {
      _id: 4,
      question: "Can I repay the loan early?",
      answer:
        "Yes, foreclosure and part-prepayments are allowed. Charges may apply depending on the loan terms. We recommend checking your sanction letter for specifics.",
    },
  ],
};

export const commercial_solar_loan_faq = {
  image: FaqImage2.src,
  alt: "Industrial Solar Loans",
  data: [
    {
      _id: 0,
      question: "Is commercial solar financing better than paying upfront?",
      answer: `Yes, for most businesses. Financing preserves working capital while electricity savings help repay the loan, improving cash flow efficiency.`,
    },
    {
      _id: 1,
      question: "Who should opt for solar financing for businesses?",
      answer: "MSMEs, factories, and growing businesses that want to reduce power costs without blocking capital in upfront investment.",
    },
    {
      _id: 2,
      question: "How do I choose the right commercial solar financing option?",
      answer: "Compare interest rate, tenure, collateral requirement, EMI structure, and alignment with projected energy savings.",
    },
    {
      _id: 3,
      question: "Who can apply for a solar commercial loan?",
      answer: "Registered businesses such as Pvt Ltd companies, LLPs, partnerships, and MSMEs with stable financials.",
    },
    {
      _id: 4,
      question: "What can a solar loan for commercial use be used for?",
      answer: "It covers panels, inverters, installation, electrical setup, and related project costs.",
    },
    {
      _id: 5,
      question: "What is the eligibility criteria for commercial solar financing?",
      answer: "Valid business registration, financial stability, good credit profile, and a viable solar project plan.",
    },
    {
      _id: 6,
      question: "Is collateral required for commercial solar loans?",
      answer: "Not always. Smaller loans may be collateral-free, while higher amounts may require security or guarantees.",
    },
    {
      _id: 7,
      question: "Are commercial solar loans tax-beneficial for businesses?",
      answer: "Yes. Businesses can claim depreciation benefits and deduct interest as a business expense.",
    },
  ],
};

export const residential_solar_loan_faq = {
  image: FaqImage3.src,
  alt: "Residential Solar Loan in India",
  data: [
    {
      _id: 0,
      question: "What are loans for solar installation in India?",
      answer: `Loans for solar installation in India are financing solutions that help individuals, businesses, and MSMEs install solar panels without paying the full cost upfront. The loan covers equipment and installation costs, and repayment is done through affordable EMIs over a fixed tenure.`,
    },
    {
      _id: 1,
      question: "How can I apply for a loan for solar panel installation?",
      answer:
        "You can apply through NBFCs, banks, or specialized solar financing companies. The process typically includes submitting KYC documents, income proof, property details (for rooftop systems), and a quotation from a solar vendor. Many lenders now offer digital applications with quick approvals.",
    },
    {
      _id: 2,
      question: "What is a solar loan in India and who is eligible?",
      answer:
        "A solar loan is a financing product designed to fund rooftop or ground-mounted solar systems. Salaried individuals, self-employed professionals, homeowners, MSMEs, and commercial property owners with stable income and acceptable credit history are generally eligible.",
    },
    {
      _id: 3,
      question: "What is a solar rooftop system loan?",
      answer:
        "A solar rooftop system loan is specifically designed to finance rooftop solar panel installations for homes, factories, or commercial buildings. It usually covers panels, inverters, mounting structures, and installation costs.",
    },
    {
      _id: 4,
      question: "What are residential solar financing companies?",
      answer:
        "Residential solar financing companies are banks, NBFCs, and fintech lenders that offer dedicated loans for home solar installations. They provide structured EMI options, flexible tenure, and sometimes partner directly with solar EPC vendors.",
    },
    {
      _id: 5,
      question: "Can I take a personal loan for solar panels?",
      answer:
        "Yes, you can take a personal loan for solar panels. However, dedicated solar loans often offer better interest rates and longer tenures compared to unsecured personal loans.",
    },
    {
      _id: 6,
      question: "What are the best solar financing options for homeowners?",
      answer:
        "Homeowners can choose from secured solar loans, home improvement loans, green energy loans, or personal loans. Subsidy-linked rooftop solar loans and EMI plans aligned with expected electricity savings are often the most cost-effective options.",
    },
    {
      _id: 7,
      question: "What is the subsidy for solar farms in India?",
      answer:
        "Large-scale solar farms generally do not receive direct capital subsidies. However, developers may benefit from government schemes, viability gap funding, or state-level incentives depending on the project size and policy framework.",
    },
    {
      _id: 8,
      question: "Does solar financing reduce electricity bills?",
      answer:
        "Yes. Solar financing enables you to install a system that generates your own electricity, significantly reducing monthly power bills. Over time, the savings can offset EMI payments and improve long-term cash flow.",
    },
  ],
};

export const machinery_loan_faq = {
  image: FaqImage4.src,
  alt: "msme machinery loan",
  data: [
    {
      _id: 0,
      question: "What is a Machinery Loan from Ratnaafin?",
      answer: `It's a financial product designed to help businesses acquire new or used machinery and equipment, enhancing operational efficiency and productivity.`,
    },
    {
      _id: 1,
      question: "Who can apply for this loan?",
      answer:
        "MSMEs, manufacturers, healthcare providers, and other businesses with at least 2 years of operational history and a valid equipment purchase requirement.",
    },
    {
      _id: 2,
      question: "What types of machinery can be financed?",
      answer:
        "Various machinery types, including manufacturing equipment, medical devices, construction machinery, and more, based on the business's operational needs.",
    },
    {
      _id: 3,
      question: "Is collateral required for the loan?",
      answer: "No additional collateral is required; the machinery being financed typically serves as the primary security.",
    },
    {
      _id: 4,
      question: "How long does it take to process the loan?",
      answer: "Upon submission of complete documentation, the loan can be processed and disbursed within 48<sup>*</sup> hours.",
    },
    {
      _id: 5,
      question: "Can I prepay or foreclose the loan?",
      answer: "Yes, prepayment or foreclosure is allowed as per the terms mentioned in the loan agreement.",
    },
  ],
};

export const home_loan_faq = {
  image: FaqImage5.src,
  alt: "how do i apply for a home loan, home loan documents",
  data: [
    {
      _id: 0,
      question: "Who is eligible for a Ratnaafin Home Loan?",
      answer: `Both salaried individuals (with 2+ years of employment) and self-employed business owners (with 3+ years in business) can apply. Ratnaafin supports both formal and cash-based income profiles.`,
    },
    {
      _id: 1,
      question: "Can I apply if my income is primarily in cash or not formally documented?",
      answer: "Yes. Ratnaafin offers a liquid income-based approach and surrogate programs for self-employed borrowers without formal financials.",
    },
    {
      _id: 2,
      question: "How much loan can I get and for what property types?",
      answer:
        "Loans up to ₹75 Lakhs are available for ready, resale, or under-construction properties. Final amount depends on your income and property value.",
    },
    {
      _id: 3,
      question: "Can I transfer my existing home loan to Ratnaafin?",
      answer: "Yes, we offer competitive balance transfer options along with top-up loans for additional funding requirements.",
    },
    {
      _id: 4,
      question: "How quickly can I get a loan approved?",
      answer: "You can receive an in-principle approval within days. With complete documentation, loan disbursal generally takes 5–7 working days.",
    },
    {
      _id: 5,
      question: "Are there any foreclosure or prepayment charges?",
      answer: "Foreclosure is allowed as per policy. Floating rate loans have zero prepayment charges; fixed rate loans may attract a nominal fee.",
    },
  ],
};

export const working_capital_loan_faq = {
  image: FaqImage6.src,
  alt: "flexible working capital loans",
  data: [
    {
      _id: 0,
      question: "How to apply for working capital loan?",
      answer: `Getting a working capital loan is easy and hassle-free. Fill out the basic application form, submit KYC and business documents, and select the loan amount and tenure that suits your needs. It takes only a few days for the loan to be processed after verification. Get working capital support for your business now with Ratnaafin.`,
    },
    {
      _id: 1,
      question: "How is working capital loan amount determined?",
      answer: `It depends on several factors, including the revenue of the business, the cash flow of the business, the credit history of the business, and the financial documents of the business. You are also assessed by lenders based on your repayment capacity and the nature of your company. With Ratnaafin, you can receive a working capital loan offer tailored to your specific business needs.`,
    },
    {
      _id: 2,
      question: "How do working capital loans work?",
      answer: `Working capital loans help you manage your business's day-to-day operations, such as paying salaries, buying inventory, or handling bills. As a result, you receive a lump sum or a credit limit that you repay in EMIs or over a longer time.`,
    },
    {
      _id: 3,
      question: "How to get working capital loan?",
      answer: `Working capital loans require a registered business, a steady revenue stream, and the necessary documentation, such as financial statements, bank records, and proof of identity. Most NBFCs and fintech lenders have a quick approval process that is largely paperless.`,
    },
    {
      _id: 4,
      question: "What is the eligibility criteria for Ratnaafin Working Demand Loan?",
      answer: `A business must be an MSME such as a proprietorship, partnership, LLP, or private limited company with at least two years of operational history to be eligible for the Ratnaafin Working Capital Demand Loan. You must also have a good credit profile and valid financial documents, such as bank statements and income proofs. Give your business the working capital it needs to grow with Ratnaafin.`,
    },
    {
      _id: 5,
      question: "Can I foreclose the loan early?",
      answer: `Yes, prepayment options are available as per sanction letter terms. Foreclosure charges, if any, will be detailed at the time of approval.`,
    },
    {
      _id: 6,
      question: "What documents do I need to apply?",
      answer: "You'll need KYC, ITRs, bank statements, GST filings, proof of business continuity, and details of current liabilities or existing loans.",
    },
  ],
};

export const msme_faq = {
  image: FaqImage1.src,
  alt: "what is business loan",
  data: [
    {
      _id: 0,
      question: "What is an MSME loan?",
      answer: `An MSME (Micro, Small, and Medium Enterprises) loan is a financial product designed to provide funding to businesses that fall under the MSME category. These loans can be used for various purposes, such as working capital, purchasing machinery, business expansion, and more.`,
    },
    {
      _id: 1,
      question: "Who is eligible for an MSME loan?",
      answer:
        "Eligibility criteria generally include the business being registered as an MSME, having a certain operational history (which can vary), a satisfactory credit score (of both the business and its promoters/directors), and a viable business plan. Specific requirements can differ between lenders and loan schemes.",
    },
    {
      _id: 2,
      question: "What are the different types of MSME loans available?",
      answer:
        "There are various types of MSME loans, including term loans (for long-term investments), working capital loans (for day-to-day operational expenses), machinery loans, business expansion loans, and specific government-backed schemes like the Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) loans and Mudra loans.",
    },
    {
      _id: 3,
      question: "What is the repayment tenure for an MSME loan?",
      answer:
        "The repayment tenure can vary from a few months to several years, depending on the type of loan and the lender's terms. Working capital loans usually have shorter tenures compared to term loans.",
    },
    {
      _id: 4,
      question: "Can I apply for an MSME loan online?",
      answer: "Yes, through Ratnaafin you can apply online for facilities for MSME loans, which can streamline the process.",
    },
    {
      _id: 5,
      question: "Can I get a second MSME loan if I already have one?",
      answer:
        "Yes, you may be eligible for another loan depending on your repayment history with the existing loan, your current financial situation, and the lender's policies.",
    },
  ],
};

export const revenue_based_finance_faq = {
  image: FaqImage8.src,
  alt: "Revenue Based Finance Ratnaafin",
  data: [
    {
      _id: 0,
      question: "What is Ratnaafin's Revenue-Based Financing (RBF)?",
      answer: `Ratnaafin's RBF is a working capital term loan designed for businesses with consistent digital revenue streams. It offers flexible repayment options aligned with your revenue patterns, helping manage cash flow effectively.`,
    },
    {
      _id: 1,
      question: "What are the benefits of choosing RBF over traditional financing?",
      answer: [
        "Opting for Ratnaafin’s Revenue Based Financing has several advantages over traditional investment and funding options:",
        `<ul style= "display: grid; gap: 5px; list-style-type: disc; margin-left: 35px;">
                    <li>No equity dilution: You retain full ownership of your business.</li>
                    <li>Flexible repayments: Payments adjust based on your revenue, easing cash flow management.</li>
                    <li>Quick access to capital: Faster approval and funding processes compared to traditional loans.</li>
                </ul>`,
      ],
    },
    {
      _id: 3,
      question: "What documents are needed to apply for Revenue-Based Financing from Ratnaafin?",
      answer:
        "To apply, businesses need to provide key documents including business registration certificates, audited financial statements, recent bank statements, and GST returns. Additional data such as monthly MIS reports or platform-based revenue statements (e.g., from Amazon, Razorpay, etc.) may also be required. These documents help Ratnaafin assess your eligibility and digital revenue stability for working capital funding.",
    },
    {
      _id: 4,
      question: "How is Revenue Based Funding different from a traditional business loan?",
      answer:
        "Ratnaafin’s Revenue-Based Financing is tailored for businesses with steady digital revenue rather than heavy fixed assets. Unlike traditional loans that rely heavily on collateral and long financial histories, RBF evaluates your revenue flow and cash position. It’s ideal for growth-focused, asset-light businesses such as D2C brands, SaaS firms, and e-commerce sellers.",
    },
    {
      _id: 5,
      question: "How is the loan amount decided in RBF?",
      answer:
        "The loan amount is determined based on your business's monthly revenue, digital collections, and cash flow capacity. Ratnaafin uses a cash-flow based credit assessment instead of depending only on past profits or tangible assets. This approach ensures that funding is aligned with your actual earning potential and repayment ability.",
    },
  ],
};

export const micro_lap_faq = {
  image: FaqImage9.src,
  alt: "Micro Loan Against Property for MSMEs in India",
  data: [
    {
      _id: 0,
      question: "What is MILAP by Ratnaafin?",
      answer: `MILAP (Micro Loan Against Property) by Ratnaafin is a loan solution designed to help individuals and small enterprises in rural and semi-urban areas of India unlock the value of their property. It offers access to credit by pledging property as collateral and supports a range of financial needs—from personal requirements to business growth.`,
    },
    {
      _id: 1,
      question: "Who is MILAP for?",
      answer:
        "MILAP is ideal for both salaried individuals and small business owners living in rural and semi-urban India. Whether you're looking to manage personal expenses, expand a business, or meet other financial goals, MILAP offers a practical financing option.",
    },
    {
      _id: 2,
      question: "What are the benefits of choosing MILAP?",
      answer: [
        `<ul style = "display: grid; gap: 5px; list-style-type: disc; margin-left: 35px;">
                    <li><strong style = "color: black;" > Fast Access to Credit:</strong > Quick processing and disbursal.</li>
                    <li><strong style = "color: black;">Collateral-Based:</strong> Use your property to secure the loan.</li>
                    <li><strong style = "color: black;">Flexible Usage:</strong> Suitable for both personal and business needs.</li>
                    <li><strong style = "color: black;">Rural and Semi-Urban Focus:</strong> Tailored for customers in these regions.</li>
                    <li><strong style = "color: black;">Competitive Interest Rates:</strong> Designed to be affordable and accessible.</li>
                    <li><strong style = "color: black;">Minimal Paperwork:</strong> Simplified documentation process.</li>
                    <li><strong style = "color: black;">Rapid Approval:</strong> Swift evaluation and loan approval.</li>
                </ul>`,
      ],
    },
    {
      _id: 3,
      question: "How is MILAP different from traditional bank loans?",
      answer: [
        "MILAP offers several advantages over conventional loans, especially for customers:",
        `<ul style= "display: grid; gap: 5px; list-style-type: disc; margin-left: 35px;">
                    <li>Lower collateral requirements compared to large commercial loans.</li>
                    <li>Less complicated documentation.</li>
                    <li>Faster turnaround time.</li>
                    <li>A customer-first approach that supports a variety of financial goals.</li>
                </ul>`,
      ],
    },
    {
      _id: 4,
      question: "What are the eligibility criteria for a MILAP loan?",
      answer: [
        "To qualify for a MILAP loan, applicants should:",
        `<ul style= "display: grid; gap: 5px; list-style-type: disc; margin-left: 35px;">
                    <li>Be a salaried individual or small business owner</li>
                    <li>Own a property that can be pledged as collateral.</li>
                    <li>Meet Ratnaafin’s eligibility norms related to income, stability, and <button style="color: #046EB6;" >documentation</button></li>
                    <li><button style="color:#046EB6;">Apply</button> with the necessary documents as listed in the “Eligibility & Required Documents” section.</li>
                </ul>`,
      ],
    },
  ],
};

export const scf_purchase_invoice_faq = {
  image: FaqImage10.src,
  alt: "",
  data: [
    {
      _id: 0,
      question: "What is a Loan Against Property (LAP)?",
      answer: `A LAP allows you to borrow money by pledging your residential, commercial, or industrial property as collateral. It offers high loan amounts at relatively lower interest rates since it's a secured loan.`,
    },
    {
      _id: 1,
      question: "What types of properties are accepted?",
      answer: "We accept self-owned residential, commercial, and industrial properties. Properties under a gift deed or sale deed are also considered.",
    },
    {
      _id: 2,
      question: "Do I need to show income proof?",
      answer:
        "Yes, but we also assess liquid income or informal cash flows. This makes it easier for self-employed individuals or business owners with limited formal documents to qualify.",
    },
    {
      _id: 3,
      question: "How much loan can I get against my property?",
      answer: "You can typically get up to 70% of your property’s market value, depending on the location, age, and legal status of the asset.",
    },
    {
      _id: 4,
      question: "Can I repay the loan early?",
      answer:
        "Yes, foreclosure and part-prepayments are allowed. Charges may apply depending on the loan terms. We recommend checking your sanction letter for specifics.",
    },
  ],
};

export const scf_sales_invoice_discounting_faq = {
  image: FaqImage11.src,
  alt: "",
  data: [
    {
      _id: 0,
      question: "What is a Loan Against Property (LAP)?",
      answer: `A LAP allows you to borrow money by pledging your residential, commercial, or industrial property as collateral. It offers high loan amounts at relatively lower interest rates since it's a secured loan.`,
    },
    {
      _id: 1,
      question: "What types of properties are accepted?",
      answer: "We accept self-owned residential, commercial, and industrial properties. Properties under a gift deed or sale deed are also considered.",
    },
    {
      _id: 2,
      question: "Do I need to show income proof?",
      answer:
        "Yes, but we also assess liquid income or informal cash flows. This makes it easier for self-employed individuals or business owners with limited formal documents to qualify.",
    },
    {
      _id: 3,
      question: "How much loan can I get against my property?",
      answer: "You can typically get up to 70% of your property’s market value, depending on the location, age, and legal status of the asset.",
    },
    {
      _id: 4,
      question: "Can I repay the loan early?",
      answer:
        "Yes, foreclosure and part-prepayments are allowed. Charges may apply depending on the loan terms. We recommend checking your sanction letter for specifics.",
    },
  ],
};

export const scf_vendor_finance_faq = {
  image: FaqImage12.src,
  alt: "",
  data: [
    {
      _id: 0,
      question: "What is a Loan Against Property (LAP)?",
      answer: `A LAP allows you to borrow money by pledging your residential, commercial, or industrial property as collateral. It offers high loan amounts at relatively lower interest rates since it's a secured loan.`,
    },
    {
      _id: 1,
      question: "What types of properties are accepted?",
      answer: "We accept self-owned residential, commercial, and industrial properties. Properties under a gift deed or sale deed are also considered.",
    },
    {
      _id: 2,
      question: "Do I need to show income proof?",
      answer:
        "Yes, but we also assess liquid income or informal cash flows. This makes it easier for self-employed individuals or business owners with limited formal documents to qualify.",
    },
    {
      _id: 3,
      question: "How much loan can I get against my property?",
      answer: "You can typically get up to 70% of your property’s market value, depending on the location, age, and legal status of the asset.",
    },
    {
      _id: 4,
      question: "Can I repay the loan early?",
      answer:
        "Yes, foreclosure and part-prepayments are allowed. Charges may apply depending on the loan terms. We recommend checking your sanction letter for specifics.",
    },
  ],
};

export const scf_dealer_finance_faq = {
  image: FaqImage13.src,
  alt: "",
  data: [
    {
      _id: 0,
      question: "What is a Loan Against Property (LAP)?",
      answer: `A LAP allows you to borrow money by pledging your residential, commercial, or industrial property as collateral. It offers high loan amounts at relatively lower interest rates since it's a secured loan.`,
    },
    {
      _id: 1,
      question: "What types of properties are accepted?",
      answer: "We accept self-owned residential, commercial, and industrial properties. Properties under a gift deed or sale deed are also considered.",
    },
    {
      _id: 2,
      question: "Do I need to show income proof?",
      answer:
        "Yes, but we also assess liquid income or informal cash flows. This makes it easier for self-employed individuals or business owners with limited formal documents to qualify.",
    },
    {
      _id: 3,
      question: "How much loan can I get against my property?",
      answer: "You can typically get up to 70% of your property’s market value, depending on the location, age, and legal status of the asset.",
    },
    {
      _id: 4,
      question: "Can I repay the loan early?",
      answer:
        "Yes, foreclosure and part-prepayments are allowed. Charges may apply depending on the loan terms. We recommend checking your sanction letter for specifics.",
    },
  ],
};

export const register_as_channel_partner_faq = {
  image: FaqImage7.src,
  alt: "Register as channel partner",
  data: [
    {
      _id: 0,
      question: "How can I apply to become a channel partner of Ratnaafin?",
      answer: `To apply, visit our website and complete the "Channel Partner Application" form, specifying your interest in selling loan products.`,
    },
    {
      _id: 1,
      question: "What types of loan products are available for channel partners to sell?",
      answer:
        "Ratnaafin offers a wide range of loan products for SMEs & Individuals, including business loans, supply chain finance, loan against property and more, catering to diverse customer needs.",
    },
    {
      _id: 2,
      question: "How are commissions earned on loan product sales as a channel partner?",
      answer: "Commissions are earned based on successful loan disbursements, and the percentage varies depending on the type and size of the loan.",
    },
    {
      _id: 3,
      question: "What kind of support can I expect as a channel partner selling loan products?",
      answer: "Ratnaafin offers comprehensive training on loan products, marketing materials, a dedicated support team, and timely updates on loan offerings.",
    },
    {
      _id: 4,
      question: "What are the benefits of joining Ratnaafin's channel partner program?",
      answer:
        "As a channel partner, you gain access to our diverse financial products, sales support, marketing resources, and attractive commission structures.",
    },
  ],
};

export const home_faq = {
  image: FaqImage13.src,
  alt: "",
  data: [
    {
      _id: 0,
      question: "How can I apply for a loan at Ratnaafin Capital?",
      answer: `You can apply for a loan at Ratnaafin Capital by simply click on "Check eligibility now" and filling out the online application form.`,
    },
    {
      _id: 1,
      question: "What documents are required for the loan application?",
      answer: "Generally, you will need your ID proof, address proof, income documents, bank statements, and passport-size photographs.",
    },
    {
      _id: 2,
      question: "What is the eligibility criteria for a loan at Ratnaafin Capital?",
      answer: "The eligibility criteria vary depending on the type of loan. Generally, factors like credit history, income, and age are considered.",
    },
    {
      _id: 3,
      question: "How long does it take to process the loan application?",
      answer: "Once we receive all the required documents, the processing time is typically 2-5 business days. However, it may vary.",
    },
    {
      _id: 4,
      question: "Can I apply for a loan online, or do I need to visit a branch?",
      answer: "Yes, you can apply online through our website. Alternatively, you can visit our nearest branch for in-person assistance.",
    },
  ],
};

// business loan faq

export const business_overview_faq = {
  id: 0,
  image: FaqImage.src,
  alt: "Unsecured business loan, ahmedabad",
  data: [
    {
      _id: 0,
      question: "What is the minimum business vintage required to apply?",
      answer: `Your business should be operational for at least 2 years in the same line of business.`,
    },
    {
      _id: 1,
      question: "Do I need collateral or personal guarantee?",
      answer:
        "For unsecured business loans, no collateral is required. However, secured loans offer higher amounts with lower rates if you wish to pledge assets.",
    },
    {
      _id: 2,
      question: "What documents do I need to submit?",
      answer:
        "Essential documents include PAN, Aadhaar, GST certificate, last 12 months of bank statements, and 1-2 years of ITR. We keep the process simple; no lengthy paperwork or multiple site visits.",
    },
    {
      _id: 3,
      question: "Can I repay my loan early or make prepayments?",
      answer:
        "Yes, prepayment is allowed without penalties after completing 12 months* of regular EMI payments. You can adjust your repayment schedule as per your cash flow.",
    },
    {
      _id: 4,
      question: "What happens if I miss an EMI?",
      answer:
        "We recommend setting up automatic payments to avoid delays. Missing EMIs attracts penal interest and may impact your credit score. Contact our support team if you face cash flow challenges. We’re here to help find solutions.",
    },
  ],
};
export const business_interestrate_faq = {
  id: 1,
  image: FaqImage.src,
  alt: "Unsecured business loan, ahmedabad",
  data: [
    {
      _id: 0,
      question: "Why does my interest rate differ from my friend’s?",
      answer: `Interest rates are personalized based on your credit profile, business age, turnover, GST compliance, and existing obligations. Two businesses are never identical. A strong profile gets better rates; this system rewards responsible borrowers.`,
    },
    {
      _id: 1,
      question: "Can I negotiate my interest rate after loan disbursal?",
      answer:
        "Rates are determined during the assessment phase based on your profile. However, if you improve your CIBIL score or increase your GST compliance after 6–12 months, you can apply for a fresh top-up loan at a better rate. (repo rate, lending rate changes then we will change or negotiation)",
    },
    {
      _id: 2,
      question: "Is prepayment of loan allowed?",
      answer:
        "Yes! Prepayment is allowed after 12 months*. You only pay interest for the months you’ve borrowed, prepaying early saves significant interest costs.",
    },
    {
      _id: 3,
      question: "Are there any hidden charges I should know about?",
      answer: "No. Our charges are clearly listed: processing fee, documentation, and that’s it. No surprise charges. We believe in full transparency.",
    },
    {
      _id: 4,
      question: "How is interest calculated on the reducing balance method?",
      answer:
        "On reducing balance, interest is charged only on the outstanding principal amount each month, not the original loan amount. This means your interest decreases as you pay down the principal. Hence, you save more money with each EMI. It’s the fairest method for borrowers.",
    },
  ],
};
export const business_eligibilitydocument_faq = {
  id: 2,
  image: FaqImage.src,
  alt: "Unsecured business loan, ahmedabad",
  data: [
    {
      _id: 0,
      question: "I’m self-employed (CA/Doctor). Can I apply for a business loan?",
      answer: `Absolutely! Self-employed professionals with 2+ years of practice and consistent ITR filings are welcome. We assess your income stability and professional practice growth. CIBIL score and banking history matter more than business type for professionals.`,
    },
    {
      _id: 1,
      question: "What if my business is less than 2 years old?",
      answer: "We typically require 2 years of business history because it shows sustainability. Contact us to discuss your specific situation.",
    },
    {
      _id: 2,
      question: "Does my business need to be registered under GST to apply?",
      answer:
        "GST registration is not mandatory if your turnover is below ₹20 lakh. However, if you’re turnover-eligible, maintaining GST compliance strengthens your application and can qualify you for better rates.",
    },
    {
      _id: 3,
      question: "Can I apply if I have an existing loan or EMI?",
      answer:
        "Yes, you can apply even with existing loans. We assess your repayment capacity by looking at your monthly income vs. total EMI obligations (existing + new loan proposed). Your overall monthly debt should not be more than 100% of monthly income.",
    },
    {
      _id: 4,
      question: "What if I have a CIBIL score below 675?",
      answer:
        "A lower CIBIL score doesn’t automatically disqualify you. We review your complete profile; business growth, recent payment behavior, banking history, and reasons for past defaults (if any). Contact us for a personalized assessment",
    },
  ],
};
export const business_howtoapply_faq = {
  id: 3,
  image: FaqImage.src,
  alt: "Unsecured business loan, ahmedabad",
  data: [
    {
      _id: 0,
      question: "How long does the entire application process take? ",
      answer: `From file login to end to end disbursement, the whole process is done within 48 hours`,
    },
    {
      _id: 1,
      question: "What if my loan is rejected? Can I reapply?",
      answer:
        "If rejected, we’ll explain the reason. Most rejections happen due to CIBIL issues, recent defaults, or incomplete documentation. Address the concern and reapply after 6 months. Many applicants get approved on a second attempt with improved profiles.",
    },
    {
      _id: 2,
      question: "Do I have to submit original documents or are copies enough?",
      answer:
        "Digital copies are sufficient for initial submission. If your application is approved, we may request original documents for verification before final disbursal. This is standard banking practice.",
    },
    {
      _id: 3,
      question: "After getting approved, can I request a higher loan amount?",
      answer:
        "You can discuss a higher amount with your relationship manager before signing the agreement. If approved, we can revise your sanction letter. After the loan is disbursed, you can apply for a top-up loan after 6-12 months of timely repayment.",
    },
  ],
};
export const business_emicalculator_faq = {
  id: 4,
  image: FaqImage.src,
  alt: "Unsecured business loan, ahmedabad",
  data: [
    {
      _id: 0,
      question: "If I prepay my loan early, does the calculator show the interest saving?",
      answer: `The calculator shows the full 12/24/36-month picture. If you prepay early, your actual interest paid will be less. For example, if you prepay after 20 months, you save interest for the remaining 16 months.`,
    },
    {
      _id: 1,
      question: "Does a longer tenure always mean lower EMI?",
      answer:
        "Yes, longer tenure spreads the loan over more months, reducing the monthly EMI. However, it increases total interest paid. Example: 24-month tenure = higher EMI but less total interest vs. 36-month tenure = lower EMI but more total interest.",
    },
    {
      _id: 2,
      question: "Can I change my EMI after the loan is approved?",
      answer:
        "Once approved, your EMI tenure and amount are fixed. However, if your business thrives and you want to prepay, most NBFCs (including Ratnaafin) allow prepayment after 12 months*.",
    },
    {
      _id: 3,
      question: "What if the EMI is too high and I can’t afford it?",
      answer:
        "Reduce the loan amount or increase the tenure (if available). The calculator helps you find the “sweet spot.” If you still can’t find an affordable option, consider applying for a smaller loan first and requesting a top-up after 6-12 months of timely repayment.",
    },
  ],
};

// machinery loan faq

export const machinery_overview_faq = {
  id: 0,
  image: FaqImage4.src,
  alt: "Unsecured business loan, ahmedabad",
  data: [
    {
      _id: 0,
      question: "Can I get a machinery loan for used or pre-owned equipment?",
      answer: `Yes, absolutely. We finance both new and used equipment. For pre-owned machinery, we conduct a technical valuation to assess condition, remaining useful life, and market value. This helps us determine the loan amount and rate. Provide maintenance records and equipment history to strengthen your application.`,
    },
    {
      _id: 1,
      question: "How long does equipment financing typically take?",
      answer:
        "From application to fund transfer usually takes 5-6 working days. The timeline depends on document completeness, equipment inspection (if required), and your credit profile. For straightforward cases with clear documentation, we can move faster.",
    },
    {
      _id: 2,
      question: "What if my equipment increases in value over time?",
      answer:
        "Equipment typically depreciates, which is why our loan tenure aligns with the expected useful life of the machinery. However, if your equipment appreciates or you want to refinance at better rates after 2-3 years, you can reapply for better terms based on improved business performance.",
    },
    {
      _id: 3,
      question: "Can I use the loan for both machinery and working capital?",
      answer:
        "Our machinery loans are specifically for equipment purchase and financing. If you need additional working capital, consider applying for our Business Loan separately, which offers flexibility for multiple uses. We can help structure both loans together if needed.",
    },
    {
      _id: 4,
      question: "What happens if the equipment breaks down or becomes obsolete?",
      answer:
        "Equipment insurance is recommended (sometimes included in loan terms). If equipment becomes inoperable, we work with you to understand the situation. Regular maintenance and inspections help prevent breakdowns. Discuss insurance options during the loan approval process.",
    },
    {
      _id: 5,
      question: "Can I get a machinery loan if my equipment is financed under a lease?",
      answer:
        "Typically, we finance equipment you own or will own. If equipment is currently leased, you'd need to purchase the lease or own the asset outright. Our team can discuss lease-to-own options or refinancing existing leases; contact us for specific scenarios.",
    },
  ],
};
export const machinery_interestrate_faq = {
  id: 1,
  image: FaqImage4.src,
  alt: "Unsecured business loan, ahmedabad",
  data: [
    {
      _id: 0,
      question: "Why does machinery loan interest differ from business loan interest?",
      answer: ` Machinery loans are asset-backed, meaning the equipment serves as collateral. This reduces lender risk, allowing lower rates compared to unsecured business loans. However, rates vary by equipment type, age, and market value. Equipment with longer productive life and higher residual value gets better rates.`,
    },
    {
      _id: 1,
      question: "Can I refinance my machinery loan at a better rate?",
      answer:
        "Yes. After 12-18 months of timely repayment, if your business profile improves or market rates change favorably, you can refinance at a better rate. This is common for businesses upgrading their credit profile.",
    },
    {
      _id: 2,
      question: "What if I prepay my machinery loan early? Do I save interest?",
      answer:
        "Yes! Prepayment is allowed after 12 months. You only pay interest for the months you've borrowed; prepaying early saves significant interest costs. For example, prepaying in 48 months instead of 84 months saves 36 months of interest.",
    },
    {
      _id: 3,
      question: "How do pre-owned equipment rates compare to new equipment rates?",
      answer:
        "Pre-owned machinery typically attracts rates 1-2% higher than new equipment because residual value is uncertain. However, if the equipment is well-maintained and from a reliable brand, the rate difference is minimal. Professional valuation helps secure better rates for used equipment.",
    },
    {
      _id: 4,
      question: "Are there any hidden charges in machinery loan EMI?",
      answer:
        "No. Your EMI includes only principal and interest. Other costs such as processing fee, equipment valuation, inspection, insurance, are separate and clearly communicated upfront. Equipment Insurance is mandatory. There are no hidden charges.",
    },
  ],
};
export const machinery_eligibilitydocument_faq = {
  id: 2,
  image: FaqImage4.src,
  alt: "Unsecured business loan, ahmedabad",
  data: [
    {
      _id: 0,
      question: "What is the maximum equipment cost I can finance?",
      answer: `We finance up to ₹5 Crore in machinery value. However, the actual loan amount depends on the equipment's market value, your business profile, and turnover. We typically finance 60–80% of equipment cost, with you contributing 20-40% from your own resources. Larger loans may require additional collateral (like property).`,
    },
    {
      _id: 1,
      question: "Can I get a machinery loan for imported equipment?",
      answer:
        "Yes, we finance imported equipment. However, you'll need customs clearance documentation, import duty paid proof, and a detailed valuation. Imported equipment from established brands often qualifies for better rates. Share supplier details and import documentation upfront to expedite approval.",
    },
    {
      _id: 2,
      question: "What if the equipment I'm buying becomes obsolete mid-tenure?",
      answer:
        "Equipment depreciation is factored into our financing structure. Our loan tenure aligns with the equipment's expected productive life (typically 5-10 years for most machinery). Regular maintenance and insurance help protect against obsolescence. Discuss insurance options during the loan process.",
    },
    {
      _id: 3,
      question: "Can I increase the loan amount for additional equipment later?",
      answer:
        "Yes. After 12 months of timely repayment on your first machinery loan, you can apply for a top-up loan to finance additional equipment. Your improved repayment history often qualifies you for better rates on subsequent loans.",
    },
    {
      _id: 4,
      question: "What if my equipment serves as collateral, can I sell it before loan repayment?",
      answer: `The equipment is pledged to us as collateral, meaning you cannot sell it without our consent until the loan is repaid. However, after 12-24 months of strong repayment history, you can request a "release clause" to sell and reinvest in newer equipment. Each case is evaluated individually.`,
    },
  ],
};
export const machinery_howtoapply_faq = {
  id: 3,
  image: FaqImage4.src,
  alt: "Unsecured business loan, ahmedabad",
  data: [
    {
      _id: 0,
      question: "How long does the entire machinery loan process take?",
      answer: `From application to fund transfer typically takes 5-6 working days. For straightforward applications with complete documentation and new equipment, approval can be as fast as 2-3 days.`,
    },
    {
      _id: 1,
      question: "What if I need to modify equipment details after applying?",
      answer:
        "Equipment modifications are allowed before approval. Contact our team immediately if you want to change equipment type, cost, or specifications. We'll update your loan structure and re-evaluate. Changes post-approval require loan amendment, which may delay funding.",
    },
    {
      _id: 2,
      question: "Can I get the loan amount increased if equipment cost rises?",
      answer:
        "Yes, if the equipment cost increases slightly, we can revise your loan amount (subject to your profile and equipment value). Let us know immediately so we can reassess. Major increases may require a new application.",
    },
    {
      _id: 3,
      question: "Is equipment insurance mandatory for the loan?",
      answer:
        "Equipment insurance is mandatory. Moreover, many loan agreements include insurance as a protective measure. We'll discuss insurance options during approval, it provides protection against equipment damage and breakdowns.",
    },
    {
      _id: 4,
      question: "What if the equipment supplier delays delivery?",
      answer: `If the supplier delays delivery after loan disbursal, it doesn't affect your loan. You'll begin repaying EMI as per the agreed schedule. However, you can request an EMI moratorium (pause) until equipment is installed and operational, discuss this during approval.`,
    },
  ],
};
export const machinery_emicalculator_faq = {
  id: 4,
  image: FaqImage4.src,
  alt: "Unsecured business loan, ahmedabad",
  data: [
    {
      _id: 0,
      question: "Why does the machinery loan EMI differ from the business loan EMI?",
      answer: `Machinery loans are asset-backed (equipment is collateral), while business loans are often unsecured. This difference affects rates, tenure, and EMI structure. Additionally, machinery loan tenure is longer (up to 84 months) to match equipment's productive life, resulting in lower EMI compared to shorter business loan tenures.`,
    },
    {
      _id: 1,
      question: "If I prepay my machinery loan early, does the interest reduce proportionally?",
      answer:
        "Yes! Prepayment is allowed after 12 months. You only pay interest for the months you've borrowed. If you prepay after 48 months instead of 84 months, you save 12 months of interest, a significant amount. Use the calculator to see prepayment savings.",
    },
    {
      _id: 2,
      question: "What if the equipment becomes non-operational mid-tenure?",
      answer:
        "Equipment insurance (usually available at loan approval) protects against such scenarios. Additionally, your loan tenure is aligned with equipment's expected productive life, so premature failure is uncommon with well-maintained machinery. Discuss insurance options during loan approval.",
    },
    {
      _id: 3,
      question: "Can my EMI change during the loan tenure?",
      answer:
        "Our machinery loan rates are fixed, so your EMI remains constant throughout the tenure. No surprises due to rate changes. This helps you budget accurately for equipment financing.",
    },
    {
      _id: 4,
      question: "How accurate is the calculator for my specific equipment?",
      answer: `The calculator provides a reliable estimate based on your inputs. However, your final EMI may vary slightly (₹100-500) based on exact approval rate, loan processing date, and your specific equipment profile. The calculator's accuracy improves when you input your actual approved interest rate.`,
    },
    {
      _id: 5,
      question: "What if I want to sell the equipment before the loan is fully repaid?",
      answer: `Equipment is pledged to Ratnaafin as collateral, so you cannot sell it without our consent. However, after demonstrating 12-24 months of strong repayment, you can request permission to sell and reinvest in new equipment. Each case is evaluated individually, and you can discuss options with our team.`,
    },
  ],
};
