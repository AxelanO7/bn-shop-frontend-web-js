/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        t_white: "#F8F6F4",
        light_green: "#9DC08B",
        green: "#609966",
        dark_green: "#40513B",
      },
      borderColor: {
        dark_green: "#40513B",
      },
    },
  },
  plugins: [],
};
