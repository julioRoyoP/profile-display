import { GITHUB_CONFIG } from '../config/github.js';

// Error tipado de la API de GitHub. Lleva el status HTTP para que los
// componentes puedan distinguir el rate-limit (403 con cuota agotada) de
// cualquier otro fallo, sin parsear mensajes de texto.
export class GithubApiError extends Error {
  constructor(status, message, rateLimitRemaining = null) {
    super(message || `GitHub API respondió ${status}`);
    this.name = 'GithubApiError';
    this.status = status;
    this.rateLimitRemaining = rateLimitRemaining;
  }

  // True solo cuando el 403 se debe a agotar el límite de peticiones sin auth.
  get isRateLimited() {
    return this.status === 403 && this.rateLimitRemaining === 0;
  }
}

// Política de reintentos para las queries de GitHub. No reintenta ante 403
// (rate-limit ya agotado) ni 404 (path inexistente): reintentar solo gastaría
// más cuota y retrasaría el aviso al usuario. El resto de fallos (red, 5xx) sí
// se reintentan hasta maxRetries.
export const githubRetry = (failureCount, error) =>
  ![403, 404].includes(error?.status) && failureCount < GITHUB_CONFIG.maxRetries;

// Decodifica base64 (con saltos de línea, como lo devuelve GitHub) a texto
// UTF-8 real, para que ficheros con acentos/caracteres no-ASCII se lean bien.
const decodeBase64Utf8 = (base64) => {
  const binary = atob(base64.replace(/\s/g, ''));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder('utf-8').decode(bytes);
};

const buildContentsUrl = (repo, path) =>
  `${GITHUB_CONFIG.apiBaseUrl}/repos/${GITHUB_CONFIG.username}/${repo}/contents/${path}`;

export const githubApi = {
  // Lista el contenido de un path (carpeta → array de entradas; fichero →
  // objeto con content en base64). NO es recursivo: devuelve solo ese nivel.
  getContents: async (repo, path = '') => {
    const response = await fetch(buildContentsUrl(repo, path));

    if (!response.ok) {
      const remainingHeader = response.headers.get('X-RateLimit-Remaining');
      const rateLimitRemaining = remainingHeader === null ? null : Number(remainingHeader);
      throw new GithubApiError(response.status, await response.text(), rateLimitRemaining);
    }

    return response.json();
  },

  // Obtiene el contenido de un fichero concreto ya decodificado a texto plano.
  getFileContent: async (repo, path) => {
    const data = await githubApi.getContents(repo, path);
    return decodeBase64Utf8(data?.content ?? '');
  },
};
