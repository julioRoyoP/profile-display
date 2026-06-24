import RateLimitNotice from './RateLimitNotice.jsx';
import GithubErrorState from './GithubErrorState.jsx';

// Enruta un error de las queries de GitHub al estado adecuado: si es 403
// (rate-limit de la API sin auth) muestra RateLimitNotice; cualquier otro fallo
// muestra el estado genérico. Centraliza la decisión para no repetirla en cada
// componente que consume useGithubTree/useGithubFile.
const GithubQueryError = ({ error, onRetry, message }) => {
  if (error?.status === 403) return <RateLimitNotice onRetry={onRetry} />;
  return <GithubErrorState message={message} onRetry={onRetry} />;
};

export default GithubQueryError;
