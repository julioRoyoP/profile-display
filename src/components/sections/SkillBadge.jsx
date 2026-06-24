import { Link } from 'react-router-dom';
import { GITHUB_CONFIG } from '../../config/github.js';

// Badge de una skill. Si tiene evidencia, es clickable y lleva a ella:
// - demo       → navega al Code Explorer de esa carpeta (ruta react-router)
// - project    → scroll al ancla de la sección Proyectos
// - experience → scroll al ancla de la sección Experiencia
// Sin evidenceRef, se muestra como elemento estático (no interactivo).
const SECTION_BY_EVIDENCE = {
  project: 'proyectos',
  experience: 'experiencia',
};

const INTERACTIVE_CLASS =
  'rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-sm text-text-primary transition-colors duration-200 hover:border-teal hover:text-teal';
const STATIC_CLASS =
  'rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-sm text-text-secondary';

const SkillBadge = ({ name, evidenceType, evidenceRef }) => {
  // Demo: navegación a otra ruta.
  if (evidenceRef && evidenceType === 'demo') {
    return (
      <Link
        to={`/proyectos/${GITHUB_CONFIG.demosRepo}/${evidenceRef}`}
        title="Ver demo técnica"
        className={INTERACTIVE_CLASS}
      >
        {name}
      </Link>
    );
  }

  // Project / experience: scroll al ancla de su sección en la misma página.
  const anchor = SECTION_BY_EVIDENCE[evidenceType];
  if (evidenceRef && anchor) {
    return (
      <a href={`#${anchor}`} title="Ver evidencia" className={INTERACTIVE_CLASS}>
        {name}
      </a>
    );
  }

  return <span className={STATIC_CLASS}>{name}</span>;
};

export default SkillBadge;
