// Deriva el lenguaje de syntax highlighting a partir de la EXTENSIÓN del
// fichero, nunca por nombre concreto, para que cualquier fichero nuevo del repo
// de demos funcione sin tocar código. Si la extensión no se reconoce, devuelve
// 'text' (Prism lo renderiza como texto plano, sin romper).
const EXTENSION_LANGUAGE_MAP = {
  js: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  jsx: 'jsx',
  ts: 'typescript',
  tsx: 'tsx',
  java: 'java',
  kt: 'kotlin',
  kts: 'kotlin',
  py: 'python',
  rb: 'ruby',
  go: 'go',
  rs: 'rust',
  php: 'php',
  cs: 'csharp',
  c: 'c',
  h: 'c',
  cpp: 'cpp',
  json: 'json',
  xml: 'markup',
  html: 'markup',
  yml: 'yaml',
  yaml: 'yaml',
  toml: 'toml',
  md: 'markdown',
  markdown: 'markdown',
  sql: 'sql',
  sh: 'bash',
  bash: 'bash',
  css: 'css',
  scss: 'scss',
  properties: 'properties',
  gradle: 'groovy',
  dockerfile: 'docker',
};

export const languageFromFilename = (filename) => {
  const extension = filename?.split('.').pop()?.toLowerCase() ?? '';
  return EXTENSION_LANGUAGE_MAP[extension] ?? 'text';
};
