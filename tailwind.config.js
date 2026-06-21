/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta base (CLAUDE.md). Lu puede ajustar acá.
        primary: '#FE688E', // rosa fuerte
        secondary: '#C4E6FF', // celeste
        accent: '#FFF48A', // amarillo crema
        blush: '#FECFD9', // rosa claro
        dark: '#1A1320', // texto/oscuro (violeta muy oscuro, cálido)
        light: '#FFFBFD', // base clara cálida
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'gradient-pan': 'gradient-pan 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
