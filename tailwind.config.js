/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/public/**/*.html",
    "./src/components/**/*.{js,jsx}",
    "./src/layout/*.{js,jsx}",
    "./pages/**/*.[js,jsx]"
  ],
  plugins: [
    require("daisyui"),
    function( {addBase }) {
      addBase({
        'html': { fontSize: "14px" },
      })
    }
  ],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
};