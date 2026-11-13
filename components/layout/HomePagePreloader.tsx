import { useEffect } from 'react';
import { getImageProps } from 'next/image';
import metev from '@/data/work/metev.json';
import mentaiya from '@/data/work/mentaiya.json';
import sarc from '@/data/work/sarc.json';
import ntueats from '@/data/projects/ntueats.json';
import dontdrown from '@/data/projects/dontdrown.json';

// Loads images of other pages in the background so they are ready quicker.
// Match the destination components' sizes so the browser warms the same URLs.
const headerSizes = '(max-width: 640px) 33vw, (max-width: 1024px) 30vw, 480px';
const images = [
  ...[metev, mentaiya].flatMap((project) =>
    project.visual.columns.flatMap((column) =>
      column.images.map((image) => ({ src: image.src, sizes: headerSizes })),
    ),
  ),
  { src: sarc.visual.background.src, sizes: '(max-width: 1600px) 100vw, 1600px' },
  { src: sarc.visual.cursorSrc, sizes: '(max-width: 640px) 128px, 224px' },
  { src: ntueats.showcasePages[0].media.src, sizes: '(max-width: 640px) 65vw, 320px' },
  {
    src: dontdrown.bentoSections[0].items[0].media.src,
    sizes: '(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) 50vw, 600px',
  },
];
export default function HomePagePreloader() {
  useEffect(() => {
    images.forEach((source) => {
      const { props } = getImageProps({ ...source, alt: '', fill: true });
      const image = new window.Image();
      image.fetchPriority = 'low';
      if (props.sizes) image.sizes = props.sizes;
      if (props.srcSet) image.srcset = props.srcSet;
      image.src = props.src;
    });
  }, []);

  return null;
}
