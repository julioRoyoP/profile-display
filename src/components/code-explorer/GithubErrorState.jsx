// Estado de error genérico (cualquier fallo que no sea rate-limit). Botón de
// reintentar que invalida/relanza la query de React Query correspondiente
// (el contenedor pasa el refetch de la query como onRetry).
const GithubErrorState = ({ message = 'No se pudo cargar el contenido desde GitHub.', onRetry }) => (
  <div className="rounded-lg border border-line bg-surface p-5 text-sm">
    <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
      // error
    </span>
    <p className="mt-2 text-text-primary">{message}</p>
    {onRetry ? (
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded border border-line px-4 py-2 font-mono text-sm text-text-primary transition-colors duration-200 hover:border-teal hover:text-teal"
      >
        Reintentar
      </button>
    ) : null}
  </div>
);

export default GithubErrorState;
