import AppIcon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { House } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import navigationData from '@/data/navigation.json';
import HoverFollow from '@/components/ui/HoverFollow';
import MentaiyaVisual from '@/components/sections/home/appComponents/MentaiyaVisual';
import SarcVisual from '@/components/sections/home/appComponents/SarcVisual';
import MetevVisual from '@/components/sections/home/appComponents/MetevVisual';
import DontDrownVisual from '@/components/sections/home/appComponents/DontDrownVisual';
import NTUeatsVisual from '@/components/sections/home/appComponents/NTUeatsVisual';

interface NavigationApp {
  id: string;
  iconSrc: string;
  videoUrl?: string;
}

function renderVisual(app: NavigationApp) {
  switch (app.id) {
    case 'metev':
      return <MetevVisual />;
    case 'mentaiya':
      return <MentaiyaVisual />;
    case 'sarc':
      return <SarcVisual />;
    case 'dontdrown':
      return <DontDrownVisual />;
    case 'ntueats':
      return <NTUeatsVisual iconSrc={app.iconSrc} />;
    default:
      return null;
  }
}

export default function Navigation() {
  const { pathname: currentPage } = useRouter();
  const reduceMotion = useReducedMotion();
  const currentPageTooltip = (
    <div className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white shadow-lg whitespace-nowrap">
      You are already on this page
    </div>
  );

  const workExperiences = navigationData.work;
  const projects = navigationData.projects;

  return (
    <>
      {/* Home Link */}
      <AnimatePresence initial={false}>
        {currentPage !== '/' && (
          <motion.div
            key="home-link"
            className="fixed top-6 left-6 z-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: 'none' }}
            transition={reduceMotion ? { duration: 0 } : { type: 'tween' }}
          >
            <Link
              href="/"
              aria-label="Go to home"
              title="Home"
              className="flex h-12 w-12 items-center justify-center glassmorphism-darkbg dark:glassmorphism transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            >
              <House className="h-6 w-6" aria-hidden="true" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <nav className="fixed left-1/2 z-100 bottom-12 -translate-x-1/2">
        <div className="w-[calc(100dvw-24px)] max-w-96 sm:max-w-none sm:w-150 flex items-center justify-between px-4 py-4 glassmorphism-darkbg dark:glassmorphism">
          {/* Work Experiences */}
          <ul className="flex gap-4 list-none">
            {workExperiences.map((experience) => (
              <li key={experience.id}>
                <HoverFollow
                  follower={
                    currentPage === experience.href ? currentPageTooltip : renderVisual(experience)
                  }
                >
                  <AppIcon
                    backgroundColor={experience.backgroundColor}
                    iconSrc={experience.iconSrc}
                    iconWidth={experience.iconWidth}
                    iconHeight={experience.iconHeight}
                    iconAlt={experience.label}
                    href={experience.href}
                    currentPage={currentPage}
                  />
                </HoverFollow>
              </li>
            ))}
          </ul>
          {/* Projects */}
          <ul className="flex gap-4 list-none border-l-2 border-white/10 pl-2 sm:pl-8">
            {projects.map((project) => (
              <li key={project.id}>
                <HoverFollow
                  follower={
                    currentPage === project.href ? currentPageTooltip : renderVisual(project)
                  }
                >
                  <AppIcon
                    backgroundColor={project.backgroundColor}
                    iconSrc={project.iconSrc}
                    iconWidth={project.iconWidth}
                    iconHeight={project.iconHeight}
                    iconAlt={project.label}
                    href={project.href}
                    currentPage={currentPage}
                  />
                </HoverFollow>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
