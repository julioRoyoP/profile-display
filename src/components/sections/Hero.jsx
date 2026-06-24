import { motion } from 'framer-motion';
import profile from '../../content/profile.json';

// Hero — nodo raíz del diagrama. Consume profile.json (nunca texto hardcodeado).
// Presenta nombre, titular y enlaces de contacto principales.
const Hero = () => {
  const { name, headline, subheadline, bio, links } = profile;

  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col justify-center py-24"
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 font-mono text-sm text-teal"
      >
        // perfil
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="font-mono text-4xl font-semibold leading-tight text-text-primary sm:text-5xl lg:text-6xl"
      >
        {name}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-4 text-xl text-text-primary sm:text-2xl"
      >
        {headline}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-2 font-mono text-sm text-text-secondary"
      >
        {subheadline}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary"
      >
        {bio}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-8 flex flex-wrap gap-4"
      >
        <HeroLink href={links?.linkedin} label="LinkedIn" />
        <HeroLink href={links?.github} label="GitHub" />
        <HeroLink href={links?.email ? `mailto:${links.email}` : undefined} label="Email" />
      </motion.div>
    </section>
  );
};

// Enlace reutilizable del Hero. No se renderiza si no hay href.
const HeroLink = ({ href, label }) => {
  if (!href) return null;

  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer noopener' : undefined}
      className="rounded border border-line bg-surface px-4 py-2 font-mono text-sm text-text-primary transition-colors duration-200 hover:border-teal hover:text-teal"
    >
      {label}
    </a>
  );
};

export default Hero;
