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
				// Bahola Brand Colors from Brand Book
				bahola: {
					navy: {
						50: '#f0f4f8',
						100: '#d9e2ec',
						200: '#bcccdc',
						300: '#9fb3c8',
						400: '#829ab1',
						500: '#627d98',
						600: '#486581',
						700: '#334e68',
						800: '#243b53',
						900: '#102a43',
						950: '#003366',
					},
					blue: {
						50: '#e6f3ff',
						100: '#b3d9ff',
						200: '#80bfff',
						300: '#4da6ff',
						400: '#1a8cff',
						500: '#0066CC',
						600: '#0052a3',
						700: '#003d7a',
						800: '#002952',
						900: '#001429',
					},
					sky: {
						50: '#f0f7ff',
						100: '#d4e9ff',
						200: '#a8d4ff',
						300: '#7cbfff',
						400: '#50aaff',
						500: '#4A90E2',
						600: '#3b73b5',
						700: '#2c5688',
						800: '#1d395b',
						900: '#0e1c2e',
					},
					teal: {
						50: '#e6f7f9',
						100: '#b3e6ec',
						200: '#80d5df',
						300: '#4dc4d2',
						400: '#1ab3c5',
						500: '#17A2B8',
						600: '#128293',
						700: '#0e626e',
						800: '#094149',
						900: '#052124',
					},
					green: {
						50: '#e8f5e8',
						100: '#c3e6c3',
						200: '#9ed79e',
						300: '#79c879',
						400: '#54b954',
						500: '#28A745',
						600: '#208637',
						700: '#186529',
						800: '#10441b',
						900: '#08220d',
					},
					orange: {
						50: '#fff4f0',
						100: '#ffddd1',
						200: '#ffbba3',
						300: '#ff9975',
						400: '#ff7747',
						500: '#FF6B35',
						600: '#cc562a',
						700: '#99401f',
						800: '#662b15',
						900: '#33150a',
					},
					amber: {
						50: '#fffbf0',
						100: '#fff3c4',
						200: '#ffe899',
						300: '#ffdc6d',
						400: '#ffd042',
						500: '#FFC107',
						600: '#cc9a06',
						700: '#997404',
						800: '#664d03',
						900: '#332701',
					},
					neutral: {
						50: '#f8f9fa',
						100: '#f1f3f4',
						200: '#e8eaed',
						300: '#dadce0',
						400: '#bdc1c6',
						500: '#9aa0a6',
						600: '#80868b',
						700: '#5f6368',
						800: '#3c4043',
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
