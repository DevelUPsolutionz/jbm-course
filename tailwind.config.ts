import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
        accent: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
        sora: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        editorial: ["var(--font-serif)", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
      },
      colors: {
        background: "#ffffff",
        foreground: "#09090b",
        maroon: {
          50: "#fdf2f4",
          100: "#fce7ea",
          200: "#fad0d7",
          300: "#f4aab7",
          400: "#eb778d",
          500: "#dc4465",
          600: "#be1d45",
          700: "#9e1336",
          800: "#800020", // Official JBM Logo Maroon
          850: "#6e041e",
          900: "#58041a",
          950: "#38010f",
        },
        brand: {
          50: "#fdf2f4",
          100: "#fce7ea",
          200: "#fad0d7",
          300: "#f4aab7",
          400: "#eb778d",
          500: "#dc4465",
          600: "#800020", // Primary JBM Maroon
          700: "#6e041e",
          800: "#58041a",
          900: "#38010f",
        },
        dark: {
          900: "#09090b",
          950: "#000000",
        }
      },
      boxShadow: {
        "maroon-sm": "0 2px 8px -1px rgba(128, 0, 32, 0.08)",
        "maroon-md": "0 8px 24px -4px rgba(128, 0, 32, 0.12)",
        "maroon-lg": "0 16px 36px -6px rgba(128, 0, 32, 0.18)",
        "card-hover": "0 20px 40px -12px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 5s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out both",
        "fade-in": "fadeIn 0.5s ease-out both",
        "slide-in-left": "slideInLeft 0.5s ease-out both",
        "slide-in-right": "slideInRight 0.5s ease-out both",
        "scale-in": "scaleIn 0.4s ease-out both",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.93)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      transitionDelay: {
        "100": "100ms",
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
      },
    },
  },
  plugins: [],
};

export default config;
