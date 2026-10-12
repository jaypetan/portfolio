import ShowcaseBoundedFrame from '@/components/ui/HoverComponents/ShowcaseBoundedFrame';
import Image from 'next/image';
import { motion } from 'motion/react';
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
      <Image
        src={workData.visual.background.src}
        alt={workData.visual.background.alt}
        fill
        loading="eager"
        sizes={
          variant === 'header'
            ? '(max-width: 1600px) 100vw, 1600px'
            : '(max-width: 640px) calc(100vw - 32px), 540px'
        }
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <motion.div
        animate={{ x: [-18, 18, -18] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute left-3/7 top-1/3 z-10 -translate-x-1/2 -translate-y-1/2 ${
          variant === 'header' ? 'w-32 sm:w-56' : 'w-20 sm:w-32'
        }`}
      >
        <Image
          src={workData.visual.cursorSrc}
          alt=""
          width={289}
          height={261}
          loading="eager"
          sizes={
            variant === 'header'
              ? '(max-width: 640px) 128px, 224px'
              : '(max-width: 640px) 80px, 128px'
          }
          className="h-auto w-full"
        />
      </motion.div>
      {variant === 'preview' ? (
        <ShowcaseTitleOverlay title="Satellite Research Centre" subtitle="Web Developer" />
      ) : null}
    </ShowcaseBoundedFrame>
  );
}
