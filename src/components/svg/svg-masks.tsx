import { AvatarDefaultMask } from './avatar-default-mask';
import { AvatarStatusMask } from './avatar-status-mask';
import { StatusOnlineMask } from './status-online-mask';
import { StatusOfflineMask } from './status-offline-mask';

export function SvgMasks() {
  const style = {
    position: 'absolute',
    pointerEvents: 'none',
    top: '-1px',
    left: '-1px',
    width: '1px',
    height: '1px',
  } as React.CSSProperties;

  return (
    <svg viewBox="0 0 1 1" style={style} aria-hidden>
      <AvatarDefaultMask />
      <AvatarStatusMask />
      <StatusOnlineMask />
      <StatusOfflineMask />
    </svg>
  );
}