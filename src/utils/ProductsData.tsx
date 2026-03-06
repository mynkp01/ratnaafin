import {
  AgriculturalAgroProcessing,
  ApprovalTime,
  AutomotiveEngineering,
  BeforeYouApplMachinery,
  BeforeYouApply,
  BeforeYouApplyMachinery,
  BuildStrongFinancialProfile,
  BusinessExpanssion,
  Checklist,
  ChooseYourEquipmentStrategically,
  ConstructionContracting,
  DuringApplication,
  DuringApplicationMachinery,
  EquipmentMachineryUpgrade,
  FasterProcessing,
  Flexible,
  FoodProcessing,
  HospitalityCommercial,
  InterestRateRange,
  InterestRateRangeMachinery,
  Inventory,
  LimitedLiabilityPartnership,
  LoanAmount,
  LogisticsWarehousing,
  ManufacturingEquipment,
  ManufacturingUnits,
  MiningQuarrying,
  OptimizeYourLoanApplication,
  OptimizeYourLoanApplicationMachinery,
  PartnershipFirms,
  PostApproval,
  PostApprovalMachinery,
  PreOwnedUsedEquipment,
  PrivateLimitedCompanies,
  ProcessingFees,
  ProductionCapacityExpansion,
  Proprietorship,
  RegisteredMSMEunits,
  RelationshipManager,
  ReplacementOfWornOut,
  Rewards,
  SeasonalDemandManagement,
  Secured,
  SelfEmployed,
  SoleTradersRetailers,
  StrengthenYourCollateralPosition,
  SubmitCompleteDocumentation,
  Tenure,
  TextileChemical,
  TimeYourApplicationStrategically,
  ToolsGenerators,
  TradingBusinesses,
  Unsecured,
  VendorSupplierPayments,
  WhyChooseRatnaafinBusinessLoan,
  WhyChooseRatnaafinMachineryLoan,
  WorkingCapitalCash,
} from "@/assets";

// business loan page data

export const BusinessOverviewData = {
  HeadingData: [
    {
      title: "Why Choose Ratnaafin Business Loan?",
      description: "Designed for business owners who need capital without the complexity.",
    },
  ],
  image: WhyChooseRatnaafinBusinessLoan,
  description1:
    "Ratnaafin empowers MSMEs to unlock their true business potential with tailored loan solutions that prioritize speed, flexibility, and ease. Every loan is crafted to seamlessly align with the dynamic cash flow cycles of entrepreneurs, ensuring capital is available exactly when it’s needed. ",
  description2:
    "Our digital-first approach eliminates cumbersome paperwork, freeing business owners to focus on growth and innovation. With Ratnaafin’s transparent and customer-centric lending, MSMEs gain a trusted financial partner committed to fueling sustainable success and turning ambitions into realities.",
};

export const BusinessLoanTypesData = [
  {
    icon: <Secured />,
    title: "Secured Business Loan (LAP)",
    descriptions: [
      "Loan against property- residential, commercial, industrial properties. Apart from these universally accepted collateral properties, we consider collateral in the form of open land, hospital, school properties, multiplex properties, etc. against our funding",
      "Highest LTV available",
      "Competitive interest rates",
    ],
  },
  {
    icon: <Unsecured />,
    title: "Unsecured Business Loan",
    descriptions: ["No collateral required.", "Faster approval for eligible profiles", "Ideal for working capital and short-term needs"],
  },
];

export const BusinessKeyFeaturesData = [
  {
    icon: <LoanAmount />,
    title: "Loan Amount",
    descriptions: ["up to ₹75 Lakhs"],
  },
  {
    icon: <LoanAmount />,
    title: "Interest Rate",
    descriptions: ["Starting from 1.2%* per month (reducing balance)"],
  },
  {
    icon: <Tenure />,
    title: "Tenure",
    descriptions: ["12–36 months (flexible)"],
  },
  {
    icon: <ProcessingFees />,
    title: "Processing Fees",
    descriptions: ["up to 2% of loan amount"],
  },
  {
    icon: <ApprovalTime />,
    title: "Approval Time",
    descriptions: ["Within 48 hours*"],
  },
];

export const BusinessInterestRateFactors = [
  {
    title: "Business Profile",
    descriptions: [
      "Business age (2+ years = stronger rate eligibility)",
      "Annual turnover and consistent revenue pattern",
      "Industry type and business stability indicators",
    ],
  },
  {
    title: "Credit & Financial Health",
    descriptions: [
      "CIBIL score (675+ acceptable; 750+ gets better rates)",
      "Banking history (no defaults or payment failures)",
      "Ratio of existing EMIs to monthly income (lower ratio = better rate)",
    ],
  },
  {
    title: "Documentation & Compliance",
    descriptions: ["GST filing consistency", "ITR accuracy and declared income alignment", "Bank statement patterns showing healthy, regular cash inflows"],
  },
  {
    title: "Loan Structure",
    descriptions: [
      "Loan amount relative to your annual turnover",
      "Tenure chosen (longer tenure often qualifies for better rates)",
      "Collateral offered (secured loans = 0.3-0.5% rate reduction)",
    ],
  },
];

