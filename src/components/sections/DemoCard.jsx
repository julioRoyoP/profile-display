import { Link } from 'react-router-dom';
import { GITHUB_CONFIG } from '../../config/github.js';
import { formatFolderName } from '../../utils/formatFolderName.js';

// Card de una demo técnica. Recibe el nombre de carpeta del repo y, opcional,
// sus metadatos curados de demos-meta.json. Si no hay metadatos, deriva el
// título del nombre de carpeta y omite descripción/tags — la carpeta NUNCA se
// oculta. Enlaza al Code Explorer de esa carpeta.
const DemoCard = ({ folderName, meta }) => {
  const title = meta?.title ?? formatFolderName(folderName);
  const description = meta?.description;
  const tags = meta?.tags ?? [];

  return (
    <Link
      to={`/proyectos/${GITHUB_CONFIG.demosRepo}/${folderName}`}
      className="group flex flex-col rounded-lg border border-line bg-surface p-5 transition-colors duration-200 hover:border-teal"
    >
      <span className="font-mono text-xs text-text-secondary">{folderName}/</span>
      <h4 className="mt-1 font-mono text-base font-semibold text-text-primary group-hover:text-teal">
        {title}
      </h4>

      {description ? (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{description}</p>
      ) : (
        <p className="mt-2 flex-1 text-sm italic leading-relaxed text-text-secondary">
          Demo técnica — abre el explorador para ver el código.
        </p>
      )}

      {tags.length ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line bg-base px-2.5 py-0.5 font-mono text-xs text-text-secondary"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <span className="mt-4 font-mono text-xs text-teal opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        Explorar código →
      </span>
    </Link>
  );
};

export default DemoCard;
