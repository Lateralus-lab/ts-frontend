/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "1/4": "25%",
      },
      margin: {
        "60px": "60px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