export const BusinessStabilityRequirementsData = [
  {
    title: "Banking History",
    descriptions: ["Clean banking across all business accounts", "No defaults in the last 24* months", "Regular deposits showing business cash inflows"],
  },
  {
    title: "GST & Tax Compliance",
    descriptions: [
      "Updated GST registration (if applicable)",
      "Consistent GST filing (last 12 months)",
      "ITR filed for last 1–2 years with declared business income",
    ],
  },
  {
    title: "Business Stability Indicators",
    descriptions: ["Consistent monthly/quarterly revenue", "Ability to show profitability over 12+ months", "No legal disputes or cases against the business"],
  },
  {
    title: "Loan Obligation Profile",
    descriptions: [
      "Overall monthly debt should not be more than 100% of monthly income",
      "No recent loan defaults or legal recovery proceedings",
      "Transparent disclosure of all existing loans & obligations",
    ],
  },
];

export const BusinessTrustedLendingData = {
  title:
    "Ratnaafin fuels MSME growth with business loans through a seamless process. Apply online and secure approvals in just 48 hours* from file login, keeping your business momentum unstoppable.",
};

export const BusinessInterestRateRangeData = {
  image: InterestRateRange,
  title: "How is your rate calculated?",
  description: "Your final interest rate depends on multiple factors that reflect your business strength.",
  description1:
    "This means a well-established business with strong banking habits and consistent GST compliance can qualify for rates at the lower end of our spectrum.",
  list: [
    "Credit score (CIBIL 675+)",
    "Business age & vintage (2+ years preferred)",
    "Annual turnover & revenue stability",
    "GST/ITR filing consistency",
    "Existing loan obligations",
    "Banking history",
  ],
  HeadingData: [
    {
      title: "Interest Rate Range",
      description: "Starting from 1.2% per month on reducing balance",
    },
  ],
};

export const BusinessLoanRateOptimizationData = {
  items: [
    {
      title: "Build a Strong Financial Profile",
      description:
        "Start 2-3 months before applying. Maintain CIBIL above 700 by paying all dues on time (EMIs, credit card bills, supplier payments). File GST returns consistently and on time every month. Provide clean, healthy bank statements showing regular business inflows. This foundational work directly lowers your rate.",
      image: BuildStrongFinancialProfile,
    },
    {
      title: "Optimize Your Loan Application",
      description:
        "Borrow strategically, ask for only what you genuinely need, as smaller loan amounts present lower risk and attract better rates. Choose a tenure you can comfortably afford; 36-month tenures often qualify for lower rates than 12-month options. Submit all required documentation in one batch upfront: organized, complete submissions signal seriousness and speed approval, sometimes qualifying you for rate discounts.",
      image: OptimizeYourLoanApplication,
    },
    {
      title: "Strengthen Your Collateral Position",
      description:
        "If you own property, fixed deposits, or other assets, offering collateral can reduce your rate by 2-3% compared to unsecured loans. This is optional but powerful if available.",
      image: StrengthenYourCollateralPosition,
    },
    {
      title: "Time Your Application Strategically",
      description:
        "Apply during months when your business shows strongest cash flows (e.g., post-peak sales season). Lenders assess repayment capacity based on current financials; stronger numbers = better rate approval.",
      image: TimeYourApplicationStrategically,
    },
  ],
};

export const BusinessEMICalculatorData = [
  {
    title: "Plan Monthly Cash Flow Accurately",
    descriptions: [
      "Your business needs to generate enough monthly revenue to cover EMI comfortably. Using the calculator, you can determine: “Can my business afford ₹31,000 EMI every  month?” If the answer is no, adjust the loan amount or tenure until you find a comfortable figure.",
    ],
  },
  {
    title: "Compare Different Scenarios",
    descriptions: [
      "What if you borrow ₹30 lakh for 24 months vs. ₹40 lakh for 36 months? The calculator lets you instantly see how EMI changes, helping you make an informed decision.",
    ],
  },
  {
    title: "Avoid Over-Commitment",
    descriptions: [
      "Without planning, businesses often borrow more than they can comfortably repay. This strains cash flow and can lead to late payments or defaults. The calculator prevents this by showing exactly what you can afford.",
    ],
  },
  {
    title: "Make Better Business Decisions",
    descriptions: [
      "Should you invest in that new machinery? The EMI calculator helps you answer: “If I finance it with a loan, will my business ROI justify the EMI cost?” Data-driven decisions lead to better outcomes.",
    ],
  },
];

export const BusinessDocumentationWithRatnaafinData = [
  {
    icon: <Checklist />,
    title: "Clear, Simple Checklist",
    descriptions: ["We provide an exact list of what we need; no guessing, no surprises. You’ll know exactly what to submit before applying."],
  },
  {
    icon: <RelationshipManager />,
    title: "Relationship Manager Support",
    descriptions: ["Our team helps clarify which documents you need based on your  business structure. If you’re unsure, just ask and we’ll guide you."],
  },
  {
    icon: <FasterProcessing />,
    title: "Faster Processing",
    descriptions: [
      "Organized documentation = faster assessment. Submit everything at once instead of back-and-forth follow-ups, and your application moves to approval quickly",
    ],
  },
];

