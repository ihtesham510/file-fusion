import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				'supreme-thin': ['Supreme-Thin', 'sans-serif'],
				'supreme-thin-italic': ['Supreme-ThinItalic', 'sans-serif'],
				'supreme-extralight': ['Supreme-Extralight', 'sans-serif'],
				'supreme-extralight-italic': ['Supreme-ExtralightItalic', 'sans-serif'],
				'supreme-light': ['Supreme-Light', 'sans-serif'],
				'supreme-light-italic': ['Supreme-LightItalic', 'sans-serif'],
				'supreme-regular': ['Supreme-Regular', 'sans-serif'],
				'supreme-italic': ['Supreme-Italic', 'sans-serif'],
				'supreme-medium': ['Supreme-Medium', 'sans-serif'],
				'supreme-medium-italic': ['Supreme-MediumItalic', 'sans-serif'],
				'supreme-bold': ['Supreme-Bold', 'sans-serif'],
				'supreme-bold-italic': ['Supreme-BoldItalic', 'sans-serif'],
				'supreme-extrabold': ['Supreme-Extrabold', 'sans-serif'],
				'supreme-extrabold-italic': ['Supreme-ExtraboldItalic', 'sans-serif'],
				'supreme-variable': ['Supreme-Variable', 'sans-serif'],
				'supreme-variable-italic': ['Supreme-VariableItalic', 'sans-serif'],
				'pally-regular': ['Pally-Regular', 'sans-serif'],
				'pally-medium': ['Pally-Medium', 'sans-serif'],
				'pally-bold': ['Pally-Bold', 'sans-serif'],
				'pally-variable': ['Pally-Variable', 'sans-serif'],
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
export default config
