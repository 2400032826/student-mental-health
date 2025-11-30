/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",          // Blue (Student)
        secondary: "#10b981",        // Green (Actions)
        accent: "#f59e0b",           // Orange (Highlights)

        adminPrimary: "#4f46e5",     // Indigo (Admin)
        adminSecondary: "#d97706",   // Amber (Admin Accent)

        softBg: "#f3f4f6",
        cardBg: "rgba(255,255,255,0.7)",
      },

      backdropBlur: {
        xs: "2px",
      },

      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.08)",
        medium: "0 6px 18px rgba(0,0,0,0.12)",
        glass: "0 8px 32px rgba(0,0,0,0.20)",
      },

      borderRadius: {
        xl: "1rem",
      },

      animation: {
        fadeIn: "fadeIn 0.8s ease-out",
        slideUp: "slideUp 0.6s ease-out",
        scaleIn: "scaleIn 0.4s ease-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },

        slideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },

        scaleIn: {
          "0%": { opacity: 0, transform: "scale(0.85)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
