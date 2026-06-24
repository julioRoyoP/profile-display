import SystemDiagram from '../components/layout/SystemDiagram.jsx';
import Hero from '../components/sections/Hero.jsx';
import Experience from '../components/sections/Experience.jsx';
import Projects from '../components/sections/Projects.jsx';
import Skills from '../components/sections/Skills.jsx';
import Contact from '../components/sections/Contact.jsx';

// Home — single page con scroll y navegación por anchors (sección 9).
// El SystemDiagram es columna lateral fija con etiquetas en desktop (de ahí el
// margen izquierdo lg:ml-56) y un rail vertical compacto en mobile (de ahí el
// padding izquierdo pl-14, que reserva su ancho para que no tape contenido).
const Home = () => (
  <div className="min-h-screen">
    <SystemDiagram />

    <main className="mx-auto max-w-3xl pl-14 pr-5 sm:pr-6 lg:ml-56 lg:max-w-4xl lg:px-12">
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  </div>
);

export default Home;
