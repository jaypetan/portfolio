import AppIcon from '@/components/ui/AppIcon';
import sarcLogo from '@/images/companies/sarcLogo.png';
import mentaiyaLogo from '@/images/companies/mentaiyaLogo.png';
import metevLogo from '@/images/companies/metevLogo.png';
import dontDrownLogo from '@/images/projects/DontDrownLogo.png';
import NTUeatsLogo from '@/images/projects/NTUeatsLogo.png';

export default function Navigation() {
  const workExperiences = [
    {
      company: 'SARC',
      imageSrc: sarcLogo,
      href: '/work/sarc',
      bg: '#0A438D',
    },
    {
      company: 'Mentai-ya',
      imageSrc: mentaiyaLogo,
      href: '/work/mentaiya',
      bg: '#FFFFFF',
    },
    {
      company: 'MetEV',
      imageSrc: metevLogo,
      href: '/work/metev',
      bg: '#000000',
    },
  ];

  const projects = [
    {
      name: "Don't Drown",
      imageSrc: dontDrownLogo,
      href: '/projects/dontdrown',
      bg: '#002E45',
    },
    {
      name: 'NTUeats',
      imageSrc: NTUeatsLogo,
      href: '/projects/ntueats',
      bg: '#FAE1A0',
    },
  ];

  return (
    <nav className="fixed left-1/2 z-100 bottom-12 -translate-x-1/2">
      <div className="w-[100dvw - 2px] sm:w-150 flex items-center justify-between px-4 py-4 glassmorphism-darkbg dark:glassmorphism">
        {/* Work Experiences */}
        <ul className="flex gap-4 list-none">
          {workExperiences.map((experience, index) => (
            <li key={index}>
              <AppIcon
                backgroundColor={experience.bg}
                iconSrc={experience.imageSrc}
                iconAlt={experience.company}
                href={experience.href}
              />
            </li>
          ))}
        </ul>
        {/* Projects */}
        <ul className="flex gap-4 list-none border-l-2 border-white/10 pl-2 sm:pl-8">
          {projects.map((project, index) => (
            <li key={index}>
              <AppIcon
                backgroundColor={project.bg}
                iconSrc={project.imageSrc}
                iconAlt={project.name}
                href={project.href}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
