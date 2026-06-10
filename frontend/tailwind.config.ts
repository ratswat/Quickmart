/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16a34a',
        secondary: '#2563eb',
        danger: '#dc2626',
        success: '#10b981',
        warning: '#f59e0b',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
};
