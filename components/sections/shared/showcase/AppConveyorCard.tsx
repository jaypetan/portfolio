import Image from 'next/image';
import AppVideo from './AppVideo';
import type { AppShowcasePage } from './AppConveyor';

interface AppConveyorCardProps {
  page: AppShowcasePage;
  selected: boolean;
  visible: boolean;
  onSelect: () => void;
}

// Render one app screen and play its video only when selected and visible.
export default function AppConveyorCard({
  page,
  selected,
  visible,
  onSelect,
}: AppConveyorCardProps) {
  return (
    <button
      type="button"
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      className={`
              relative w-[min(65vw,320px,28svh)] aspect-[1206/2622]
              shrink-0 overflow-hidden rounded-2xl border-0 p-0 outline-none
              transition-[filter,opacity,scale] duration-200 ease-linear

              ${selected ? 'scale-100 opacity-100 grayscale-0' : 'scale-90 opacity-35 grayscale'}`}
    >
      {page.media.type === 'video' ? (
        <AppVideo src={page.media.src} active={selected && visible} />
      ) : (
        <Image
          src={page.media.src}
          alt={page.media.alt}
          fill
          sizes="(max-width: 640px) 65vw, 320px"
          className="object-cover"
        />
      )}
    </button>
  );
}
