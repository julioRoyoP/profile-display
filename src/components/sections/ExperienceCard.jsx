import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Card individual de una experiencia profesional. Recibe los datos por props
// destructuradas y gestiona su propio estado de expandido/colapsado.
// El detalle (summary, architectureNotes, highlight) se anima con Framer Motion
// (altura + opacidad), transición suave.
const ExperienceCard = ({ company, sector, role, period, summary, architectureNotes, highlight }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailId = useId();

  return (
    <article className="rounded-lg border border-line bg-surface transition-colors duration-200 hover:border-teal/50">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-controls={detailId}
        className="flex w-full items-start justify-between gap-4 rounded-lg px-5 py-4 text-left"
      >
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-base font-semibold text-text-primary">
              {role}
            </span>
            {sector ? (
              <span className="rounded border border-line px-2 py-0.5 font-mono text-xs text-text-secondary">
                {sector}
              </span>
            ) : null}
          </span>
          <span className="mt-1 block text-sm text-text-secondary">{company}</span>
        </span>

        <span className="flex shrink-0 items-center gap-3">
          <span className="font-mono text-xs text-text-secondary">
            {period?.from} — {period?.to}
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-teal"
          >
            ›
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            id={detailId}
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-line px-5 py-4">
              <DetailBlock label="Resumen" text={summary} />
              <DetailBlock label="Arquitectura y decisiones" text={architectureNotes} />
              <DetailBlock label="Highlight" text={highlight} accent />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
};

// Bloque etiquetado del detalle de la card. No se renderiza si no hay texto.
const DetailBlock = ({ label, text, accent = false }) => {
  if (!text) return null;

  return (
    <div>
      <span
        className={`font-mono text-xs uppercase tracking-widest ${
          accent ? 'text-amber' : 'text-teal'
        }`}
      >
        {label}
      </span>
      <p className="mt-1 text-sm leading-relaxed text-text-secondary">{text}</p>
    </div>
  );
};

export default ExperienceCard;
