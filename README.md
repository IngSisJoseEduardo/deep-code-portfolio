# Deep Code — Portafolio de Evidencias

Portafolio profesional de **José Eduardo Martínez Pérez**, desarrollador Fullstack JavaScript. Construido con Astro SSG y el sistema de diseño *Deep Code*: dark mode, minimalismo técnico y paleta azul Royal sobre fondos casi negros.

## Stack

- **Framework**: Astro 6 (SSG)
- **Estilos**: Tailwind CSS v4
- **Fuente**: Inter (Google Fonts)
- **Iconos**: Material Symbols Outlined
- **Lenguaje**: TypeScript
- **Contenido**: Astro Content Collections
- **Servidor**: Nginx (alpine)
- **Deploy**: Docker + Dokploy

## Estructura

```
src/
├── assets/projects/[slug]/   # Imágenes por proyecto (cover.* + galería)
├── components/
│   ├── layout/               # Header, Footer
│   ├── sections/             # Hero, FeaturedProjects, CallToAction
│   └── ui/                   # Button, TechTag, ProjectCard, PhotoGallery
├── content/projects/         # Un .md por proyecto/evidencia
├── layouts/                  # BaseLayout, ProjectLayout
├── lib/projectImages.ts      # Carga dinámica de imágenes con import.meta.glob
└── pages/
    ├── index.astro
    ├── about.astro
    └── projects/
        ├── index.astro
        └── [slug].astro
```

## Agregar un proyecto

1. Crea la carpeta `src/assets/projects/[slug]/` y coloca las imágenes:
   - `cover.*` → portada (o la primera alfabéticamente)
   - El resto → galería automática con carousel + lightbox

2. Crea `src/content/projects/[slug].md` con el siguiente frontmatter:

```yaml
---
title: "Nombre del proyecto"
description: "Descripción breve"
date: 2026-01-01
featured: true
category: fullstack        # frontend | backend | fullstack | mobile
techs:
  - NestJS
  - Angular
githubUrl: "https://github.com/..."   # opcional
demoUrl: "https://..."                # opcional
testCredentials:                      # opcional, solo si hay demo
  - label: "Administrador"
    user: "admin@demo.com"
    password: "Demo1234!"
colSpan: "8"               # "8" = tarjeta grande | "4" = tarjeta pequeña
---

Contenido en markdown...
```

## Comandos

| Comando           | Acción                                        |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Instala dependencias                          |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321`    |
| `npm run build`   | Compila el sitio estático en `./dist/`        |
| `npm run preview` | Previsualiza el build antes de desplegar      |

## Deploy con Docker

```bash
# Construir imagen
docker build -t deep-code-portfolio .

# Ejecutar localmente
docker run -p 8080:80 deep-code-portfolio
```

El `Dockerfile` usa un build multi-stage: Node 22 para compilar → Nginx alpine para servir. El `nginx.conf` incluye compresión gzip y estrategia de caché por tipo de asset.

En **Dokploy**: apunta al repositorio, asigna el puerto `80` y configura el dominio con SSL.
