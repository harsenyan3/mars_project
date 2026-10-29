import { GlassPanel } from '../../components/ui/GlassPanel';

export function ShowsEmptyState() {
  return (
    <GlassPanel className="shows-empty">
      <p className="shows-empty-title">No dates announced yet</p>
      <p className="shows-empty-text">
        Follow{' '}
        <a href="https://instagram.com/marsprojectatl" target="_blank" rel="noopener noreferrer">
          @marsprojectatl
        </a>{' '}
        to catch the next one.
      </p>
    </GlassPanel>
  );
}
