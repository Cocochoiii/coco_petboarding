/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // 主色调 - 优雅的深绿色系
                primary: {
                    DEFAULT: "#0F766E",  // 深青绿色
                    50: "#f0fdfa",
                    100: "#ccfbf1",
                    200: "#99f6e4",
                    300: "#5eead4",
                    400: "#2dd4bf",
                    500: "#14b8a6",
                    600: "#0d9488",
                    700: "#0F766E",  // 主色
                    800: "#115e59",
                    900: "#134e4a",
                    950: "#042f2e"
                },
                // 中性色 - 精致的灰色系
                neutral: {
                    DEFAULT: "#6B7280",
                    50: "#F9FAFB",
                    100: "#F3F4F6",
                    150: "#EAECF0",
                    200: "#E5E7EB",
                    300: "#D1D5DB",
                    400: "#9CA3AF",
                    500: "#6B7280",
                    600: "#4B5563",
                    700: "#374151",
                    800: "#1F2937",
                    900: "#111827",
                    950: "#030712"
                },
                // 功能色 - 极简配色
                success: "#059669",
                warning: "#D97706",
                error: "#DC2626",
                info: "#0891B2",
                // 背景和边框
                background: {
                    DEFAULT: "#FFFFFF",
                    secondary: "#F9FAFB",
                    tertiary: "#F3F4F6"
                },
                border: {
                    DEFAULT: "#E5E7EB",
                    light: "#F3F4F6",
                    dark: "#D1D5DB"
                }
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["Poppins", "system-ui", "sans-serif"],
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1.16' }],
                '6xl': ['3.75rem', { lineHeight: '1.16' }],
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "fade-up": "fadeUp 0.5s ease-out",
                "fade-down": "fadeDown 0.5s ease-out",
                "slide-in-right": "slideInRight 0.5s ease-out",
                "scale-up": "scaleUp 0.3s ease-out",
                "float": "float 6s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeDown: {
                    "0%": { opacity: "0", transform: "translateY(-10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideInRight: {
                    "0%": { opacity: "0", transform: "translateX(-20px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                scaleUp: {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                }
            },
            boxShadow: {
                'soft-xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                'soft-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
                'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                'soft-md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
                'soft-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
                'soft-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'subtle-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            },
        },
    },
    plugins: [],
}