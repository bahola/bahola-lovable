import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Bahola Labs Brand Colors - Finalized System
				bahola: {
					// Primary: Bahola Navy Blue #003366
					navy: {
						DEFAULT: '#003366',
						50: '#e6f0ff',
						100: '#b3d1ff',
						200: '#80b3ff',
						300: '#4d94ff',
						400: '#1a75ff',
						500: '#003366',
						600: '#002952',
						700: '#001f3d',
						800: '#001429',
						900: '#000a14',
					},
					// Secondary: Steel Blue #4A90A4
					steel: {
						DEFAULT: '#4A90A4',
						50: '#eef6f8',
						100: '#d4e8ed',
						200: '#a9d1db',
						300: '#7ebaca',
						400: '#64a7ba',
						500: '#4A90A4',
						600: '#3b7383',
						700: '#2c5662',
						800: '#1e3a42',
						900: '#0f1d21',
					},
					// Accent: Warm Gold/Bronze #D4A574
					gold: {
						DEFAULT: '#D4A574',
						50: '#faf6f1',
						100: '#f5ede3',
						200: '#ebdbc7',
						300: '#e1c9ab',
						400: '#d7b78f',
						500: '#D4A574',
						600: '#aa845d',
						700: '#7f6346',
						800: '#55422e',
						900: '#2a2117',
					},
					// Accent: Sage Green #7FB069
					sage: {
						DEFAULT: '#7FB069',
						50: '#f2f7ef',
						100: '#e5efdf',
						200: '#cbdfbf',
						300: '#b1cf9f',
						400: '#97bf7f',
						500: '#7FB069',
						600: '#668c54',
						700: '#4c693f',
						800: '#33462a',
						900: '#192315',
					},
					// Neutral: Deep Charcoal #2C3E50
					charcoal: {
						DEFAULT: '#2C3E50',
						50: '#ebeef1',
						100: '#d7dde3',
						200: '#afbbc7',
						300: '#8799ab',
						400: '#5f778f',
						500: '#2C3E50',
						600: '#233240',
						700: '#1a2530',
						800: '#121920',
						900: '#090c10',
					},
					// Neutral: Soft White #F8F9FA
					white: {
						DEFAULT: '#F8F9FA',
					},
					// Neutral: Light Grey #E9ECEF
					grey: {
						DEFAULT: '#E9ECEF',
						light: '#F8F9FA',
						medium: '#E9ECEF',
						dark: '#6c757d',
					},
					// Keep compatibility aliases
					cream: {
						DEFAULT: '#F8F9FA',
						100: '#F8F9FA',
					},
					neutral: {
						50: '#F8F9FA',
						100: '#E9ECEF',
						500: '#6c757d',
						800: '#2C3E50',
						900: '#1a2530',
					}
				},
				// Utility Colors
				success: '#28A745',
				warning: '#FFC107',
				error: '#DC3545',
				// Generic Product Page Theme
				generic: {
					forest: 'hsl(var(--generic-forest))',
					sage: 'hsl(var(--generic-sage))',
					cream: 'hsl(var(--generic-cream))',
					sand: 'hsl(var(--generic-sand))',
					gold: 'hsl(var(--generic-gold))',
					charcoal: 'hsl(var(--generic-charcoal))',
				}
			},
			fontFamily: {
				// Bahola Brand Typography System
				'optima': ['Optima', 'Candara', 'Noto Sans', 'source-sans-pro', 'sans-serif'],
				'inter': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				'merriweather': ['Merriweather', 'Georgia', 'serif'],
				// Semantic font aliases
				'headline': ['Optima', 'Candara', 'Noto Sans', 'source-sans-pro', 'sans-serif'],
				'body': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				'serif': ['Merriweather', 'Georgia', 'serif'],
				'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
			},
			fontSize: {
				// Heading sizes with Optima Bold styling
				'h1': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
				'h2': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '700' }],
				'h3': ['1.75rem', { lineHeight: '1.4', letterSpacing: '-0.02em', fontWeight: '700' }],
				// H4-H6 use Inter Bold
				'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '700' }],
				'h5': ['1.25rem', { lineHeight: '1.5', fontWeight: '700' }],
				'h6': ['1.125rem', { lineHeight: '1.5', fontWeight: '700' }],
				// Body text sizes
				'body': ['1.125rem', { lineHeight: '1.7' }],
				'body-sm': ['1rem', { lineHeight: '1.7' }],
				'lead': ['1.375rem', { lineHeight: '1.6', fontWeight: '500' }],
				'caption': ['0.875rem', { lineHeight: '1.5' }],
			},
			letterSpacing: {
				'brand-tight': '-0.02em',
			},
			lineHeight: {
				'brand-body': '1.7',
				'brand-heading': '1.2',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			backgroundImage: {
				'cloud-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJjbG91ZHMiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PHBhdGggZmlsbD0icmdiYSgyNDAsIDI0OSwgMjU1LCAwLjQpIiBkPSJNMTA5LjUgODcuNWMtMi41LTcuNS0xMC42LTEzLTE5LjUtMTNjLTExLjUgMC0yMC45IDkuNC0yMC45IDIwLjljMCAuNiAwIDEuMi4xIDEuN0M2NC45IDk5LjQgNjEgMTA0LjIgNjEgMTEwYzAgNy4yIDUuOCAxMyAxMyAxM2gzNmM3LjIgMCAxMy01LjggMTMtMTNDMTIzIDEwMi4yIDExNy40IDk1LjggMTA5LjUgODcuNXoiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjY2xvdWRzKSIvPjwvc3ZnPg==')",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
