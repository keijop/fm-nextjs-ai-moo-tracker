/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'custom-black': '#27232c',
        'custom-green-1': '#bee0d6',
        'custom-green-2': '#71EAC6',
        'custom-green-3': '#254b45',
        'custom-green-4': '#acffe6',
        'custom-red-1': '#d32f2f',
        'custom-red-2': '#e53935',
      },
    },
  },
  plugins: [],
};
