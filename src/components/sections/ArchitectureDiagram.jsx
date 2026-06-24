import { Fragment } from 'react';

// Mini-diagrama de arquitectura de StrongerNerd (sección 5).
// Flujo principal: React → nginx → Spring Boot → PostgreSQL.
// Servicios de plataforma conectados a Spring Boot: Keycloak y MinIO.
// Cajas como divs posicionados con Tailwind + conectores; cada caja muestra una
// nota breve de su rol al hover. Solo tokens de la paleta/tipografía de Fase 1.

// Estructura del diagrama como datos (no copy hardcodeado en JSX): se mapea con
// .map igual que SECTIONS alimenta el SystemDiagram.
const MAIN_FLOW = [
  { id: 'react', label: 'React', role: 'Frontend — SPA que consume la API REST del backend' },
  { id: 'nginx', label: 'nginx', role: 'Reverse proxy — sirve el frontend y enruta hacia el backend' },
  { id: 'spring', label: 'Spring Boot', role: 'Backend — lógica de negocio, orquestación Saga y Outbox' },
  { id: 'postgres', label: 'PostgreSQL', role: 'Almacén transaccional — pedidos, catálogo y tabla Outbox' },
];

const PLATFORM_SERVICES = [
  { id: 'keycloak', label: 'Keycloak', role: 'Autenticación y autorización por roles (OAuth2 / OIDC)' },
  { id: 'minio', label: 'MinIO', role: 'Almacenamiento de objetos — imágenes de producto y adjuntos' },
];

const ArchitectureDiagram = () => (
  <div className="rounded-lg border border-line bg-base/40 p-5">
    <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
      // arquitectura
    </span>

    {/* Flujo principal */}
    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3">
      {MAIN_FLOW.map((node, index) => (
        <Fragment key={node.id}>
          <NodeBox label={node.label} role={node.role} />
          {index < MAIN_FLOW.length - 1 ? <Connector direction="horizontal" /> : null}
        </Fragment>
      ))}
    </div>

    {/* Conexión de Spring Boot hacia los servicios de plataforma */}
    <div className="mt-5">
      <div className="flex items-center gap-2 text-text-secondary">
        <span className="font-mono text-xs">Spring Boot</span>
        <Connector direction="horizontal" />
        <span className="font-mono text-xs uppercase tracking-widest">plataforma</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        {PLATFORM_SERVICES.map((node) => (
          <NodeBox key={node.id} label={node.label} role={node.role} />
        ))}
      </div>
    </div>
  </div>
);

// Caja individual del diagrama con tooltip de rol al hover (y accesible vía
// title para teclado/lectores). No depende de librería de tooltips.
const NodeBox = ({ label, role }) => (
  <div className="group relative">
    <div
      tabIndex={0}
      title={role}
      className="rounded-md border border-line bg-surface px-4 py-2.5 font-mono text-sm text-text-primary transition-colors duration-200 hover:border-teal focus-visible:border-teal"
    >
      {label}
    </div>
    {role ? (
      <div
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-52 -translate-x-1/2 rounded border border-line bg-base px-3 py-2 text-xs leading-relaxed text-text-secondary opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {role}
      </div>
    ) : null}
  </div>
);

// Conector entre cajas. Flecha monoespaciada con el color de líneas/secundario.
const Connector = ({ direction = 'horizontal' }) => (
  <span aria-hidden="true" className="select-none font-mono text-text-secondary">
    {direction === 'horizontal' ? '→' : '↓'}
  </span>
);

export default ArchitectureDiagram;
