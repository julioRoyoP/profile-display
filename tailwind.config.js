import { COLORS } from './src/config/colors.js';

/** @type {import('tailwindcss').Config} */
// Los tokens de color viven en src/config/colors.js (única fuente de verdad,
// sección 5): Tailwind los lee de ahí para generar las clases, y los puntos con
// estilo inline inevitable (syntax highlighter) consumen la misma constante.
// Ningún componente debe hardcodear valores hex.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: COLORS.base, // fondo general
        surface: COLORS.surface, // cajas, cards, nodos
        line: COLORS.line, // líneas de conexión, separadores
        teal: COLORS.teal, // acento primario
        amber: COLORS.amber, // acento secundario
        'text-primary': COLORS.textPrimary, // texto principal
        'text-secondary': COLORS.textSecondary, // texto secundario, metadatos
      },
      fontFamily: {
        // display/etiquetas/código
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
        // cuerpo / contenido largo
        sans: ['Inter', '"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
