import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Implementación actual de la presentación del razonamiento técnico.
// Recibe ÚNICAMENTE la prop `data` con la forma { summary, alternatives, decision }.
// Toggle "Código" / "Por qué así": en "Código" el panel queda colapsado (el
// código ya lo muestra CodeViewer); en "Por qué así" despliega el razonamiento.
//
// Si no hay razonamiento asociado al fichero (data null/undefined), no renderiza
// nada — sin estado vacío ni placeholder. Es sustituible sin tocar CodeExplorer.
const ReasoningPanel = ({ data }) => {
  const [view, setView] = useState('code');

  if (!data) return null;

  const { summary, alternatives, decision } = data;
  const showReasoning = view === 'why';

  return (
    <div className="rounded-lg border border-line bg-surface">
      <div role="tablist" aria-label="Vista del fichero" className="flex gap-1 border-b border-line p-2">
        <ToggleButton isActive={!showReasoning} onClick={() => setView('code')}>
          Código
        </ToggleButton>
        <ToggleButton isActive={showReasoning} onClick={() => setView('why')}>
          Por qué así
        </ToggleButton>
      </div>

      <AnimatePresence initial={false}>
        {showReasoning ? (
          <motion.div
            key="reasoning"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-5 p-5">
              {summary ? (
                <p className="text-sm leading-relaxed text-text-primary">{summary}</p>
              ) : null}

              {alternatives?.length ? (
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-teal">
                    Alternativas consideradas
                  </span>
                  <ul className="mt-3 space-y-3">
                    {alternatives.map((alternative) => (
                      <li key={alternative.name} className="border-l border-line pl-4">
                        <span className="block text-sm font-semibold text-text-primary">
                          {alternative.name}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-text-secondary">
                          {alternative.tradeoff}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {decision ? (
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-amber">
                    Decisión
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{decision}</p>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

// Botón del toggle. Reutilizable para las dos pestañas.
const ToggleButton = ({ isActive, onClick, children }) => (
  <button
    type="button"
    role="tab"
    aria-selected={isActive}
    onClick={onClick}
    className={`rounded px-4 py-1.5 font-mono text-sm transition-colors duration-200 ${
      isActive ? 'bg-base text-teal' : 'text-text-secondary hover:text-text-primary'
    }`}
  >
    {children}
  </button>
);

export default ReasoningPanel;
