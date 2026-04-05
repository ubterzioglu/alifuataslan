import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0A1A33",
        gold: "#B08D57",
        surface: "#F8FAFC",
        ink: "#121826",
      },
    },
  },
  plugins: [],
};

export default config;
