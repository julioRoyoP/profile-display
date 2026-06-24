// Nodo reutilizable del sistema de diagramas. Pensado para reutilizarse en el
// diagrama de navegación, en su versión mobile y, más adelante, en breadcrumbs
// del code explorer (composición sobre repetición).
//
// status: 'active' resalta con el acento teal el nodo correspondiente a la
// sección visible; 'idle' es el estado por defecto.
const NodeBadge = ({ label, status = 'idle', as: Tag = 'span' }) => {
  const isActive = status === 'active';

  return (
    <Tag
      className={`flex items-center gap-3 font-mono text-sm transition-colors duration-300 ${
        isActive ? 'text-teal' : 'text-text-secondary hover:text-text-primary'
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-3 w-3 shrink-0 rounded-full border transition-all duration-300 ${
          isActive
            ? 'border-teal bg-teal ring-4 ring-teal/20'
            : 'border-line bg-surface'
        }`}
      />
      <span>{label}</span>
    </Tag>
  );
};

export default NodeBadge;
