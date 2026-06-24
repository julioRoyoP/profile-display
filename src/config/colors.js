// Única fuente de verdad de la paleta (sección 5). La consume tailwind.config.js
// para generar las clases (bg-surface, text-secondary, …) y los pocos puntos
// donde el estilo debe ser inline y no se puede usar una clase de Tailwind
// (p. ej. react-syntax-highlighter, que recibe objetos de estilo JS).
export const COLORS = {
  base: '#0D1117',
  surface: '#161B22',
  line: '#30363D',
  teal: '#4FD1C5',
  amber: '#E3B341',
  textPrimary: '#F0F6FC',
  textSecondary: '#8B949E',
};
