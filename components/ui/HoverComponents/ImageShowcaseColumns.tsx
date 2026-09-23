import InfiniteImageLoop from '@/components/ui/HoverComponents/InfiniteImageLoop';

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
  className?: string;
}

export default function ImageShowcaseColumns({
  columns,
  heightClassName = 'h-64',
  containerClassName = 'flex flex-row gap-4',
  className = '',
}: ImageShowcaseColumnsProps) {
  return (
    <div
      className={`mx-auto w-[calc(100vw-2.5rem)] max-w-135 overflow-hidden bg-transparent p-0 shadow-none sm:w-auto ${className} ${containerClassName}`.trim()}
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