export const BusinessWhyChooseUsData = [
  {
    icon: <LoanAmount />,
    title: "Transparent & Fair Pricing",
    descriptions: [
      "Absolutely no hidden charges: what you see is what you pay",
      "Processing fee less than or equal to 2%, clearly disclosed upfront",
      "Customized interest rates based on your unique business profile and repayment capacity",
    ],
  },
  {
    icon: <Flexible />,
    title: "Flexible Repayment Structure",
    descriptions: [
      "Choose loan tenure (12–36 months) aligned with your cash flow, not our convenience",
      "Longer tenures significantly reduce your monthly EMI burden",
      "Early repayment allowed after 12 months* with zero penalties, save interest by paying faster",
    ],
  },
  {
    icon: <Rewards />,
    title: "Rewards for Responsible Borrowers",
    descriptions: [
      "Consistent GST compliance unlocks lower interest rates",
      "Strong banking history qualifies you for better loan terms immediately",
      "Build your creditworthiness with timely EMI payments reduce rates on future loans",
    ],
  },
];

export const BusinessSwiper_Data = [
  {
    _id: 0,
    image: WorkingCapitalCash,
    title: "Working Capital & Cash Flow Management",
  },
  {
    _id: 1,
    image: Inventory,
    title: "Inventory & Stock Purchase",
  },
  {
    _id: 2,
    image: EquipmentMachineryUpgrade,
    title: "Equipment & Machinery Upgrade",
  },
  {
    _id: 3,
    image: BusinessExpanssion,
    title: "Business Expansion & New Locations",
  },
  {
    _id: 4,
    image: SeasonalDemandManagement,
    title: "Seasonal Demand Management",
  },
  {
    _id: 5,
    image: VendorSupplierPayments,
    title: "Vendor & Supplier Payments",
  },
];

export const BusinessApplyForBusinessData = [
  {
    _id: 0,
    image: Proprietorship,
    title: "Proprietorship",
  },
  {
    _id: 1,
    image: PartnershipFirms,
    title: "Partnership firms",
  },
  {
    _id: 2,
    image: PrivateLimitedCompanies,
    title: "Private Limited Companies",
  },
  {
    _id: 3,
    image: LimitedLiabilityPartnership,
    title: "Limited Liability Partnerships (LLPs)",
  },
  {
    _id: 4,
    image: SelfEmployed,
    title: "Self-employed professionals (CA, doctor, consultant)",
  },
  {
    _id: 5,
    image: RegisteredMSMEunits,
    title: "Registered MSME units",
  },
  {
    _id: 6,
    image: SoleTradersRetailers,
    title: "Sole traders & retailers",
  },
];

export const BusinessEligibilityData = [
  {
    label: "Age",
    value: "25–65 years (principal applicant/owner)",
  },
  {
    label: "Business Vintage",
    value: "Minimum 2 years in the same line of business",
  },
  {
    label: "Credit Score",
    value: "CIBIL 675+ (preferred)",
  },
  {
    label: "Location",
    value: "Across India (50+ cities covered)",
  },
  {
    label: "Business Status",
    value: "Currently operational and profitable",
  },
];

export const BusinessDocumentationChecklistData = [
  {
    title: "KYC & Personal Documents",
    subtitle: "(All Applicants/Directors)",
    tag: "Mandatory",
    items: ["PAN (permanent account aumber)", "Aadhaar", "Address proof: utility bill, rental agreement, or property ownership"],
  },
  {
    title: "Business Registration &",
    subtitle: "Operational Documents",
    tag: "Mandatory",
    items: [
      "GST registration certificate",
      "Business registration proof (shop act, factory registration, or MSME udyam certificate)",
      "Proprietorship deed / partnership agreement / incorporation certificate (as applicable)",
      "Business PAN (if separate from personal PAN)",
    ],
    note: "Trade license, udyam MSME registration certificate, factory/store ownership or rental agreement",
  },
  {
    title: "Financial Documents",
    subtitle: "(Last 2 Years)",
    tag: "Essential",
    items: [
      "Bank Statements: Last 12 months from primary business account",
      " ITR (Income Tax Return): Last 1–2 years with Computation of Income (COI) sheet",
      "GST Returns: Last 12 months",
    ],
  },
  {
    title: "Existing Loan Documents",
    subtitle: "(If Any)",
    items: ["Loan sanction letters from banks/NBFCs", "Current loan statements (RPS/SOA)", "All active loan account details"],
  },
];

export const BusinessTimelineData = [
  {
    line1: "Enter Your Loan",
    line2: "Amount",
    description: "Use the slider to choose the amount you need (₹2 lakh to ₹75 lakh), keeping it as close as possible to your actual requirement.",
    number: 1,
  },
  {
    line1: "Choose Your Preferred",
    line2: "Tenure",
    description: "Select a repayment period between 12 and 36 months, based on what keeps your monthly EMI comfortable for your cash flow.",
    number: 2,
  },
  {
    line1: "Input Interest",
    line2: "Rate",
    description: "Use the pre-filled rate or adjust it to test different scenarios and see how a higher or lower rate changes your EMI.",
    number: 3,
  },
  {
    line1: "Click",
    line2: "“Calculate”",
    description: "View your estimated monthly EMI, total interest payable, and total repayment amount instantly.",
    number: 4,
  },
];

