import experience from '../../content/experience.json';
import ExperienceCard from './ExperienceCard.jsx';

// Sección Experiencia — timeline vertical que reutiliza la estética de
// "diagrama de sistema" de la Fase 1: una línea conectora vertical con un nodo
// por experiencia, y junto a cada nodo una card expandible (ExperienceCard).
// El contenido viene siempre de experience.json (nunca hardcodeado).
const Experience = () => (
  <section
    id="experiencia"
    className="border-t border-line py-24"
  >
    <header className="mb-10">
      <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
        // experiencia
      </span>
      <h2 className="mt-2 font-mono text-2xl font-semibold text-text-primary sm:text-3xl">
        Trayectoria
      </h2>
    </header>

    <ol className="relative ml-1.5 space-y-5 border-l border-line pl-8">
      {experience.map((job) => (
        <li key={job.id} className="relative">
          {/* Nodo del timeline alineado con la línea conectora */}
          <span
            aria-hidden="true"
            className="absolute -left-[2.3rem] top-5 h-3 w-3 rounded-full border border-line bg-surface"
          />
          <ExperienceCard {...job} />
        </li>
      ))}
    </ol>
  </section>
);

export default Experience;
