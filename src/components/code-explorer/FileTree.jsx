import { useGithubTree } from '../../hooks/useGithubTree.js';
import FileTreeNode from './FileTreeNode.jsx';
import GithubQueryError from './GithubQueryError.jsx';

// Contenedor recursivo de UN nivel del árbol. Hace el fetch de ese nivel con
// useGithubTree (lazy: solo se monta cuando su carpeta padre está expandida) y
// mapea las entradas a FileTreeNode. Gestiona los tres estados explícitamente.
//
// Orden: carpetas primero, luego ficheros; alfabético dentro de cada grupo.
const FileTree = ({ repo, path = '', selectedPath, onSelectFile, depth = 0 }) => {
  const { data, isLoading, isError, error, refetch } = useGithubTree(repo, path);

  if (isLoading) {
    return (
      <p className="py-1 pl-3 font-mono text-xs text-text-secondary" style={{ paddingLeft: `${depth * 0.85 + 0.75}rem` }}>
        cargando…
      </p>
    );
  }

  if (isError) {
    // En subniveles, un error inline compacto; el contenedor raíz ya muestra el
    // estado completo. Reusar el enrutador mantiene la distinción 403.
    return (
      <div className="py-2" style={{ paddingLeft: `${depth * 0.85 + 0.5}rem` }}>
        <GithubQueryError error={error} onRetry={refetch} message="No se pudo cargar esta carpeta." />
      </div>
    );
  }

  const entries = Array.isArray(data) ? data : [];
  const sorted = [...entries].sort((a, b) => {
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  if (sorted.length === 0) {
    return (
      <p className="py-1 font-mono text-xs text-text-secondary" style={{ paddingLeft: `${depth * 0.85 + 0.75}rem` }}>
        (carpeta vacía)
      </p>
    );
  }

  return (
    <ul className="space-y-0.5">
      {sorted.map((entry) => (
        <FileTreeNode
          key={entry.path}
          entry={entry}
          repo={repo}
          selectedPath={selectedPath}
          onSelectFile={onSelectFile}
          depth={depth}
        />
      ))}
    </ul>
  );
};

export default FileTree;
