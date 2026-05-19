import type { SpringOptions } from 'framer-motion';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';

interface TiltedCardProps {
  image?: StaticImageData | string;
  altText?: string;
  imageSize?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  image,
  altText = 'Tilted card image',
  imageSize = 'w-64 h-64',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  overlayContent = null,
  displayOverlayContent = false,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateXBase = useMotionValue(0);
  const rotateYBase = useMotionValue(0);
  const rotateX = useSpring(rotateXBase, springValues);
  const rotateY = useSpring(rotateYBase, springValues);
  const scaleBase = useMotionValue(1);
  const scale = useSpring(scaleBase, springValues);
  const opacityBase = useMotionValue(0);
  const rotateFigcaptionBase = useMotionValue(0);

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateXBase.set(rotationX);
    rotateYBase.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaptionBase.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scaleBase.set(scaleOnHover);
    opacityBase.set(1);
  }

  function handleMouseLeave() {
    opacityBase.set(0);
    scaleBase.set(1);
    rotateXBase.set(0);
    rotateYBase.set(0);
    rotateFigcaptionBase.set(0);
  }

  return (
    <figure
      ref={ref}
      className={`${imageSize} relative perspective-midrange flex flex-col items-center justify-center`}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className={` ${imageSize} relative transform-3d`}
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        <Image
          src={image ?? ''}
          alt={altText}
          loading="eager"
          className={` ${imageSize} absolute top-0 left-0 object-cover rounded-[15px] will-change-transform transform-[translateZ(0)]`}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-0 left-0 z-2 will-change-transform transform-[translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>
    </figure>
  );
}
