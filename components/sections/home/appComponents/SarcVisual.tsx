import ShowcaseBoundedFrame from '@/components/ui/HoverComponents/ShowcaseBoundedFrame';
import ShowcaseTitleOverlay from '@/components/ui/HoverComponents/ShowcaseTitleOverlay';

import workData from '@/data/work/sarc.json';

export default function SarcVisual({ variant = 'preview' }: { variant?: 'preview' | 'header' }) {
  return (
    <ShowcaseBoundedFrame
      variant={variant}
      className={
        variant === 'preview' ? 'h-auto min-h-36 rounded-2xl bg-slate-950/50 sm:min-h-68' : ''
      }
    >
      <img
        src={workData.visual.background.src}
        alt={workData.visual.background.alt}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <motion.img
        src={workData.visual.cursorSrc}
        alt=""
        aria-hidden="true"
        animate={{ x: [-18, 18, -18] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute left-3/7 top-1/3 z-10 -translate-x-1/2 -translate-y-1/2 ${
          variant === 'header' ? 'w-32 sm:w-56' : 'w-20 sm:w-32'
        }`}
      />
      {variant === 'preview' ? (
        <ShowcaseTitleOverlay title="Satellite Research Centre" subtitle="Web Developer" />
      ) : null}
    </ShowcaseBoundedFrame>
  );
}
import { motion } from 'motion/react';
