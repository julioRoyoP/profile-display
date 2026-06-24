import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { GITHUB_CONFIG } from './config/github.js';

// El Code Explorer arrastra react-syntax-highlighter (Prism con todos los
// lenguajes), pesado y solo necesario al abrir una demo concreta. Se carga de
// forma diferida por la frontera de ruta para no penalizar la carga inicial de
// la Home, que es la mayoría de las visitas.
const DemoExplorerPage = lazy(() => import('./pages/DemoExplorerPage.jsx'));

const ExplorerFallback = () => (
  <div className="mx-auto max-w-6xl px-6 py-10 font-mono text-sm text-text-secondary">
    cargando explorador…
  </div>
);

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route
      // El segmento del repo se deriva de la config (no se hardcodea): así la
      // ruta, los enlaces (DemoCard/SkillBadge) y DemoExplorerPage siguen todos
      // a GITHUB_CONFIG.demosRepo si se cambiara el repo de demos.
      path={`/proyectos/${GITHUB_CONFIG.demosRepo}/:carpeta`}
      element={
        <Suspense fallback={<ExplorerFallback />}>
          <DemoExplorerPage />
        </Suspense>
      }
    />
  </Routes>
);

export default App;
