import { FeaturedServersContainer } from './featured-servers-container';
import { ServerSearchBanner } from './server-search-banner';

type DiscoverServersContainerProps = {
  containerRef: React.RefObject<HTMLDivElement>;
};

export function DiscoverServersContainer({
  containerRef,
}: DiscoverServersContainerProps) {
  return (
    <>
      <ServerSearchBanner />
      <FeaturedServersContainer containerRef={containerRef} />
    </>
  );
}