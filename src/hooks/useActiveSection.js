import { useEffect, useState } from 'react';

// Devuelve el id de la sección actualmente visible en el viewport usando
// IntersectionObserver (no scroll listeners manuales). La sección activa es
// la que tiene mayor proporción visible en cada momento.
//
// sectionIds: array de ids de los <section id="..."> a observar.
export const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    // Guardamos la última ratio de cada sección para elegir la más visible.
    const ratios = new Map(sectionIds.map((id) => [id, 0]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        const mostVisible = [...ratios.entries()]
          .filter(([, ratio]) => ratio > 0)
          .sort(([, a], [, b]) => b - a)[0];

        if (mostVisible) setActiveSection(mostVisible[0]);
      },
      {
        // Varios thresholds para detectar cambios graduales de visibilidad.
        threshold: [0, 0.25, 0.5, 0.75, 1],
        // Estrecha la "zona activa" al centro del viewport para que el nodo
        // resaltado se corresponda con lo que el usuario está mirando.
        rootMargin: '-40% 0px -40% 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};
