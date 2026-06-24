import { Link, useParams } from 'react-router-dom';
import { GITHUB_CONFIG } from '../config/github.js';
import demosMeta from '../content/demos-meta.json';
import { formatFolderName } from '../utils/formatFolderName.js';
import CodeExplorer from '../components/code-explorer/CodeExplorer.jsx';

// Página de ruta /proyectos/profile-knowledge/:carpeta. Monta el Code Explorer
// apuntando al repo de demos y a la carpeta de la URL. El título usa los
// metadatos curados si existen, o el nombre derivado de la carpeta.
const DemoExplorerPage = () => {
  const { carpeta } = useParams();
  const repo = GITHUB_CONFIG.demosRepo;
  const meta = demosMeta?.[carpeta];
  const title = meta?.title ?? formatFolderName(carpeta);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-12">
      <Link
        to="/#proyectos"
        className="font-mono text-sm text-text-secondary transition-colors hover:text-teal"
      >
        ← Volver a proyectos
      </Link>

      <header className="mb-8 mt-4">
        <span className="font-mono text-xs text-text-secondary">
          {repo}/{carpeta}
        </span>
        <h1 className="mt-1 font-mono text-2xl font-semibold text-text-primary sm:text-3xl">
          {title}
        </h1>
        {meta?.description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
            {meta.description}
          </p>
        ) : null}
      </header>

      <CodeExplorer repo={repo} rootPath={carpeta} />
    </div>
  );
};

export default DemoExplorerPage;
