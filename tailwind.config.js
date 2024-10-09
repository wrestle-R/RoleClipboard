/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "*.html", // Adjust the path as necessary for your project structure
    "./public/index.html",   // Include your HTML files
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}



