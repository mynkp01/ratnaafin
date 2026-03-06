/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  corePlugins: {
    preflight: true,
  },
  theme: {
    screens: {
      xxs: "320px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      // screens: {
      //   "xxs-h": { raw: "(min-height: 320px)" },
      //   "xs-h": { raw: "(min-height: 480px)" },
      //   "sm-h": { raw: "(min-height: 640px)" },
      //   "md-h": { raw: "(min-height: 768px)" },
      //   "lg-h": { raw: "(min-height: 1024px)" },
      //   "xl-h": { raw: "(min-height: 1280px)" },
      //   "2xl-h": { raw: "(min-height: 1536px)" },
      // },
      fontFamily: {
        jost: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#EFEFEF",
          100: "#FCFCFC",
          200: "#F4F4F3",
          400: "#1EB259",
          500: "#6F767E",
          800: "#1A1D1F",
        },
        secondary: {
          600: "#046EB6",
        },
        tertiary: {
          500: "#525252",
        },
        quaternary: {
          200: "#f8f8f8",
        },
        quinary: {
          100: "#12284B",
        },
        senary: {
          100: "#CCD6ED",
        },
        senarylight: {
          50: "#EEF3FF",
        },
        green: {
          300: "#27A376",
        },
        blue: {
          100: "#2A85FF",
          300: "#2F78EE",
        },
        red: {
          300: "#E03137",
        },
        grey: {
          100: "#818181",
          200: "#545454",
          900: "#979696",
        },
      },
      keyframes: {
        jump: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10%)" },
        },
      },
      animation: {
        jump: "jump 0.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
