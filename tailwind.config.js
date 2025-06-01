// // tailwind.config.js
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}",  // ⬅️ penting untuk app router
//     // "./pages/**/*.{js,ts,jsx,tsx}",
//     // "./components/**/*.{js,ts,jsx,tsx}"
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
