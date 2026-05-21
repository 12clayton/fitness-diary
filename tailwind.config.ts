import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8F1",
        blush: "#F7D9CF",
        rosewood: "#7A4C48",
        cocoa: "#4C3833",
        moss: "#71836D",
        oat: "#E8D7C3",
        honey: "#D99E57",
        linen: "#FDF4E8"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(76, 56, 51, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
