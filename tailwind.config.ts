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
				// Bahola Labs Brand Colors - New Brand System
				bahola: {
					// Primary: Bahola Deep Green
					green: {
						DEFAULT: '#1B4332',
						50: '#e8f5f0',
						100: '#c6e6d9',
						200: '#a0d4c0',
						300: '#7ac2a7',
						400: '#54b08e',
						500: '#2e9e75',
						600: '#1B4332',
						700: '#163828',
						800: '#112c1f',
						900: '#0b1f15',
					},
					// Secondary: Heritage Cream
					cream: {
						DEFAULT: '#F8F6F0',
						50: '#FDFCFA',
						100: '#F8F6F0',
						200: '#F0EDE3',
						300: '#E8E4D6',
						400: '#E0DBC9',
						500: '#D8D2BC',
					},
					// Charcoal Grey
					charcoal: {
						DEFAULT: '#2D3436',
						50: '#f4f5f5',
						100: '#e3e5e5',
						200: '#c7caca',
						300: '#abaeb0',
						400: '#8f9395',
						500: '#73777a',
						600: '#5b5f61',
						700: '#444748',
						800: '#2D3436',
						900: '#161a1b',
					},
					// Warm Grey
					grey: {
						DEFAULT: '#95918E',
						light: '#c5c3c1',
						dark: '#656361',
					},
					// Trust Blue
					blue: {
						DEFAULT: '#2C5F7C',
						50: '#e9f1f5',
						100: '#c8dce6',
						200: '#a4c6d6',
						300: '#80b0c6',
						400: '#5c9ab6',
						500: '#3884a6',
						600: '#2C5F7C',
						700: '#234b62',
						800: '#1a3749',
						900: '#11242f',
					},
					// Utility Colors
					success: '#52796F',
					amber: '#D4A574',
					error: '#A63D40',
					// Keep neutral for compatibility
					neutral: {
						50: '#F8F6F0',
						100: '#f1f3f4',
						200: '#e8eaed',
						300: '#dadce0',
						400: '#bdc1c6',
						500: '#95918E',
						600: '#80868b',
						700: '#5f6368',
						800: '#2D3436',
						900: '#202124',
					}
				},
				// Generic Product Page Theme (Forest Green)
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
				// Brand Book Typography System - Updated to use Proxima Nova
				'helvetica': ['Inter', 'Helvetica Neue', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				'proxima': ['Proxima Nova', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				// Keep existing fallbacks
				sans: ['Proxima Nova', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				serif: ['Proxima Nova', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
			},
			letterSpacing: {
				'brand-tight': '-0.02em',
			},
			lineHeight: {
				'brand-body': '1.5',
				'brand-content': '1.6',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
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
