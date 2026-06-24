import { useGithubTree } from '../../hooks/useGithubTree.js';
import { GITHUB_CONFIG } from '../../config/github.js';
import demosMeta from '../../content/demos-meta.json';
import DemoCard from './DemoCard.jsx';
import GithubQueryError from '../code-explorer/GithubQueryError.jsx';

// Demos técnicas — descubiertas dinámicamente desde la raíz del repo
// profile-knowledge (lazy, un solo nivel). La lista de carpetas NUNCA se
// hardcodea: cada carpeta del repo se convierte en una card automáticamente.
// Cada carpeta se cruza con demos-meta.json por nombre; si no hay entrada, la
// card se muestra igualmente con datos derivados del nombre.
const TechnicalDemos = () => {
  const { data, isLoading, isError, error, refetch } = useGithubTree(GITHUB_CONFIG.demosRepo, '');

  const folders = Array.isArray(data) ? data.filter((entry) => entry?.type === 'dir') : [];

  return (
    <div className="mt-12">
      <header className="mb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
          // demos técnicas
        </span>
        <h3 className="mt-2 font-mono text-xl font-semibold text-text-primary">
          Patrones y conceptos
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          Código real navegable, leído en vivo desde el repositorio{' '}
          <span className="font-mono text-teal">{GITHUB_CONFIG.demosRepo}</span>.
        </p>
      </header>

      {isLoading ? (
        <p className="font-mono text-sm text-text-secondary">cargando demos…</p>
      ) : null}

      {isError ? (
        <GithubQueryError
          error={error}
          onRetry={refetch}
          message="No se pudieron cargar las demos técnicas."
        />
      ) : null}

      {!isLoading && !isError ? (
        folders.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {folders.map((folder) => (
              <DemoCard key={folder.path} folderName={folder.name} meta={demosMeta?.[folder.name]} />
            ))}
          </div>
        ) : (
          <p className="font-mono text-sm text-text-secondary">
            Aún no hay demos publicadas en el repositorio.
          </p>
        )
      ) : null}
    </div>
  );
};

export default TechnicalDemos;