export const BusinessTipsData = [
  {
    title: "Before You Apply:",
    image: BeforeYouApply,
    items: [
      {
        heading: "01. Check Your CIBIL Score:",
        text: "Visit www.cibil.com and review your credit score. If it’s below 675, resolve any disputed accounts or old defaults before applying. A cleaner credit profile = faster approval.",
      },
      {
        heading: "02. Organize Your Documents:",
        text: "Gather all required papers in one folder. Don’t wait for us to ask, proactively submit complete documentation. This prevents delays and speeds up assessment.",
      },
      {
        heading: "03. Update GST & ITR:",
        text: "If GST or ITR filings are pending, complete them before applying. Recent, updated filings show you’re compliant and serious about your business.",
      },
      {
        heading: "04. Keep Banking Clean:",
        text: "A few weeks before applying, ensure no bounced cheques or overdrafts. Lenders assess the last 3–6 months of banking activity closely.",
      },
      {
        heading: "05. Maintain Emergency Buffer:",
        text: "Don’t apply when your account balance is at zero. Show a healthy average balance to prove business stability and fund management.",
      },
    ],
  },
  {
    title: "During Application:",
    image: DuringApplication,
    items: [
      {
        heading: "06. Be Accurate & Complete:",
        text: "Fill every field correctly. Inconsistencies delay assessment. Double-check all numbers before submitting.",
      },
      {
        heading: "07. Respond Quickly to Requests:",
        text: "If we ask for additional documents or clarifications, submit them within 24 hours. Quick responses move your file forward faster.",
      },
      {
        heading: "08. Provide Latest Documentation:",
        text: "Submit the most recent GST returns, bank statements, and ITR (not old documents). Lenders need current information to assess cash flow accurately.",
      },
    ],
  },
  {
    title: "Post-Approval:",
    image: PostApproval,
    items: [
      {
        heading: "09. Lock Your Rate Quickly:",
        text: "Once approved, don’t delay signing the agreement. Interest rates are time-sensitive; locking quickly ensures your rate stays valid.",
      },
      {
        heading: "10. Be Ready with Account Details:",
        text: "Have your business bank account details handy for disbursal. Any delays in providing account info can push the fund transfer back.",
      },
    ],
  },
];

export const BusinessLoanApplicationProcessData = [
  {
    steps: "Step 1",
    title: "Fill Your Basic Details",
    items: ["Visit our website and click “Apply Now”", "Provide your contact details, location and desired loan amount", "Our Team will contact you"],
  },
  {
    steps: "Step 2",
    title: "Share Your Business & Financial Information",
    items: [
      "Provide basic business details: vintage (years in operation), annual turnover, monthly revenue",
      "Answer simple questions about existing loans and business obligations",
      "Share financial overview to assess loan eligibility and determine your personalized rate",
    ],
  },
  {
    steps: "Step 3",
    title: "Send us the Documents",
    items: [
      "Submit all required documents as per the documentation checklist provided during application",
      "Our team will guide you on which documents strengthen your application",
    ],
  },
  {
    steps: "Step 4",
    title: "Credit Assessment & Verification",
    items: [
      "Our team reviews your profile & documents",
      "CIBIL score is checked (soft inquiry, no impact on your credit)",
      "Financial assessment completed",
      "We may contact you for clarifications or schedule a quick call",
    ],
  },
  {
    steps: "Step 5",
    title: "Approval & Sanction (Within 48 hours of verification)",
    items: [
      "If approved, you receive a sanction letter with loan terms",
      "All details: loan amount, interest rate, EMI, tenure, charges",
      "Review terms carefully, ask questions if anything is unclear",
      "Proceed to agreement stage once you’re confident",
    ],
  },
  {
    steps: "Step 6",
    title: "Disbursal to Your Account (48–72 hours)",
    items: [
      "Once agreement is signed, funds are processed",
      "Loan amount transferred to your registered business bank account",
      "You receive transaction confirmation on registered mobile",
      "Start using funds immediately for your business needs",
    ],
  },
];

// machinery loan page data

export const MachineryOverviewData = {
  HeadingData: [
    {
      title: "Why Choose Ratnaafin Machinery Loan?",
      description: "Designed for manufacturing, construction, and production businesses that need reliable equipment financing without complexity.",
    },
  ],
  image: WhyChooseRatnaafinMachineryLoan,
  description1:
    "Ratnaafin’s Machinery Loan is built to help MSMEs invest confidently in the equipment that powers their growth. It enables manufacturing, construction, and other production-led businesses to acquire or upgrade machinery through a structured, asset-focused financing solution that aligns with real-world cash flows. With a streamlined process, practical documentation requirements, and flexible repayment options, Ratnaafin becomes a reliable partner for businesses looking to modernise operations, enhance capacity, and stay competitive without disrupting day-to-day working capital.",
};

