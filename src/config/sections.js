// Fuente única de verdad de las secciones navegables del portfolio.
// La consumen tanto SystemDiagram (nodos del diagrama) como Home (anchors),
// de modo que ambos no puedan desincronizarse. Añadir/quitar una sección
// aquí la propaga al diagrama y a la navegación sin tocar más código.
export const SECTIONS = [
  { id: 'hero', label: 'Inicio', node: 'root' },
  { id: 'experiencia', label: 'Experiencia', node: 'branch' },
  { id: 'proyectos', label: 'Proyectos', node: 'branch' },
  { id: 'skills', label: 'Skills', node: 'branch' },
  { id: 'contacto', label: 'Contacto', node: 'leaf' },
];

// IDs de sección en orden, útil para el IntersectionObserver y el diagrama.
export const SECTION_IDS = SECTIONS.map((section) => section.id);
