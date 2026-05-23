import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rice: "#f7f0e3",
        ink: "#213547",
        cinnabar: "#b6492f",
        gold: "#d5a24a",
        mist: "#cddaea",
        moss: "#708663",
        clay: "#b07a4a"
      },
      boxShadow: {
        card: "0 18px 50px rgba(38, 36, 31, 0.12)",
        glow: "0 0 0 1px rgba(182, 73, 47, 0.08), 0 20px 60px rgba(33, 53, 71, 0.18)"
      },
      backgroundImage: {
        "longtan-paper":
          "radial-gradient(circle at top left, rgba(213,162,74,0.18), transparent 28%), radial-gradient(circle at 80% 8%, rgba(182,73,47,0.12), transparent 22%), linear-gradient(180deg, #fbf7ef 0%, #f1e6d2 48%, #e8dbc5 100%)",
        "longtan-hero":
          "linear-gradient(135deg, rgba(247,240,227,0.98) 0%, rgba(232,219,197,0.94) 35%, rgba(205,218,234,0.92) 68%, rgba(33,53,71,0.12) 100%)"
      },
      fontFamily: {
        serif: ["'Noto Serif SC'", "'Songti SC'", "'STSong'", "serif"],
        sans: ["'Noto Sans SC'", "'PingFang SC'", "'Hiragino Sans GB'", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
