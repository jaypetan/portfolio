# Portfolio

A modern portfolio website built with **Next.js 14**, **React Three Fiber**, and **TypeScript**.

## Features

- ⚡ **Next.js 14** - Modern React framework with App Router support
- 🎨 **React Three Fiber** - 3D graphics with Three.js
- 🎯 **TypeScript** - Type-safe development
- 💅 **Tailwind CSS** - Utility-first styling
- 📱 **Responsive Design** - Mobile-first approach
- 🚀 **Vercel Ready** - Easy deployment
- 🔄 **GitHub Actions CI/CD** - Automated testing and deployment

## Project Structure

```
portfolio/
├── pages/
│   ├── _app.tsx          # App wrapper
│   ├── _document.tsx     # Document wrapper
│   ├── index.tsx         # Home page
│   ├── about.tsx         # About page
│   └── globals.css       # Global styles
├── components/
│   ├── Navigation.tsx    # Navigation component
│   └── Scene3D.tsx       # React Three Fiber 3D scene
├── styles/
│   ├── Navigation.module.css
│   ├── Home.module.css
│   └── About.module.css
├── package.json
├── next.config.js
├── tsconfig.json
└── .vercelignore
```

## Getting Started

### Prerequisites

- Node.js 16+ or higher
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Deployment on Vercel

The project is ready to deploy on Vercel with zero configuration needed.

### Steps to Deploy:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure everything
   - Click "Deploy"

3. **Your portfolio is live!** 🎉

### Environment Variables (if needed)

Create a `.env.local` file in the root directory:
```
# Add your environment variables here
```

## CI/CD with GitHub Actions

This project includes automated CI/CD workflows:

- **CI Workflow** - Runs tests and builds on every push/PR
- **Deploy Workflow** - Automatically deploys to Vercel on `main` branch

### Setup GitHub Actions CI/CD

See [CI_CD_SETUP.md](./CI_CD_SETUP.md) for complete setup instructions including:
- Setting up Vercel secrets
- Understanding workflow triggers
- Monitoring deployments
- Troubleshooting

Quick start:
1. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` secrets to GitHub
2. Push to `main` branch
3. Watch workflows run in the Actions tab

## Customization

### Adding New Pages

Create a new file in the `pages/` directory:
```tsx
// pages/projects.tsx
import type { NextPage } from 'next'

const Projects: NextPage = () => {
  return <main>Projects Page</main>
}

export default Projects
```

Update the navigation in `components/Navigation.tsx` to link to the new page.

### Modifying the 3D Scene

Edit `components/Scene3D.tsx` to add more 3D elements, models, or interactive features:
- Change geometries and materials
- Add animations
- Load 3D models (glTF, OBJ, etc.)
- Add physics simulation with `@react-three/rapier`

### Styling

- Global styles: `pages/globals.css`
- Component styles: CSS modules in `styles/` directory
- Use Tailwind CSS or styled-components if preferred

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Dependencies

- **React** - UI library
- **Next.js** - React framework
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber

## Next Steps

1. Customize the content on the home and about pages
2. Add more pages and sections
3. Enhance the 3D scene with models and animations
4. Add a projects showcase page
5. Integrate a contact form
6. Add blog functionality if needed

## License

MIT

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Vercel Deployment Guide](https://vercel.com/docs)
