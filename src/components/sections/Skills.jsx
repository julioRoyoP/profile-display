import skills from '../../content/skills.json';
import SkillBadge from './SkillBadge.jsx';

// Sección Skills. Agrupa las skills por category (con reduce) y renderiza cada
// grupo como un bloque con su grid de SkillBadge. El contenido viene siempre de
// skills.json; cada badge enlaza a la evidencia que demuestra la skill.
const Skills = () => {
  const grouped = skills.reduce((groups, skill) => {
    (groups[skill.category] ??= []).push(skill);
    return groups;
  }, {});

  return (
    <section id="skills" className="border-t border-line py-24">
      <header className="mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
          // skills
        </span>
        <h2 className="mt-2 font-mono text-2xl font-semibold text-text-primary sm:text-3xl">
          Competencias
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Cada competencia enlaza a la experiencia, proyecto o demo que la respalda.
        </p>
      </header>

      <div className="space-y-8">
        {Object.entries(grouped).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="mb-3 font-mono text-sm uppercase tracking-widest text-teal">
              {category}
            </h3>
            <ul className="flex flex-wrap gap-2.5">
              {categorySkills.map((skill) => (
                <li key={skill.id}>
                  <SkillBadge {...skill} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
