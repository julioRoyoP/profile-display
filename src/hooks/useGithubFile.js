import { useQuery } from '@tanstack/react-query';
import { githubApi, githubRetry } from '../api/githubApi.js';
import { GITHUB_CONFIG } from '../config/github.js';

// Obtiene el contenido (ya decodificado) de un fichero concreto del repo.
// enabled: Boolean(path) evita disparar la query mientras no haya un fichero
// seleccionado en el explorador.
export const useGithubFile = (repo, path) =>
  useQuery({
    queryKey: ['github-file', repo, path],
    queryFn: () => githubApi.getFileContent(repo, path),
    enabled: Boolean(repo && path),
    staleTime: GITHUB_CONFIG.cacheTime,
    retry: githubRetry,
  });
