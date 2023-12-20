import { FeaturedServersContainer } from './featured-servers-container';
import { ServerSearchBanner } from './server-search-banner';

export function DiscoverServersContainer() {
  return (
    <>
      <ServerSearchBanner />
      <FeaturedServersContainer />
    </>
  );
}