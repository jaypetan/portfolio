import InfiniteImageLoop from '@/components/ui/InfiniteImageLoop';

interface ImageShowcaseColumnsProps {
  columns: Array<{
    images: Array<string | { src: string; alt?: string }>;
    direction?: 'up' | 'down';
    imageWidth?: number;
    itemClassName?: string;
    imageClassName?: string;
  }>;
  heightClassName?: string;
  containerClassName?: string;
}

export default function ImageShowcaseColumns({
  columns,
  heightClassName = 'h-64',
  containerClassName = 'flex flex-row gap-4',
}: ImageShowcaseColumnsProps) {
  return (
    <div
      className={`mx-auto w-[calc(100vw-2.5rem)] max-w-135 overflow-hidden bg-slate-950/40 p-2 shadow-lg sm:w-auto ${containerClassName}`.trim()}
    >
      {columns.map((column, index) => (
        <InfiniteImageLoop
          key={`${column.direction ?? 'up'}-${index}`}
          images={column.images}
          direction={column.direction ?? 'up'}
          imageWidth={column.imageWidth ?? 160}
          itemClassName={`overflow-hidden ${column.itemClassName ?? ''}`.trim()}
          imageClassName={column.imageClassName ?? 'w-full object-cover'}
          className={heightClassName}
        />
      ))}
    </div>
  );
}
