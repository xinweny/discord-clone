import { useContext, useRef, useState } from 'react';

import { ServerContext } from '@features/servers/context';

import { SidebarLayout } from '@components/layouts';

import { ServerHeader } from '@features/servers/get/server-header';
import { ChannelsList } from '@features/channels/list';

import styles from './channels-navbar.module.scss';
import { ServerBanner } from '@features/servers/get';

export function ChannelsNavbar() {
  const server = useContext(ServerContext);

  const [bannerStyle, setBannerStyle] = useState<React.CSSProperties>({
    opacity: 1,
    transform: 'translateY(0)',
  });

  const bufferRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (!server) return null;

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    const bufferHeight = bufferRef.current?.clientHeight;

    if (!scroller || !bufferHeight) return;

    const scrollDepth = scroller.scrollTop;
    
    setBannerStyle({
      opacity: Math.min((bufferHeight - scrollDepth) / bufferHeight, 1),
      transform: `translateY(-${Math.min(scrollDepth, bufferHeight)}px)`,
    });
  }

  return (
    <SidebarLayout
      top={<ServerHeader server={server} />}
      handleScroll={handleScroll}
      scrollerRef={scrollerRef}
    >
      {server.bannerUrl && (
        <>
          <ServerBanner src={server.bannerUrl} style={bannerStyle} />
          <div className={styles.buffer} ref={bufferRef}></div>
        </>
      )}
      <ChannelsList />
    </SidebarLayout>
  );
}