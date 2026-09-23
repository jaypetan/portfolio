interface ShowcaseTitleOverlayProps {
  title: string;
  subtitle: string;
  titleClassName?: string;
  subtitleClassName?: string;
  panelClassName?: string;
  containerClassName?: string;
}

export default function ShowcaseTitleOverlay({
  title,
  subtitle,
  titleClassName = 'text-xl whitespace-nowrap font-semibold tracking-wide text-white sm:text-2xl ',
  subtitleClassName = 'text-sm text-white/80 sm:text-base',
  panelClassName = 'rounded-xl border border-white/10 bg-black/70 px-8 py-2 backdrop-blur-sm min-w-64',
  containerClassName = 'pointer-events-none absolute left-1/2 bottom-2 sm:bottom-4 z-10 -translate-x-1/2',
}: ShowcaseTitleOverlayProps) {
  return (
    <div className={containerClassName}>
      <div className={panelClassName}>
        <div className="flex flex-col items-center justify-center text-center">
          <p className={titleClassName}>{title}</p>
          <p className={subtitleClassName}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
