import ImageShowcaseColumns from '@/components/ui/HoverComponents/ImageShowcaseColumns';
import ShowcaseBoundedFrame from '@/components/ui/HoverComponents/ShowcaseBoundedFrame';
import ShowcaseTitleOverlay from '@/components/ui/HoverComponents/ShowcaseTitleOverlay';
import workData from '@/data/work/mentaiya.json';

const columns = workData.visual.columns.map((column) => ({
  ...column,
  direction: column.direction === 'down' ? ('down' as const) : ('up' as const),
}));

const MentaiyaVisual = ({ variant = 'preview' }: { variant?: 'preview' | 'header' }) => {
  return (
    <ShowcaseBoundedFrame
      variant={variant}
      className={variant === 'preview' ? 'rounded-2xl bg-slate-950/50' : ''}
    >
      {variant === 'preview' ? (
        <ShowcaseTitleOverlay title="Mentai-Ya" subtitle="Web Developer" />
      ) : null}
      <ImageShowcaseColumns variant={variant} columns={columns} />
    </ShowcaseBoundedFrame>
  );
};

export default MentaiyaVisual;
