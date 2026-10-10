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
  variant?: 'preview' | 'header';
}

export default function ImageShowcaseColumns({
  columns,
  heightClassName = 'h-64',
  containerClassName = 'flex flex-row gap-4',
  className = '',
  variant = 'preview',
}: ImageShowcaseColumnsProps) {
  return (
    <div
      className={`${
        variant === 'header'
          ? 'flex h-full w-full gap-3 overflow-hidden bg-transparent px-3 sm:gap-6 sm:px-6'
          : `mx-auto w-[calc(100vw-2.5rem)] max-w-135 overflow-hidden bg-transparent p-0 shadow-none sm:w-auto ${containerClassName}`
      } ${className}`.trim()}
    >
      {columns.map((column, index) => (
        <InfiniteImageLoop
          key={`${column.direction ?? 'up'}-${index}`}
          images={column.images}
          direction={column.direction ?? 'up'}
          imageWidth={column.imageWidth ?? 160}
          itemClassName={`overflow-hidden ${column.itemClassName ?? ''}`.trim()}
          imageClassName={column.imageClassName ?? 'w-full object-cover'}
          className={variant === 'header' ? 'h-full min-w-0 flex-1' : heightClassName}
          responsive={variant === 'header'}
        />
      ))}
    </div>
  );
}