export const MachineryLoanTypesData = [
  {
    icon: <Secured />,
    title: "Secured Business Loan",
    descriptions: [
      "Loan against residential, commercial, industrial properties including open land, hospitals, schools, multiplexes, etc.",
      "Highest LTV available",
      "Competitive interest rates",
    ],
  },
  {
    icon: <Unsecured />,
    title: "Unsecured Business Loan",
    descriptions: ["No collateral required.", "Faster approval for eligible profiles", "Ideal for working capital and short-term needs"],
  },
];

export const MachineryKeyFeaturesData = [
  {
    icon: <LoanAmount />,
    title: "Loan Amount",
    descriptions: ["up to ₹5 Crore"],
  },
  {
    icon: <LoanAmount />,
    title: "Interest Rate",
    descriptions: ["Starting from 0.9%* per month (reducing balance)"],
  },
  {
    icon: <Tenure />,
    title: "Tenure",
    descriptions: ["up to 84 months"],
  },
  {
    icon: <ProcessingFees />,
    title: "Processing Fees",
    descriptions: ["up to 2% of loan amount"],
  },
  {
    icon: <ProcessingFees />,
    title: "Collateral",
    descriptions: ["Equipment financed serves as collateral"],
  },
  {
    icon: <ApprovalTime />,
    title: "Approval Time",
    descriptions: ["Within 48 hours*"],
  },
  {
    icon: <ApprovalTime />,
    title: "Documentation",
    descriptions: ["Minimal"],
  },
];

export const MachineryInterestRateFactors = [
  {
    title: "Equipment Profile",
    descriptions: [
      "Equipment age (new machinery = lower rate)",
      "Equipment type (standard/common = better rate than specialized)",
      "Depreciation schedule (longer useful life = better rate)",
      "Market resale value (higher residual value = better rate)",
    ],
  },
  {
    title: "Business Fundamentals",
    descriptions: [
      "Business vintage (2+ years in manufacturing/production)",
      "Consistent revenue from equipment-based operations",
      "Healthy cash flow to service EMI comfortably",
      "Clean banking and timely supplier payment history",
    ],
  },
  {
    title: "Credit & Financial Health",
    descriptions: [
      "CIBIL score 675+ (higher scores = better rates)",
      "No recent loan defaults or payment failures",
      "Healthy ratio of income to existing EMI obligations",
      "Strong balance sheet or P&L showing profitability",
    ],
  },
  {
    title: "Loan Structure",
    descriptions: [
      "Loan-to-value (LTV) ratio (lower LTV = better rate)",
      "Tenure aligned with equipment's productive life",
      "Personal guarantee or collateral offered",
      "Existing repayment history with us (if returning customer)",
    ],
  },
];

export const MachineryLoanRateOptimizationData = {
  items: [
    {
      title: "Before You Apply",
      description:
        "Start with strong business credentials. Maintain 2+ years operational history, ensure consistent revenue from equipment operations, keep banking clean with no defaults, and pay suppliers on time. Build your CIBIL score above 700 by resolving any disputed accounts and maintaining 6+ months of clean payment history. This single factor can reduce your rate significantly compared to 650–700 scores.",
      image: BeforeYouApplMachinery,
    },
    {
      title: "Choose Your Equipment Strategically",
      description:
        "Select standard, commonly available machinery over specialized equipment for better rates (depreciation is more predictable). New equipment qualifies for lower rates than pre-owned due to higher residual value; however, if buying used equipment, obtain a professional technical valuation upfront to strengthen your application.",
      image: ChooseYourEquipmentStrategically,
    },
    {
      title: "Optimize Your Loan Structure",
      description:
        "Contribute 20-30% of equipment cost from your own funds (increases your equity and reduces lender risk). Choose loan tenure matching the equipment's productive life. This alignment directly improves your rate.",
      image: OptimizeYourLoanApplicationMachinery,
    },
    {
      title: "Submit Complete Documentation",
      description:
        "Gather supplier quotes, technical specifications, valuation reports, and usage plans before applying. Organized, complete submissions speed approval and often qualify you for rate discounts. If your personal credit is moderate, consider adding a strong co-borrower or personal guarantee for an additional 0.5-1% rate reduction.",
      image: SubmitCompleteDocumentation,
    },
  ],
};

export const MachineryStabilityRequirementsData = [
  {
    title: "Banking History",
    descriptions: [
      "Clean banking across all business accounts",
      "No defaults in the last 24* months",
      "Regular business deposits and equipment-related cash flows",
      "No bounced cheques in last 6 months",
    ],
  },
  {
    title: "Business Profitability & Operations",
    descriptions: [
      "Consistent annual revenue from manufacturing/production",
      "Profitable P&L statement (or break-even minimum)",
      "Established client base and confirmed orders",
      "Evidence of equipment's revenue-generating capability",
    ],
  },
  {
    title: "Equipment & Asset Profile",
    descriptions: [
      "Clear ownership of existing machinery/equipment",
      "Maintenance of existing equipment (proper upkeep)",
      "Market demand for products produced by equipment",
      "Equipment's expected productive life matched to loan tenure",
    ],
  },
  {
    title: "Credit & Loan Obligation",
    descriptions: [
      "CIBIL score 675+ (higher preferred)",
      "No recent loan defaults or legal recovery proceedings",
      "Total existing EMIs should not exceed 40-50% of monthly business income",
      "Transparent disclosure of all existing loans and liens",
    ],
  },
];

