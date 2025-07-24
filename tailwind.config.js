/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: ['selector', '[class~="dark"]'],  // ".dark" sınıfına göre dark mod aktif olur
  theme: { extend: {} },
  plugins: [require('tailwindcss-primeui')],
};
