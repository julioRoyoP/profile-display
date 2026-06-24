import { useState } from 'react';
import { useGithubFile } from '../../hooks/useGithubFile.js';
import { useReasoning } from '../../hooks/useReasoning.js';
import FileTree from './FileTree.jsx';
import Breadcrumbs from './Breadcrumbs.jsx';
import CodeViewer from './CodeViewer.jsx';
import GithubQueryError from './GithubQueryError.jsx';
import ReasoningPanel from '../reasoning/ReasoningPanel.jsx';

// Contenedor del Code Explorer (Opción C). Compone sidebar (FileTree) +
// Breadcrumbs + CodeViewer + componente de razonamiento. Gestiona el estado del
// fichero seleccionado y delega el fetching en los hooks de la Fase 4.
//
// ReasoningComponent es una prop con default ReasoningPanel: CodeExplorer no
// conoce su presentación interna, solo le pasa el objeto `data` de useReasoning.
const CodeExplorer = ({ repo, rootPath, ReasoningComponent = ReasoningPanel }) => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [isTreeOpen, setIsTreeOpen] = useState(false);

  const fileQuery = useGithubFile(repo, selectedPath);
  const reasoningQuery = useReasoning(repo, selectedPath);

  const selectedName = selectedPath?.split('/').pop() ?? null;

  const handleSelectFile = (path) => {
    setSelectedPath(path);
    setIsTreeOpen(false); // cerrar el drawer al elegir fichero en mobile
  };

  return (
    <div className="relative flex min-h-[28rem] flex-col gap-4 lg:flex-row">
      {/* Botón del drawer (solo mobile) */}
      <button
        type="button"
        onClick={() => setIsTreeOpen((prev) => !prev)}
        aria-expanded={isTreeOpen}
        className="self-start rounded border border-line px-4 py-2 font-mono text-sm text-text-primary transition-colors hover:border-teal hover:text-teal lg:hidden"
      >
        {isTreeOpen ? '✕ Cerrar' : '☰ Ficheros'}
      </button>

      {/* Backdrop del drawer en mobile */}
      {isTreeOpen ? (
        <div
          aria-hidden="true"
          onClick={() => setIsTreeOpen(false)}
          className="fixed inset-0 z-30 bg-base/70 lg:hidden"
        />
      ) : null}

      {/* Sidebar: columna fija en desktop, drawer deslizante en mobile */}
      <aside
        className={`z-40 w-72 shrink-0 overflow-y-auto border border-line bg-surface p-3 transition-transform duration-200 lg:static lg:z-auto lg:w-64 lg:translate-x-0 lg:rounded-lg ${
          isTreeOpen
            ? 'fixed inset-y-0 left-0 translate-x-0'
            : 'fixed inset-y-0 left-0 -translate-x-full lg:translate-x-0'
        }`}
      >
        <span className="mb-3 block font-mono text-xs uppercase tracking-widest text-text-secondary">
          // ficheros
        </span>
        <FileTree
          repo={repo}
          path={rootPath}
          selectedPath={selectedPath}
          onSelectFile={handleSelectFile}
        />
      </aside>

      {/* Panel principal: breadcrumbs + código + razonamiento */}
      <div className="min-w-0 flex-1 space-y-4">
        <Breadcrumbs repo={repo} path={selectedPath} onNavigate={setSelectedPath} />

        <CodePanel
          selectedPath={selectedPath}
          selectedName={selectedName}
          fileQuery={fileQuery}
        />

        {selectedPath ? <ReasoningComponent data={reasoningQuery.data} /> : null}
      </div>
    </div>
  );
};

// Panel de código con los tres estados explícitos. Separado para mantener el
// contenedor legible.
const CodePanel = ({ selectedPath, selectedName, fileQuery }) => {
  if (!selectedPath) {
    return (
      <div className="flex min-h-[16rem] items-center justify-center rounded-lg border border-dashed border-line bg-base/40 p-6 text-center font-mono text-sm text-text-secondary">
        Selecciona un fichero del árbol para ver su código.
      </div>
    );
  }

  if (fileQuery.isLoading) {
    return (
      <div className="flex min-h-[16rem] items-center justify-center rounded-lg border border-line bg-base p-6 font-mono text-sm text-text-secondary">
        cargando {selectedName}…
      </div>
    );
  }

  if (fileQuery.isError) {
    return (
      <GithubQueryError
        error={fileQuery.error}
        onRetry={fileQuery.refetch}
        message={`No se pudo cargar ${selectedName}.`}
      />
    );
  }

  return <CodeViewer filename={selectedName} content={fileQuery.data} />;
};

export default CodeExplorer;