export const MachineryTrustedLendingData = {
  title:
    "Ratnaafin empowers manufacturing businesses with transparent, equipment-focused financing. Fast approvals within 5–6 days and digital processes ensure your growth isn't delayed by financing complexity. Transform equipment investment into business momentum with Ratnaafin.",
};

export const MachineryInterestRateRangeData = {
  image: InterestRateRangeMachinery,
  title: "How is your rate calculated?",
  description:
    "Your final interest rate reflects the equipment type, business profile, and market value of the asset being financed. Equipment with longer productive life and stronger residual value qualifies for better rates.",
  list: [
    "Equipment type (new vs. used; manufacturing vs. construction)",
    "Equipment age and depreciation schedule",
    "Business age & turnover",
    "Credit score (CIBIL 675+)",
    "Loan tenure (longer tenure = better rates)",
    "Collateral value relative to loan amount",
  ],
  HeadingData: [
    {
      title: "Interest Rate Range",
      description: "Starting from 0.9% per month (varies by equipment & profile)",
    },
  ],
};

export const MachineryEMICalculatorData = [
  {
    title: "Align EMI with Cash Flow from Equipment",
    descriptions: [
      `Your equipment should generate enough monthly revenue to comfortably cover the EMI. The calculator helps you determine: "Will this ₹50 lakh machinery generate ₹80,000 monthly revenue to comfortably pay the EMI?" Data-driven decisions prevent cash flow stress.`,
    ],
  },
  {
    title: "Match Tenure to Equipment Life",
    descriptions: [
      "Different equipment has different productive lives. A textile machine might last 5-7 years; construction equipment might last 3-5 years. The calculator helps you match tenure to equipment life, ensuring you're not paying for equipment after it's obsolete.",
    ],
  },
  {
    title: "Understand Total Cost of Ownership",
    descriptions: [
      `A ₹30 lakh machinery financed over 60 months costs ₹40+ lakh total (including interest). Knowing this helps you evaluate: "Is the ROI from this equipment worth ₹10 lakh in interest costs?" This comparison guides smarter investments.`,
    ],
  },
  {
    title: "Compare Equipment Options",
    descriptions: [
      "Can't decide between two machines with different costs? The calculator shows the EMI impact of each option, helping you choose equipment that delivers better ROI relative to financing cost.",
    ],
  },
  {
    title: "Plan Production Capacity Strategically",
    descriptions: [
      `Using the calculator, you can determine: "What's the maximum equipment cost I can finance while maintaining healthy business cash flow?" This prevents over-leveraging and keeps your business financially healthy.`,
    ],
  },
  {
    title: "Evaluate Financing Terms",
    descriptions: [
      "See how different tenures affect your monthly obligation. A 36-month tenure vs. 60-month tenure might differ by ₹15,000-20,000 monthly. The calculator makes this comparison transparent.",
    ],
  },
  {
    title: "Prepare for Lender Conversations",
    descriptions: [
      "When you approach Ratnaafin with calculated EMI expectations, you appear professional and serious. Lenders are more confident approving borrowers who've done their homework, this can accelerate approval.",
    ],
  },
  {
    title: "Scenario Planning for Business Growth",
    descriptions: [
      `Explore: "If I finance ₹40 lakh now and another ₹25 lakh after 12 months of strong operations, what are my total EMI obligations?" This helps you plan equipment investments aligned with business growth.`,
    ],
  },
];

export const MachineryDocumentationWithRatnaafinData = [
  {
    icon: <Checklist />,
    title: "Equipment-Specific Approach",
    descriptions: [
      "We focus on the equipment's value and your manufacturing capacity, not just credit scores. Our process is built for businesses with tangible assets, so you won't face unnecessary documentation requests.",
    ],
  },
  {
    icon: <RelationshipManager />,
    title: "Digital Process, Faster Approvals",
    descriptions: [
      "Upload equipment quotes, bank statements, and business documents digitally via our platform or WhatsApp. No need to visit branches or courier original documents. Faster submission = faster approval.",
    ],
  },
  {
    icon: <FasterProcessing />,
    title: "Dedicated Machinery Finance Specialist",
    descriptions: [
      "Our team understands manufacturing businesses and equipment cycles. They guide you on which documents strengthen your case and help clarify equipment-related queries.",
    ],
  },
  {
    icon: <FasterProcessing />,
    title: "Clear Checklist, No Surprises",
    descriptions: [
      "We provide an exact list upfront. You know exactly what's needed, no hidden requirements or last-minute document requests. Organized submission prevents delays.",
    ],
  },
];

