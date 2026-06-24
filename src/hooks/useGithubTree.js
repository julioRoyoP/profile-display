import { useQuery } from '@tanstack/react-query';
import { githubApi, githubRetry } from '../api/githubApi.js';
import { GITHUB_CONFIG } from '../config/github.js';

// Obtiene SOLO el nivel solicitado del árbol de un repo (la raíz, o una
// subcarpeta concreta), nunca el árbol completo de forma recursiva — decisión
// fijada para no agotar el límite de 60 req/h de GitHub sin auth (sección 4).
//
// queryKey incluye repo y path para que cada nivel se cachee de forma
// independiente: expandir una carpeta ya consultada no vuelve a pedir red.
export const useGithubTree = (repo, path = '') =>
  useQuery({
    queryKey: ['github-tree', repo, path],
    queryFn: () => githubApi.getContents(repo, path),
    enabled: Boolean(repo),
    staleTime: GITHUB_CONFIG.cacheTime,
    retry: githubRetry,
  });
