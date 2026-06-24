import profile from '../../content/profile.json';

// Sección Contacto — nodo final del diagrama. Presenta los enlaces de
// profile.json de forma clara. Sin formulario: el sitio es estático y no hay
// backend que lo procese (sección 1).
const Contact = () => {
  const { links } = profile;

  return (
    <section id="contacto" className="border-t border-line py-24">
      <header className="mb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
          // contacto
        </span>
        <h2 className="mt-2 font-mono text-2xl font-semibold text-text-primary sm:text-3xl">
          Hablemos
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
          ¿Tienes un reto de arquitectura o backend entre manos? Estos son los
          canales para contactarme.
        </p>
      </header>

      <div className="flex flex-wrap gap-4">
        <ContactLink href={links?.linkedin} label="LinkedIn" hint="Perfil profesional" />
        <ContactLink href={links?.github} label="GitHub" hint="Código y demos" />
        <ContactLink
          href={links?.email ? `mailto:${links.email}` : undefined}
          label="Email"
          hint={links?.email}
        />
      </div>
    </section>
  );
};

// Enlace de contacto. No se renderiza si no hay href.
const ContactLink = ({ href, label, hint }) => {
  if (!href) return null;

  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer noopener' : undefined}
      className="group flex min-w-[12rem] flex-col rounded-lg border border-line bg-surface px-5 py-4 transition-colors duration-200 hover:border-teal"
    >
      <span className="font-mono text-base font-semibold text-text-primary group-hover:text-teal">
        {label}
      </span>
      {hint ? <span className="mt-1 text-sm text-text-secondary">{hint}</span> : null}
    </a>
  );
};

export default Contact;
