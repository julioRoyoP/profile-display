import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { githubApi, githubRetry } from '../api/githubApi.js';
import { GITHUB_CONFIG } from '../config/github.js';

// Compresión de carpetas estilo IntelliJ/VS Code ("compact folders"). Partiendo
// de una carpeta, baja por la cadena mientras cada nivel tenga EXACTAMENTE un
// hijo y ese hijo sea también una carpeta, acumulando todos esos niveles en una
// sola fila visual (ej. dev.julioroyo.knowledge.saga-pattern). Se detiene en el
// primer nivel "de decisión": una carpeta con varios hijos o con algún fichero.
//
// La carga sigue siendo lazy por nivel: el walk solo arranca cuando la fila se
// expande (enabled). Cada nivel se pide con la MISMA queryKey que useGithubTree
// (vía fetchQuery), de modo que comparte caché — al renderizar el FileTree del
// nivel terminal no se vuelve a pedir red, y reexpandir no re-camina la cadena.
export const useCompactChain = (repo, entry, enabled) => {
  const queryClient = useQueryClient();
  const [reloadKey, setReloadKey] = useState(0);
  const [state, setState] = useState({
    status: 'idle',
    segments: [entry],
    terminalPath: entry.path,
    error: null,
  });

  useEffect(() => {
    if (!enabled) return undefined;
    if (state.status === 'success') return undefined; // cadena ya caminada
    let cancelled = false;

    const fetchLevel = (path) =>
      queryClient.fetchQuery({
        queryKey: ['github-tree', repo, path],
        queryFn: () => githubApi.getContents(repo, path),
        staleTime: GITHUB_CONFIG.cacheTime,
        retry: githubRetry,
      });

    const walk = async () => {
      setState((prev) => ({ ...prev, status: 'loading', error: null }));
      const segments = [entry];
      let current = entry;

      try {
        for (;;) {
          const data = await fetchLevel(current.path);
          if (cancelled) return;

          const children = Array.isArray(data) ? data : [];
          const onlyDirChild = children.length === 1 && children[0].type === 'dir';

          if (onlyDirChild) {
            current = children[0];
            segments.push(current);
            continue;
          }

          // current es el nivel de decisión: sus hijos ya quedan en caché para
          // que el FileTree del terminalPath los lea sin otra petición.
          setState({ status: 'success', segments, terminalPath: current.path, error: null });
          return;
        }
      } catch (error) {
        if (!cancelled) {
          setState({ status: 'error', segments, terminalPath: current.path, error });
        }
      }
    };

    walk();
    return () => {
      cancelled = true;
    };
    // state.status se omite a propósito: el guard usa el valor del cierre y solo
    // queremos re-caminar al expandir/reintentar, no en cada cambio de estado.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, repo, entry.path, reloadKey]);

  const refetch = () => {
    setState((prev) => ({ ...prev, status: 'idle', error: null }));
    setReloadKey((key) => key + 1);
  };

  return { ...state, refetch };
};
