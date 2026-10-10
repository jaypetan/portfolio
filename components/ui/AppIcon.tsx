'use client';

import Image from 'next/image';
import Link from 'next/link';

interface AppIconProps {
  backgroundColor?: string;
  iconSrc?: string;
  iconWidth?: number;
  iconHeight?: number;
  iconAlt?: string;
  href?: string;
  currentPage?: string;
}

export default function AppIcon({
  backgroundColor = '#0ea5e9',
  iconSrc,
  iconWidth = 48,
  iconHeight = 48,
  iconAlt = 'Icon',
  href,
  currentPage,
}: AppIconProps) {
  const isCurrentPage = Boolean(href && href === currentPage);

  const content = (
    <div
      className={`
        flex items-center justify-center
        rounded-2xl
        h-full w-full
        p-2 
        ${isCurrentPage ? 'grayscale opacity-40' : 'glow opacity-90 hover:opacity-100'}
        transition-transform duration-300 ease-in-out
      `}
      style={{ backgroundColor: backgroundColor }}
    >
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={iconAlt}
          loading="eager"
          width={iconWidth}
          height={iconHeight}
          sizes="(min-width: 640px) 48px, 32px"
          className="w-8 sm:w-12 h-auto object-contain"
        />
      )}
    </div>
  );

  if (isCurrentPage) {
    return (
      <span role="link" aria-label={iconAlt} aria-current="page" aria-disabled="true">
        {content}
      </span>
    );
  }

  if (!href) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}
