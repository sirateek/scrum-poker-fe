/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "google-account-grey": "#2D2F31",
      },
      flex: {
        4: "4 4 0%",
      },
      gridTemplateRows: {
        contractorGrid: "13% 73% 0%",
      },
    },
  },
  plugins: [],
};
