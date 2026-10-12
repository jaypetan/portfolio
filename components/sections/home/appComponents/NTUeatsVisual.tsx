import Image from 'next/image';
import { motion } from 'motion/react';
import ShowcaseBoundedFrame from '@/components/ui/HoverComponents/ShowcaseBoundedFrame';
import ShowcaseTitleOverlay from '@/components/ui/HoverComponents/ShowcaseTitleOverlay';

import cat from '@/public/project/ntuEats/visuals/cat.png';
import cookwhat from '@/public/project/ntuEats/visuals/cookwhat.png';
import eatwhat from '@/public/project/ntuEats/visuals/eatwhat.png';

export default function NTUeatsVisual() {
  return (
    <ShowcaseBoundedFrame className="rounded-2xl bg-[#FAE1A0]" contentClassName="min-h-56">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),transparent_45%),linear-gradient(160deg,#f8df9b,#d9954d)]" />
      <div className="relative z-10 h-full w-full ">
        <div className="absolute top-5/8 left-1/4 z-10 w-24 -translate-x-1/2 -translate-y-1/2 sm:w-32">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.0, delay: 0, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src={cookwhat}
              alt="Cook What"
              width={180}
              height={180}
              className="h-auto w-full object-cover drop-shadow-[0_8px_14px_rgba(92,45,15,0.2)] -scale-x-100"
            />
          </motion.div>
        </div>
        <div className="absolute top-3/8 left-3/7 z-20 w-24 -translate-x-1/2 -translate-y-1/2 sm:w-32">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.0, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src={eatwhat}
              alt="Eat What"
              width={180}
              height={180}
              className="h-auto w-full object-cover drop-shadow-[0_8px_14px_rgba(92,45,15,0.2)]"
            />
          </motion.div>
        </div>
        <Image
          src={cat}
          alt="NTUeats"
          width={180}
          height={180}
          className="z-30 h-auto w-32 object-cover drop-shadow-[0_8px_14px_rgba(92,45,15,0.2)] sm:w-30 absolute top-1/2 left-5/8 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <ShowcaseTitleOverlay
        title="NTUeats"
        subtitle="Mobile App Project"
        titleClassName="whitespace-nowrap text-xl font-semibold tracking-wide text-white sm:text-2xl"
        subtitleClassName="whitespace-nowrap text-sm text-white/80 sm:text-base"
      />
    </ShowcaseBoundedFrame>
  );
}
