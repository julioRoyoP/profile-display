import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // El chunk del Code Explorer (react-syntax-highlighter / Prism con todos los
    // lenguajes) supera el umbral por defecto de 500 kB. Es una decisión
    // consciente: Prism completo permite resaltar cualquier extensión sin tocar
    // código, y el chunk se carga de forma diferida solo en la ruta del
    // explorador (nunca en la carga inicial de la Home). Subimos el umbral del
    // aviso para que el build quede limpio sin ocultar problemas reales.
    chunkSizeWarningLimit: 700,
  },
});
