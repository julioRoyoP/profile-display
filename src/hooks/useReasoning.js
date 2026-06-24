import { useQuery } from '@tanstack/react-query';
import { getReasoning } from '../data/reasoningSource.js';

// Obtiene el razonamiento técnico de un fichero/carpeta a través de
// getReasoning() (importado directamente desde reasoningSource.js, sin capa de
// indirección). Devuelve null de forma controlada cuando no hay razonamiento
// asociado, sin tratarlo como error.
//
// Es lectura local (no red), por eso retry: false. enabled: Boolean(path) evita
// consultar mientras no haya un fichero/carpeta seleccionado.
export const useReasoning = (repo, path) =>
  useQuery({
    queryKey: ['reasoning', repo, path],
    queryFn: () => getReasoning(repo, path),
    enabled: Boolean(repo && path),
    staleTime: Infinity,
    retry: false,
  });