export const MachineryWhyChooseUsData = [
  {
    icon: <LoanAmount />,
    title: "Equipment-Aligned Financing",
    descriptions: [
      "Loan tenure matches equipment depreciation (12–84 months based on type)",
      "Longer tenure spreads cost over equipment's productive life",
      "EMI remains proportional to equipment's revenue-generating capacity",
    ],
  },
  {
    icon: <Flexible />,
    title: "Transparent & Competitive",
    descriptions: [
      "No hidden charges; all fees disclosed upfront",
      "Processing fees is up to 2%, clearly disclosed upfront",
      "Rates competitive with equipment's residual value",
      "Clear breakdown of principal, interest, and fees in EMI schedule",
    ],
  },
  {
    icon: <Rewards />,
    title: "Flexible & Rewarding Terms",
    descriptions: [
      "Prepayment allowed after 12 months",
      "Refinancing options available as business grows",
      "Rate adjustments possible with improved business profile",
    ],
  },
];

export const MachinerySwiper_Data = [
  {
    _id: 0,
    image: ManufacturingEquipment,
    title: "Manufacturing Equipment & Machinery Purchase",
  },
  {
    _id: 1,
    image: ProductionCapacityExpansion,
    title: "Production Capacity Expansion & Upgrades",
  },
  {
    _id: 2,
    image: ReplacementOfWornOut,
    title: "Replacement of Worn-Out or Outdated Equipment",
  },
  {
    _id: 3,
    image: ToolsGenerators,
    title: "Tools, Generators, and Auxiliary Equipment with Machines",
  },
  {
    _id: 4,
    image: FoodProcessing,
    title: "Food Processing & Agricultural Equipment",
  },
  {
    _id: 5,
    image: TextileChemical,
    title: "Textile & Chemical Processing Machinery",
  },
  {
    _id: 6,
    image: PreOwnedUsedEquipment,
    title: "Pre-Owned/Used Equipment Financing",
  },
];

export const MachineryApplyForBusinessData = [
  {
    _id: 0,
    image: ManufacturingUnits,
    title: "Manufacturing units (textiles, chemicals, food processing, metal, pharma, etc.)",
  },
  {
    _id: 1,
    image: ConstructionContracting,
    title: "Construction & contracting businesses",
  },
  {
    _id: 2,
    image: AutomotiveEngineering,
    title: "Automotive & engineering workshops",
  },
  {
    _id: 3,
    image: TradingBusinesses,
    title: "Trading businesses with equipment needs",
  },
  {
    _id: 4,
    image: AgriculturalAgroProcessing,
    title: "Agricultural & agro-processing units",
  },
  {
    _id: 5,
    image: HospitalityCommercial,
    title: "Hospitality & commercial kitchen operations",
  },
  {
    _id: 6,
    image: MiningQuarrying,
    title: "Mining & quarrying operations",
  },
  {
    _id: 7,
    image: LogisticsWarehousing,
    title: "Logistics & warehousing businesses",
  },
];

export const MachineryEligibilityData = [
  {
    label: "Age",
    value: "25-65 years (principal applicant/business owner)",
  },
  {
    label: "Business Vintage",
    value: "Minimum 2 years in current manufacturing/production business",
  },
  {
    label: "Credit Score",
    value: "CIBIL 675+",
  },
  {
    label: "Location",
    value: "Across India (pan-India coverage)",
  },
  {
    label: "Business Status",
    value: "Currently operational with active equipment usage",
  },
];

export const MachineryDocumentationChecklistData = [
  {
    title: "KYC & personal documents",
    subtitle: "(All applicants/owners/directors)",
    tag: "Mandatory",
    items: ["PAN (permanent account number)", "Aadhaar", "Address Proof", "Passport-size photograph"],
  },
  {
    title: "Business Registration &",
    subtitle: "Operational Documents",
    tag: "Mandatory",
    items: [
      "GST Registration Certificate",
      "Factory registration / shop act certificate / manufacturing license",
      "Business registration proof (partnership deed, incorporation certificate, or proprietorship)",
      "Udyam MSME certificate (if applicable)",
      "Business PAN card",
    ],
  },
  {
    title: "Equipment & ",
    subtitle: "Asset Documents",
    tag: "Essential",
    items: [
      "Proforma invoice / quotation from equipment supplier (detailed specifications)",
      "Equipment brand, model, age, condition, and features",
      "Valuation certificate (for high-value equipment >₹20 lakh)",
      "For used equipment: maintenance records, valuation report, seller's details",
    ],
  },
  {
    title: "Financial Documents",
    subtitle: "(Last 2-3 Years)",
    tag: "Essential",
    items: [
      "Bank Statements: Last 12 months from primary business account",
      "ITR (income tax return): last 2 years with computation",
      "GST returns: last 12 months (if registered)",
      "P&L statement: last 2 years",
    ],
  },
  {
    title: "Existing Loan &",
    subtitle: "Obligation Documents",
    items: ["Loan sanction letters from current lenders", "Current loan statements (RPS/SOA)", "Equipment lease agreements (if any existing leases)"],
  },
];

export const MachineryTimelineData = [
  {
    line1: "Enter Your Loan",
    line2: "Amount",
    description: "Use the slider to choose the amount you need (₹5 lakh to ₹5 crore), keeping it as close as possible to your actual requirement.",
    number: 1,
  },
  {
    line1: "Choose Your Preferred",
    line2: "Tenure",
    description: "Select a repayment period between 12 and 84 months, based on what keeps your monthly EMI comfortable for your cash flow.",
    number: 2,
  },
  {
    line1: "Input Interest",
    line2: "Rate",
    description: "Use the pre-filled rate or adjust it to test different scenarios and see how a higher or lower rate changes your EMI.",
    number: 3,
  },
  {
    line1: "Click",
    line2: "“Calculate”",
    description: "View your estimated monthly EMI, total interest payable, and total repayment amount instantly.",
    number: 4,
  },
];

