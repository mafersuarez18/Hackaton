/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bnc-blue": "var(--bnc-blue)",
        "bnc-orange": "var(--bnc-orange)",
        "bnc-green": "var(--bnc-green)",
        blue: {
          900: "var(--bnc-blue)",
          800: "var(--bnc-blue)",
          700: "var(--bnc-blue)",
          600: "var(--bnc-blue)",
          500: "var(--bnc-blue)",
          300: "var(--bnc-blue)",
          100: "var(--bnc-blue)",
          50: "var(--bnc-blue)",
        },
        orange: {
          700: "var(--bnc-orange)",
          600: "var(--bnc-orange)",
          500: "var(--bnc-orange)",
          300: "var(--bnc-orange)",
          200: "var(--bnc-orange)",
          50: "var(--bnc-orange)",
        },
        green: {
          700: "var(--bnc-green)",
          600: "var(--bnc-green)",
          400: "var(--bnc-green)",
          300: "var(--bnc-green)",
        },
        /* Map other accent colors to corporate palette to keep consistent */
        purple: { 600: "var(--bnc-blue)" },
        cyan: { 600: "var(--bnc-blue)", 50: "var(--bnc-blue)" },
        teal: { 600: "var(--bnc-blue)" },
        yellow: { 600: "var(--bnc-orange)", 50: "var(--bnc-orange)" },
        red: { 600: "var(--bnc-orange)" },
      },
    },
  },
  plugins: [],
};
