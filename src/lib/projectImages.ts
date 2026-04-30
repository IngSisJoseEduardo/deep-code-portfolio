import type { ImageMetadata } from 'astro';

// Carga todas las imágenes de proyectos en src/assets/projects/ en tiempo de build
export const allProjectImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/projects/**/*.{png,jpg,jpeg,webp,gif,avif}',
  { eager: true }
);

/** Devuelve la imagen de portada de un proyecto. Prioriza 'cover.*', si no la primera alfabética. */
export function getProjectCover(slug: string): ImageMetadata | undefined {
  const entries = Object.entries(allProjectImages)
    .filter(([path]) => path.startsWith(`/src/assets/projects/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b));

  const coverEntry = entries.find(([path]) => /\/cover\.[^/]+$/.test(path));
  return (coverEntry ?? entries[0])?.[1].default;
}

/** Devuelve las imágenes de galería (todo excepto la portada), ordenadas alfabéticamente. */
export function getProjectGallery(slug: string): ImageMetadata[] {
  const entries = Object.entries(allProjectImages)
    .filter(([path]) => path.startsWith(`/src/assets/projects/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b));

  const coverIdx = entries.findIndex(([path]) => /\/cover\.[^/]+$/.test(path));
  const gallery = coverIdx >= 0
    ? entries.filter((_, i) => i !== coverIdx)
    : entries.slice(1);

  return gallery.map(([, mod]) => mod.default);
}
