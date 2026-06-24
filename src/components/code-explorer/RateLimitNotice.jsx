// Estado específico para cuando GitHub responde 403 por agotar el límite de
// peticiones sin autenticación (60/hora por IP). Mensaje claro, no un error
// crudo. Ofrece reintentar por si la cuota ya se ha renovado.
const RateLimitNotice = ({ onRetry }) => (
  <div className="rounded-lg border border-amber/40 bg-surface p-5 text-sm">
    <span className="font-mono text-xs uppercase tracking-widest text-amber">
      // límite de github
    </span>
    <p className="mt-2 text-text-primary">Se alcanzó el límite de peticiones de GitHub.</p>
    <p className="mt-1 leading-relaxed text-text-secondary">
      La API pública de GitHub permite 60 consultas por hora sin autenticación.
      Vuelve a intentarlo en unos minutos.
    </p>
    {onRetry ? (
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded border border-line px-4 py-2 font-mono text-sm text-text-primary transition-colors duration-200 hover:border-amber hover:text-amber"
      >
        Reintentar
      </button>
    ) : null}
  </div>
);

export default RateLimitNotice;
