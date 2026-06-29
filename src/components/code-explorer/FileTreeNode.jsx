import { useState } from 'react';
import FileTree from './FileTree.jsx';
import GithubQueryError from './GithubQueryError.jsx';
import { useCompactChain } from '../../hooks/useCompactChain.js';

// Carpeta del árbol con compresión estilo IntelliJ/VS Code. La cadena de
// carpetas con un único hijo de tipo carpeta se muestra en una sola fila
// clickable (useCompactChain). Al expandir, en una sola acción se baja hasta el
// primer nivel de decisión y se monta un FileTree para ese terminalPath, que ya
// está en caché (carga sigue siendo lazy por nivel).
const DirectoryNode = ({ entry, repo, selectedPath, onSelectFile, depth }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const chain = useCompactChain(repo, entry, isExpanded);

  const indentStyle = { paddingLeft: `${depth * 0.85 + 0.5}rem` };
  const childIndent = `${(depth + 1) * 0.85 + 0.75}rem`;
  // Antes de expandir solo se conoce esta carpeta; tras el walk, el path
  // comprimido completo (ej. dev.julioroyo.knowledge.saga-pattern).
  const label = chain.segments.map((segment) => segment.name).join('.');

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
        <span className="truncate">{label}/</span>
      </button>

      {isExpanded && chain.status === 'loading' ? (
        <p className="py-1 font-mono text-xs text-text-secondary" style={{ paddingLeft: childIndent }}>
          cargando…
        </p>
      ) : null}

      {isExpanded && chain.status === 'error' ? (
        <div className="py-2" style={{ paddingLeft: `${(depth + 1) * 0.85 + 0.5}rem` }}>
          <GithubQueryError error={chain.error} onRetry={chain.refetch} message="No se pudo cargar esta carpeta." />
        </div>
      ) : null}

      {isExpanded && chain.status === 'success' ? (
        <FileTree
          repo={repo}
          path={chain.terminalPath}
          selectedPath={selectedPath}
          onSelectFile={onSelectFile}
          depth={depth + 1}
        />
      ) : null}
    </li>
  );
};

// Nodo individual del árbol. Carpeta → DirectoryNode (expandible con compresión
// de cadenas). Fichero → seleccionable; al hacer click se convierte en el
// fichero actual.
const FileTreeNode = ({ entry, repo, selectedPath, onSelectFile, depth = 0 }) => {
  const isDir = entry?.type === 'dir';
  const isSelected = entry?.path === selectedPath;
  const indentStyle = { paddingLeft: `${depth * 0.85 + 0.5}rem` };

  if (isDir) {
    return (
      <DirectoryNode
        entry={entry}
        repo={repo}
        selectedPath={selectedPath}
        onSelectFile={onSelectFile}
        depth={depth}
      />
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
