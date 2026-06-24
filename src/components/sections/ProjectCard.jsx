import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ArchitectureDiagram from './ArchitectureDiagram.jsx';

// Card individual de proyecto. Recibe los datos por props destructuradas.
// Muestra nombre, descripción, chips de stack y enlaces si existen. Si el
// proyecto tiene diagrama de arquitectura, expone una acción para expandir el
// ArchitectureDiagram (animado con Framer Motion).
const ProjectCard = ({ name, type, description, stack, hasArchitectureDiagram, githubRepo, demoUrl }) => {
  const [showDiagram, setShowDiagram] = useState(false);
  const diagramId = useId();

  return (
    <article className="rounded-lg border border-line bg-surface p-5 transition-colors duration-200 hover:border-teal/50">
      <header className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 className="font-mono text-lg font-semibold text-text-primary">{name}</h3>
        {type ? (
          <span className="rounded border border-line px-2 py-0.5 font-mono text-xs text-text-secondary">
            {type}
          </span>
        ) : null}
      </header>

      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{description}</p>

      {stack?.length ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-base px-3 py-1 font-mono text-xs text-teal"
            >
              {tech}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <ProjectLink href={githubRepo} label="Repositorio" />
        <ProjectLink href={demoUrl} label="Demo" />

        {hasArchitectureDiagram ? (
          <button
            type="button"
            onClick={() => setShowDiagram((prev) => !prev)}
            aria-expanded={showDiagram}
            aria-controls={diagramId}
            className="rounded border border-line px-4 py-2 font-mono text-sm text-text-primary transition-colors duration-200 hover:border-teal hover:text-teal"
          >
            {showDiagram ? 'Ocultar arquitectura' : 'Ver arquitectura'}
          </button>
        ) : null}
      </div>

      {hasArchitectureDiagram ? (
        <AnimatePresence initial={false}>
          {showDiagram ? (
            <motion.div
              id={diagramId}
              key="diagram"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-5">
                <ArchitectureDiagram />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </article>
  );
};

// Enlace del proyecto. No se renderiza si no hay href (githubRepo/demoUrl pueden
// ser null).
const ProjectLink = ({ href, label }) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="rounded border border-line bg-base px-4 py-2 font-mono text-sm text-text-primary transition-colors duration-200 hover:border-teal hover:text-teal"
    >
      {label}
    </a>
  );
};

export default ProjectCard;
