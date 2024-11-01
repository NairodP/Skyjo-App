import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      zillaSlab: ["var(--font-zilla-slab)"],
    },
    extend: {
      backgroundImage: {
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "custom-purple": "#a430c8",
        "custom-blue": "#1a326e",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  animation: {
    first: "moveVertical 30s ease infinite",
    second: "moveInCircle 20s reverse infinite",
    third: "moveInCircle 40s linear infinite",
    fourth: "moveHorizontal 40s ease infinite",
    fifth: "moveInCircle 20s ease infinite",
    disco: "disco 4s linear infinite",
    glow: "glow 2s ease-in-out infinite alternate",
  },

  keyframes: {
    disco: {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
    glow: {
      "0%": { opacity: 0.5, transform: "scale(0.95)" },
      "100%": { opacity: 1, transform: "scale(1.05)" },
    },
    moveHorizontal: {
      "0%": {
        transform: "translateX(-50%) translateY(-10%)",
      },
      "50%": {
        transform: "translateX(50%) translateY(10%)",
      },
      "100%": {
        transform: "translateX(-50%) translateY(-10%)",
      },
    },
    moveInCircle: {
      "0%": {
        transform: "rotate(0deg)",
      },
      "50%": {
        transform: "rotate(180deg)",
      },
      "100%": {
        transform: "rotate(360deg)",
      },
    },
    moveVertical: {
      "0%": {
        transform: "translateY(-50%)",
      },
      "50%": {
        transform: "translateY(50%)",
      },
      "100%": {
        transform: "translateY(-50%)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
export default config;
