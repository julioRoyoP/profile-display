// Fuente del razonamiento técnico ("por qué esta solución y no otra").
//
// Implementación actual: lectura de JSON estático desde
// src/content/reasoning/{repo}/{path}.json. Si la fuente cambiara en el futuro
// (Markdown, una API, un CMS), ESTE módulo es el único punto de cambio: ningún
// hook ni componente conoce el mecanismo de lectura, todos llaman a
// getReasoning(). No se construye aquí ninguna abstracción de provider formal:
// para una sola implementación sería sobreingeniería (decisión de arquitectura,
// sección 4).
//
// Se usa import.meta.glob (en vez de un import() con plantilla) porque el path
// puede contener subcarpetas (p. ej. "saga-pattern/Orchestrator.java"), y el
// glob de Vite resuelve correctamente rutas anidadas. Cada fichero se carga de
// forma perezosa solo cuando se solicita (lo importa code-splitting).
const reasoningFiles = import.meta.glob('../content/reasoning/**/*.json');

export const getReasoning = async (repo, path) => {
  const key = `../content/reasoning/${repo}/${path}.json`;
  const loadFile = reasoningFiles[key];

  // No todo fichero/carpeta tiene razonamiento asociado: es el caso normal.
  if (!loadFile) return null;

  try {
    const module = await loadFile();
    return module?.default ?? module ?? null;
  } catch {
    return null;
  }
};
