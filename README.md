# profile-display — Portfolio personal

Portfolio personal para un perfil de **arquitecto / backend senior** con
experiencia full-stack, orientado a reclutadores técnicos y a compartir en
LinkedIn. El frontend es la herramienta para presentar un perfil cuya fuerza
está en arquitectura, backend y bases de datos.

Sitio **100% estático**, sin backend propio ni base de datos. El código de las
demos técnicas vive en un **repositorio separado** (`profile-knowledge`) y se lee
en vivo vía la API pública de GitHub, sin autenticación.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 18.3 | Framework UI (solo componentes funcionales con hooks) |
| Vite | Build y dev server |
| Tailwind CSS | Estilos (tokens de diseño centralizados) |
| @tanstack/react-query | Fetching y caché de la API de GitHub |
| react-syntax-highlighter | Resaltado de sintaxis del Code Explorer |
| Framer Motion | Animaciones (diagrama, cards expandibles) |
| react-router-dom | Navegación (Home + ruta del explorador) |
| GitHub REST API (sin auth) | Lectura del repo de demos técnicas |
| Vercel | Despliegue y CI/CD |

Sin variables de entorno secretas: todo lo que se consulta es público.

---

## Correr en local

Requisitos: Node 18+ y npm.

```bash
npm install      # instala dependencias
npm run dev      # arranca el dev server (http://localhost:5173)
npm run build    # genera el build de producción en dist/
npm run preview  # sirve el build de dist/ para revisarlo en local
```

---

## Estructura del contenido (editable sin tocar código)

Todo el texto del sitio vive en JSON dentro de `src/content/`. Para actualizar el
contenido, edita estos ficheros (no hace falta tocar componentes):

| Fichero | Contenido |
|---|---|
| `src/content/profile.json` | Nombre, titular, bio y enlaces (LinkedIn, GitHub, email) |
| `src/content/experience.json` | Array de experiencias profesionales |
| `src/content/projects.json` | Array de proyectos propios (StrongerNerd, …) |
| `src/content/skills.json` | Skills con su evidencia (proyecto / demo / experiencia) |
| `src/content/demos-meta.json` | Metadatos **opcionales** por carpeta del repo de demos |
| `src/content/reasoning/…` | Razonamiento técnico por fichero (ver más abajo) |

> El contenido actual son **placeholders** identificables (`[PLACEHOLDER] …`).
> Sustitúyelos por el contenido real antes de publicar.

La configuración (usuario de GitHub, repo de demos, tiempos de caché) está
centralizada en `src/config/github.js`. Si cambias de usuario o de repo de demos,
edita solo ese fichero: la ruta del explorador y todos los enlaces lo siguen.

---

## Integración con el repo de demos técnicas (`profile-knowledge`)

El portfolio **no** contiene el código de las demos. Lo lee en vivo del repo
público `profile-knowledge` (configurable en `src/config/github.js`) vía la API
de GitHub, y lo renderiza como texto con resaltado de sintaxis. El código nunca
se ejecuta.

### Añadir una demo nueva

1. Crea una **carpeta** en el repo `profile-knowledge` (una carpeta por demo,
   p. ej. `circuit-breaker/`) con sus ficheros de código.
2. Eso es todo: la carpeta **aparece automáticamente** como card en la sección
   Proyectos en el siguiente build, sin tocar el código React. La lista de demos
   se descubre dinámicamente desde la raíz del repo; las carpetas no se
   hardcodean en ningún sitio.

### (Opcional) Metadatos curados

Si quieres un título y descripción bonitos para una carpeta, añade una entrada en
`src/content/demos-meta.json`, indexada por el **nombre exacto de la carpeta**:

```json
{
  "circuit-breaker": {
    "title": "Circuit Breaker",
    "description": "Aislamiento de fallos en llamadas a servicios externos",
    "tags": ["resiliencia", "spring"]
  }
}
```

Si una carpeta no tiene entrada aquí, se muestra igualmente con un título
derivado del nombre de carpeta (`circuit-breaker` → "Circuit Breaker") y sin
descripción. **Nunca se oculta.**

### (Opcional) Razonamiento técnico por fichero

Cada fichero puede tener un panel "¿Por qué así?" con la decisión de diseño. Crea
un JSON en `src/content/reasoning/<repo>/<path-del-fichero>.json`, donde el path
coincide **exactamente** con el del fichero dentro del repo de demos. Ejemplo
para `saga-pattern/SagaOrchestrator.java`:

```
src/content/reasoning/profile-knowledge/saga-pattern/SagaOrchestrator.java.json
```

```json
{
  "summary": "Por qué se eligió este enfoque, en una frase.",
  "alternatives": [
    { "name": "Alternativa A", "tradeoff": "Qué se ganaría/perdería con ella" }
  ],
  "decision": "Explicación más larga de la decisión final y su contexto."
}
```

Si un fichero no tiene razonamiento asociado, el panel simplemente no aparece.

### Límite de la API de GitHub

Sin autenticación, GitHub permite **60 peticiones/hora por IP**. La app cachea
las respuestas 1 hora (React Query) y carga el árbol de ficheros **nivel a nivel**
(no recursivo) para no agotar la cuota. Si se alcanza el límite, el explorador
muestra un aviso claro en vez de un error crudo.

---

## Despliegue en Vercel

El proyecto está listo para Vercel sin configuración adicional:

- **No requiere variables de entorno** (todo lo consultado es público).
- `vercel.json` ya incluye el *rewrite* de SPA hacia `index.html`, necesario para
  que las rutas de cliente (p. ej. `/proyectos/profile-knowledge/saga-pattern`)
  funcionen al recargar o al compartir el enlace directo.
- Vercel detecta Vite automáticamente: build `vite build`, salida `dist/`.

Cada `git push` a la rama principal dispara build y despliegue automáticos. Los
pasos manuales de conexión a Vercel se indican en la entrega de esta fase.

---

## Estructura del proyecto (resumen)

```
src/
├── config/        → github.js (usuario/repo/caché), colors.js (paleta), sections.js
├── content/       → JSON de contenido + reasoning/
├── api/           → githubApi.js (cliente + política de reintentos)
├── data/          → reasoningSource.js (fuente del razonamiento)
├── hooks/         → useGithubTree, useGithubFile, useReasoning, useActiveSection
├── utils/         → languageFromExtension, formatFolderName
├── components/    → layout/, sections/, code-explorer/, reasoning/
└── pages/         → Home.jsx, DemoExplorerPage.jsx
```
