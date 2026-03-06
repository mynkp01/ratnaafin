const ExploreIcon = ({ ...props }) => (
  <svg width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width={48} height={48} rx={6.33333} fill="url(#paint0_linear_423_559)" />
    <path
      d="M39 18L38.4028 18.4628C29.7007 25.2069 17.4855 25.0146 9 18V18"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id="paint0_linear_423_559" x1={24} y1={0} x2={24} y2={48} gradientUnits="userSpaceOnUse">
        <stop stopColor="#0570B3" />
        <stop offset={1} stopColor="#1EB259" />
      </linearGradient>
    </defs>
  </svg>
);
export default ExploreIcon;
