// tailwind.config.js

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "node_modules/sonner/**/*.js",         // ✅ Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;


// // tailwind.config.js

// /** @type {import('tailwindcss').Config} */
// const config = {
//   darkMode: "class",
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// export default config;
