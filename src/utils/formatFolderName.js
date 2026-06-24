// Deriva un título legible del nombre de una carpeta del repo de demos cuando no
// hay metadatos curados en demos-meta.json (p. ej. "saga-pattern" → "Saga
// Pattern"). Garantiza que una carpeta nueva nunca se quede sin título.
export const formatFolderName = (name) =>
  name
    ?.split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') ?? '';
