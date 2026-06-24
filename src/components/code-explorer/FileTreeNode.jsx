import { useState } from 'react';
import FileTree from './FileTree.jsx';

// Nodo individual del árbol. Carpeta → expandible (estado local); al expandirse
// monta un FileTree para su subpath, que es quien dispara useGithubTree para ese
// nivel (carga lazy: la query solo corre cuando el nodo está abierto).
// Fichero → seleccionable; al hacer click se convierte en el fichero actual.
const FileTreeNode = ({ entry, repo, selectedPath, onSelectFile, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDir = entry?.type === 'dir';
  const isSelected = entry?.path === selectedPath;

  // Indentación por nivel (padding inline para no generar clases dinámicas).
  const indentStyle = { paddingLeft: `${depth * 0.85 + 0.5}rem` };

  if (isDir) {
    return (
      <li>
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          style={indentStyle}
          className="flex w-full items-center gap-2 rounded py-1 pr-2 text-left font-mono text-sm text-text-secondary transition-colors duration-150 hover:bg-base hover:text-text-primary"
        >
          <span aria-hidden="true" className={`text-xs transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
            ›
          </span>
          <span className="truncate">{entry.name}/</span>
        </button>

        {isExpanded ? (
          <FileTree
            repo={repo}
            path={entry.path}
            selectedPath={selectedPath}
            onSelectFile={onSelectFile}
            depth={depth + 1}
          />
        ) : null}
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelectFile?.(entry.path)}
        aria-current={isSelected ? 'true' : undefined}
        style={indentStyle}
        className={`flex w-full items-center gap-2 rounded py-1 pr-2 text-left font-mono text-sm transition-colors duration-150 ${
          isSelected
            ? 'bg-base text-teal'
            : 'text-text-secondary hover:bg-base hover:text-text-primary'
        }`}
      >
        <span aria-hidden="true" className="text-xs text-line">
          •
        </span>
        <span className="truncate">{entry.name}</span>
      </button>
    </li>
  );
};

export default FileTreeNode;