export const MachineryTipsData = [
  {
    title: "Before You Apply:",
    image: BeforeYouApplyMachinery,
    items: [
      {
        heading: "01. Prepare Complete Equipment Documentation",
        text: "Gather supplier quotation, technical specifications, equipment drawings, and capacity details. The clearer your equipment profile, the faster our assessment.",
      },
      {
        heading: "02. Get Equipment Valuation Upfront",
        text: "For used or imported equipment, obtain a professional valuation report. This speeds up our internal assessment and often qualifies you for better rates.",
      },
      {
        heading: "03. Organize Your Business Financials",
        text: "Compile the last 2 years of GST returns, ITR, and bank statements in one file. Organized documentation prevents delays and shows you're serious about financing.",
      },
      {
        heading: "04. Improve Your CIBIL Score",
        text: "Resolve any disputed accounts or old defaults. A cleaner credit profile = faster approval and better rates.",
      },
      {
        heading: "05. Confirm Business Profitability",
        text: "Ensure your P&L shows consistent or improving profits. If your business just broke even, document future revenue projections based on new equipment benefits.",
      },
    ],
  },
  {
    title: "During Application:",
    image: DuringApplicationMachinery,
    items: [
      {
        heading: "06. Be Accurate About Equipment Specifications",
        text: "Provide exact equipment details: brand, model, age (for used equipment), capacity, and technical specifications. Inconsistencies can delay assessment.",
      },
      {
        heading: "07. Disclose All Existing Equipment & Loans",
        text: "Transparent information about existing machinery and loans builds trust. Hidden liabilities delay approval and can lead to rejection.",
      },
      {
        heading: "08. Submit All Documents at Once",
        text: "Don't submit documents in batches. Complete your application with all required documents in one submission to prevent back-and-forth delays.",
      },
      {
        heading: "09. Respond Quickly to Queries",
        text: "If we request additional information or clarifications, respond within 24 hours. Quick responses keep your application moving forward.",
      },
    ],
  },
  {
    title: "Post-Approval:",
    image: PostApprovalMachinery,
    items: [
      {
        heading: "10. Lock Your Loan Terms Immediately",
        text: "Once approved, sign the agreement promptly. Equipment financing rates are time-sensitive; locking in quickly secures your approved rate.",
      },
      {
        heading: "11. Prepare Equipment Delivery Details",
        text: "Have supplier contact information, delivery address, and installation timeline ready for final disbursal. This prevents delays in fund transfer.",
      },
    ],
  },
];

export const MachineryLoanApplicationProcessData = [
  {
    steps: "Step 1",
    title: "Fill Your Basic Details",
    items: ["Visit our website and click “Apply Now”", "Provide your contact details, location and desired loan amount", "Our Team will contact you"],
  },
  {
    steps: "Step 2",
    title: "Share Your Business & Financial Information",
    items: [
      "Provide basic business details: vintage (years in operation), annual turnover, monthly revenue",
      "Answer simple questions about existing loans and business obligations",
      "Share financial overview to assess loan eligibility and determine your personalized rate",
    ],
  },
  {
    steps: "Step 3",
    title: "Send us the Documents",
    items: [
      "Firstly, it is mandatory to send us the quotation as well as Proforma Invoice of the equipment which you are financing.",
      "Once the quotation gets approved, submit all required documents as per the documentation checklist provided during application",
      "Our team will guide you on which documents strengthen your application",
    ],
  },
  {
    steps: "Step 4",
    title: "Credit Assessment & Verification",
    items: [
      "Our team reviews your profile, documents and equipment condition.",
      "CIBIL score is checked (soft inquiry, no impact on your credit)",
      "Financial assessment completed",
      "We may contact you for clarifications or schedule a quick call",
    ],
  },
  {
    steps: "Step 5",
    title: "Approval & Sanction (Within 48 hours of verification)",
    items: [
      "If approved, you receive a sanction letter with loan terms",
      "All details: loan amount, interest rate, EMI, tenure, charges",
      "Review terms carefully, ask questions if anything is unclear",
      "Proceed to agreement stage once you’re confident",
    ],
  },
  {
    steps: "Step 6",
    title: "Disbursal to Your Account (48–72 hours)",
    items: [
      "Once agreement is signed, funds are processed",
      "Loan amount transferred to your registered business bank account",
      "You receive transaction confirmation on registered mobile",
      "Start using funds immediately for your business needs",
    ],
  },
];
export const MachineryTrustedParaData = {
  title:
    "Use our EMI calculator to align equipment investment with your production capacity and cash flow, then apply online for streamlined approval. Ratnaafin makes equipment financing transparent and accessible, whether you're in a tier-1 metro or emerging industrial hub, we deliver financing tailored to your manufacturing needs.",
};
