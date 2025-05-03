import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'mountainview-green': '#376452',
        'mountainview-light-green': '#79a17a',
        'ifch-blue': '#1b274f',
        'ifch-light-blue': '#4d5d94',
        'mountainview-brown': '#575656',
        'mountainview-cream': '#e8f4e7'
      },
      textColor: {
        'mountainview-green': '#376452',
        'mountainview-light-green': '#79a17a',
        'ifch-blue': '#1b274f',
      },
      dropShadow: {
        'white': '0 0 20px rgba(0, 0, 0)',
      },
      screens: {  
        'medium': '1400px',
        'smMedium': '1200px',
        'smEighty': '850px',
        'smEdit' : '650px',
        'small': '600px',
        'smaller': '510px',
        'extraSmall': '332px',
      },
      borderColor: { // Add custom border color
        'mountainview-librown': '#b1a59c', // Replace with your custom color
        'mountainview-ligreen': '#79a17a',
      },
    },
  },
  plugins: [],
};
export default config;
