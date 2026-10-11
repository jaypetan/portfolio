import BentoMediaCard, { type BentoItemData } from './BentoMediaCard';

export interface BentoSectionData {
  id: string;
  layout: string;
  items: BentoItemData[];
}

export default function BentoGrid({ section }: { section: BentoSectionData }) {
  const layout = ['mosaic', 'quad'].includes(section.layout) ? section.layout : 'split';
  const cardCount = layout === 'mosaic' ? 5 : layout === 'quad' ? 4 : 3;

  return (
    <div className="bento-grid" data-layout={layout}>
      {section.items.map((item, index) => (
        <BentoMediaCard
          key={item.id}
          item={item}
          className={index < cardCount ? `bento-slot-${index + 1}` : 'bento-extra'}
        />
      ))}
    </div>
  );
}
