import { motion } from 'framer-motion';
import { SECTIONS, SECTION_IDS } from '../../config/sections.js';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import NodeBadge from './NodeBadge.jsx';

// SIGNATURE ELEMENT — diagrama de nodos conectados (sección 5, nivel 2).
// En desktop es una columna lateral fija con etiquetas que ilustra la estructura
// del sitio (Inicio → Experiencia → Proyectos → Skills → Contacto) y resalta el
// nodo de la sección visible. En mobile colapsa a una columna vertical compacta
// (rail izquierdo) con una línea conectora simple y solo los nodos (sección 10).
//
// La navegación funcional sigue siendo scroll + anchors: cada nodo es un enlace
// al ancla de su sección.
const SystemDiagram = () => {
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <>
      {/* Desktop: columna lateral fija */}
      <nav
        aria-label="Mapa de navegación del sitio"
        className="fixed left-0 top-0 z-20 hidden h-screen w-56 flex-col justify-center border-r border-line bg-base/60 px-8 backdrop-blur-sm lg:flex"
      >
        <span className="mb-8 font-mono text-xs uppercase tracking-widest text-text-secondary">
          // estructura
        </span>

        <ol className="relative flex flex-col gap-7">
          {/* Línea conectora vertical detrás de los nodos */}
          <span
            aria-hidden="true"
            className="absolute left-[5px] top-2 bottom-2 w-px bg-line"
          />

          {SECTIONS.map((section) => {
            const isActive = section.id === activeSection;
            return (
              <li key={section.id} className="relative z-10">
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="block rounded"
                >
                  <NodeBadge label={section.label} status={isActive ? 'active' : 'idle'} />
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile: columna vertical compacta (rail izquierdo) */}
      <SystemDiagramMobile activeSection={activeSection} />
    </>
  );
};

// Versión mobile: columna vertical de nodos con línea conectora simple, fija en
// el borde izquierdo. Es estrecha (solo nodos, sin etiquetas) y el layout
// reserva su ancho (padding izquierdo del main), así nunca tapa contenido.
const SystemDiagramMobile = ({ activeSection }) => (
  <nav
    aria-label="Mapa de navegación del sitio"
    className="fixed left-0 top-0 z-20 flex h-screen w-12 flex-col justify-center border-r border-line bg-base/80 backdrop-blur-sm lg:hidden"
  >
    <ol className="relative flex flex-col items-center gap-7">
      {/* Línea conectora vertical detrás de los nodos */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-line"
      />

      {SECTIONS.map((section) => {
        const isActive = section.id === activeSection;
        return (
          <li key={section.id} className="relative z-10">
            <a
              href={`#${section.id}`}
              aria-current={isActive ? 'true' : undefined}
              aria-label={section.label}
              title={section.label}
              className="block rounded-full p-1"
            >
              <motion.span
                aria-hidden="true"
                animate={{ scale: isActive ? 1.25 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`block h-3 w-3 rounded-full border transition-colors duration-300 ${
                  isActive ? 'border-teal bg-teal' : 'border-line bg-surface'
                }`}
              />
            </a>
          </li>
        );
      })}
    </ol>
  </nav>
);

export default SystemDiagram;
