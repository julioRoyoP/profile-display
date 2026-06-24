// Configuración centralizada de la integración con GitHub (sección 7).
// Punto único donde cambiar usuario, repo de demos o tiempos de caché: ningún
// otro módulo debe hardcodear estos valores.
export const GITHUB_CONFIG = {
  username: 'julioroyop',
  demosRepo: 'profile-knowledge',
  apiBaseUrl: 'https://api.github.com',
  cacheTime: 60 * 60 * 1000, // 1 hora — el código de las demos cambia poco
  maxRetries: 2,
};
