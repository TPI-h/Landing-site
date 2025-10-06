import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Hotel-specific colors
        gold: {
          50: "hsl(45, 95%, 95%)",
          100: "hsl(45, 90%, 88%)",
          200: "hsl(45, 85%, 75%)",
          300: "hsl(45, 80%, 65%)",
          400: "hsl(45, 75%, 55%)",
          500: "hsl(var(--gold))",
          600: "hsl(43, 70%, 45%)",
          700: "hsl(41, 65%, 35%)",
          800: "hsl(39, 60%, 25%)",
          900: "hsl(37, 55%, 15%)",
          DEFAULT: "hsl(var(--gold))",
          light: "hsl(var(--gold-light))",
        },
        cream: {
          50: "hsl(30, 60%, 99%)",
          100: "hsl(30, 55%, 96%)",
          200: "hsl(30, 50%, 92%)",
          300: "hsl(30, 45%, 88%)",
          400: "hsl(30, 40%, 84%)",
          500: "hsl(var(--cream))",
          DEFAULT: "hsl(var(--cream))",
        },
        navy: {
          50: "hsl(150, 45%, 95%)",
          100: "hsl(150, 40%, 88%)",
          200: "hsl(150, 38%, 75%)",
          300: "hsl(150, 36%, 62%)",
          400: "hsl(150, 34%, 49%)",
          500: "hsl(var(--navy))",
          600: "hsl(150, 40%, 15%)",
          700: "hsl(150, 45%, 12%)",
          800: "hsl(150, 50%, 9%)",
          900: "hsl(150, 55%, 6%)",
          DEFAULT: "hsl(var(--navy))",
          light: "hsl(var(--navy-light))",
        },
        amber: {
          100: "hsl(43, 90%, 88%)",
          200: "hsl(43, 85%, 75%)",
          300: "hsl(43, 80%, 62%)",
          400: "hsl(43, 75%, 55%)",
          500: "hsl(43, 70%, 48%)",
          600: "hsl(43, 65%, 40%)",
        },
        green: {
          primary: "hsl(var(--green-primary))",
          secondary: "hsl(var(--green-secondary))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-section': 'var(--gradient-section)',
        'gradient-overlay': 'var(--gradient-overlay)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'hover': 'var(--shadow-hover)',
      },
      transitionTimingFunction: {
        'smooth': 'var(--transition-smooth)',
        'bounce': 'var(--transition-bounce)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "shimmer": {
          "0%": {
            backgroundPosition: "-1000px 0",
          },
          "100%": {
            backgroundPosition: "1000px 0",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 5px hsl(var(--gold))",
          },
          "50%": {
            boxShadow: "0 0 20px hsl(var(--gold)), 0 0 30px hsl(var(--gold))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "fade-in-down": "fade-in-down 0.6s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
