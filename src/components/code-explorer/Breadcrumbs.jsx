import { Fragment } from 'react';

// Ruta actual dentro del repo: repo / carpeta / … / fichero. Cada segmento
// anterior al fichero actual es clickable para "volver atrás" (deselecciona el
// fichero y vuelve al estado vacío del panel). El último segmento (fichero
// actual) no es clickable.
const Breadcrumbs = ({ repo, path, onNavigate }) => {
  const segments = path ? path.split('/') : [];

  return (
    <nav aria-label="Ruta del fichero" className="flex flex-wrap items-center gap-1 font-mono text-xs">
      <button
        type="button"
        onClick={() => onNavigate?.(null)}
        className="text-text-secondary transition-colors hover:text-teal"
      >
        {repo}
      </button>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const partialPath = segments.slice(0, index + 1).join('/');

        return (
          <Fragment key={partialPath}>
            <span aria-hidden="true" className="text-line">
              /
            </span>
            {isLast ? (
              <span className="text-text-primary">{segment}</span>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate?.(null)}
                className="text-text-secondary transition-colors hover:text-teal"
              >
                {segment}
              </button>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
