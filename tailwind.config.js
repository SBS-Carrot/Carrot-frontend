/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  variants: {
    extend: {
      backgroundColor: ["active", "group-hover"],
      // ...
      borderColor: ["focus-visible", "first", "group-hover"],
      // ...
      textColor: ["visited", "group-hover"],
    },
  },

  plugins: [require("daisyui")],
};
