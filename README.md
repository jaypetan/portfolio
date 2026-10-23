# Portfolio

Personal portfolio built with Next.js Pages Router, TypeScript, and Tailwind CSS, with Motion animations and Three.js effects.

## Getting started

Use **Node.js 24.x**.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

```sh
npm run build  # Create a production build
npm start      # Serve the production build
npm run lint   # Run ESLint
```

On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`.

## Folder guide

Project-specific folders (standard Next.js folders omitted):

| Folder | Purpose |
| --- | --- |
| `components/backgrounds/` | Animated page backgrounds. |
| `components/layout/` | Shared navigation, app dock, and page image loading. |
| `components/sections/` | Page sections and shared page templates. |
| `components/sections/home/` | Homepage layout. |
| `components/sections/home/components/` | Homepage-only elements, including the theme toggle. |
| `components/sections/home/appComponents/` | Work and project artwork used in dock previews and page headers. |
| `components/sections/shared/` | Shared work/project headers, descriptions, and showcases. |
| `components/sections/shared/showcase/` | Showcase grids, media cards, and hover details. |
| `components/ui/` | Reusable interactive components and visual effects. |
| `components/ui/HoverComponents/` | Shared dock preview frames, overlays, and scrolling images. |
| `data/work/`, `data/projects/` | Page content and showcase media references in JSON. |
| `images/` | Imported artwork and profile images. |
| `public/app-icons/` | Dock logos. |
| `public/work/`, `public/project/` | Work/project screenshots, videos, and header artwork. |
| `scripts/` | Media utilities, including an FFmpeg script for forward/reverse video loops. |
| `.github/workflows/` | Lint/build checks and production deployment to Vercel. |

## Editing content

- **Dock:** edit `data/navigation.json` for labels, links, logos, colors, and ordering. New preview components also need an entry in `renderVisual()` in `components/layout/Navigation.tsx`.
- **Work/project pages:** edit the corresponding JSON in `data/work/` or `data/projects/`. These pages share `components/sections/shared/ProjectPageTemplate.tsx`.
- **Media:** place files in `public/` and reference them without the `public` prefix, e.g. `/work/metev/showcase/demo.mp4`. `data/previewImageSizes.json` stores preview image dimensions.
- **Styling:** shared theme colors, animations, and showcase layouts live in `pages/globals.css`. Theme switching uses `next-themes`.

Content JSON is imported at build time, so changes need a new build to appear in production.
