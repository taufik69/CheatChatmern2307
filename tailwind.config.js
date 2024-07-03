/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        auth_primary_Color: "#11175D",
        auth_secondary_color: "rgba(0, 0, 0, 0.50)",
        primaryBlue: "#5F35F5",
        textPrimaryColor: '#000000'
        
      },
      fontFamily: {
        Custom_nunito: ["Nunito", "sans-serif"],
        custom_poppins : ["Poppins", "sans-serif"]
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
