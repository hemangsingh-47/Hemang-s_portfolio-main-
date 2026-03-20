/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'accent': 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'border-color': 'var(--border)',
        'card-bg': 'var(--card-bg)',
        'nav-bg': 'var(--nav-bg)',
        'bg-footer': 'var(--footer-bg)',
        
        // Alias existing color variables to automatically support Theme Toggle
        'sage': 'var(--border)',
        'soft-lime': 'var(--bg-tertiary)',
        'cream': 'var(--bg-primary)',
        'peach': 'var(--bg-secondary)',
        'gold': 'var(--accent)',
        
        // Override standard slate colors used in text styling across app
        'slate': {
          300: 'var(--text-muted)',
          400: 'var(--text-muted)',
          500: 'var(--text-muted)',
          600: 'var(--text-secondary)',
          700: 'var(--text-secondary)',
          800: 'var(--text-primary)',
          900: 'var(--text-primary)'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
