import projects from '../../content/projects.json';
import ProjectCard from './ProjectCard.jsx';
import TechnicalDemos from './TechnicalDemos.jsx';

// Sección Proyectos (parte estática de Fase 3). Renderiza los proyectos propios
// de projects.json como cards. Las demos técnicas dinámicas vía GitHub API se
// añaden en la Fase 5; aquí StrongerNerd es el único proyecto, completamente
// estático.
const Projects = () => (
  <section id="proyectos" className="border-t border-line py-24">
    <header className="mb-10">
      <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
        // proyectos
      </span>
      <h2 className="mt-2 font-mono text-2xl font-semibold text-text-primary sm:text-3xl">
        Proyectos propios
      </h2>
    </header>

    <div className="space-y-5">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>

    <TechnicalDemos />
  </section>
);

export default Projects;
