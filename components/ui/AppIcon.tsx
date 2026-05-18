'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface AppIconProps {
  backgroundColor?: string;
  iconSrc?: StaticImageData;
  iconAlt?: string;
  href?: string;
}

export default function AppIcon({
  backgroundColor = 'bg-sky-500',
  iconSrc,
  iconAlt = 'Icon',
  href,
}: AppIconProps) {
  const content = (
    <div
      className={`
        flex items-center justify-center
        rounded-2xl
        h-full w-full
        p-2 
        glow
        opacity-90
        transition-transform duration-300 ease-in-out
        hover:opacity-100
      `}
      style={{ backgroundColor: backgroundColor }}
    >
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={0}
          height={0}
          className="w-12 h-auto object-contain"
        />
      )}
    </div>
  );

  if (!href) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}
