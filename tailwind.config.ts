import type { Config } from "tailwindcss";

const config: Config = {
	safelist: [
		"bg-pastel-blue",
		"bg-pastel-red",
		"bg-pastel-yellow",
		"bg-pastel-green",
		"bg-pastel-purple",
		"bg-pastel-orange",
		"bg-pastel-pink",
		"bg-pastel-teal",
		"bg-pastel-gray",
		"text-blue-900",
		"text-red-900",
		"text-yellow-900",
		"text-green-900",
		"text-purple-900",
		"text-orange-900",
	],
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
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
				// Custom pastel palette
				"pastel-blue": "#a7c7e7",
				"pastel-red": "#ffb3ba",
				"pastel-yellow": "#ffdfba",
				"pastel-green": "#baffc9",
				"pastel-purple": "#d5b3ff",
				"pastel-orange": "#ffd8b5",
				"pastel-pink": "#ffb5e8",
				"pastel-teal": "#b2f7ef",
				"pastel-gray": "#e5e5e5",

				// Red colors (variations of cool red)
				"red-50": "#fef2f3",
				"red-100": "#fde6e9",
				"red-200": "#fbd0d7",
				"red-300": "#f7a8b8",
				"red-400": "#f1758f",
				"red-500": "#c72c48",
				"red-600": "#b31f3a",
				"red-700": "#951a30",
				"red-800": "#7c1729",
				"red-900": "#671524",

				yellow: "#F7C864",
				// Semantic color assignments
				background: "#faf9f7", // warm white background
				foreground: "#1f1c17", // dark gray for text
				primary: {
					DEFAULT: "#a2b2b", // light gray for primary actions
					foreground: "#1f1c17", // dark gray text
				},
				secondary: {
					DEFAULT: "#f5f3f0", // very light cream for secondary actions
					foreground: "#1f1c17", // dark gray text
				},
				accent: {
					DEFAULT: "#c72c48", // red for highlights/CTAs
					foreground: "#ffffff", // white text
				},
				muted: {
					DEFAULT: "#e8e6e1", // light warm gray for disabled states
					foreground: "#1f1c17", // dark gray text
				},
				card: {
					DEFAULT: "#ffffff", // white for cards
					foreground: "#1f1c17", // dark gray text
				},
				border: "#a2b2b", // light gray for borders
				input: "#a2b2b", // light gray for inputs
				ring: "#da4444", // red for focus rings
				destructive: {
					DEFAULT: "#da4444", // red for destructive actions
					foreground: "#ffffff", // white text
				},
				popover: {
					DEFAULT: "#ffffff", // white for popovers
					foreground: "#1f1c17", // dark gray text
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			fontFamily: {
				sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
				serif: ["var(--font-cardo)", "serif"],
			},
			fontSize: {
				"2xs": ["0.625rem", { lineHeight: "1.15" }], // 10px
				xs: ["0.75rem", { lineHeight: "1.15" }], // 12px
				sm: ["0.875rem", { lineHeight: "1.25" }], // 14px
				base: ["1rem", { lineHeight: "1.5" }], // 16px
				md: ["1.125rem", { lineHeight: "1.6" }], // 18px
				lg: ["1.25rem", { lineHeight: "1.7" }], // 20px
				xl: ["1.5rem", { lineHeight: "1.2" }], // 24px
				"2xl": ["2rem", { lineHeight: "1.2" }], // 32px
				"3xl": ["2.5rem", { lineHeight: "1.1" }], // 40px
				"4xl": ["3rem", { lineHeight: "1.1" }], // 48px
				"5xl": ["3.75rem", { lineHeight: "1.1" }], // 60px
			},
		},
	},
	plugins: [],
} satisfies Config;

export default config;
