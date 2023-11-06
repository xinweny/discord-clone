import { useRef } from 'react';
import { useHover } from '@uidotdev/usehooks';

import { mergeRefs } from '@utils';

import { usePopupPos } from '@components/hooks';

import { PortalWrapper } from '@components/wrappers';

import styles from './tooltip.module.scss';

type TooltipProps = {
  text: string;
  children: React.ReactNode;
  direction: 'left' | 'right' | 'top' | 'bottom';
  options?: {
    gap: number;
  }
};

export function Tooltip({
  text,
  children,
  direction,
  options = {
    gap: 12,
  }
}: TooltipProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [hoverRef, isHovered] = useHover();

  const { gap } = options;

  const posStyles = usePopupPos({
    position: {
      direction,
      align: 'center',
      gap,
    },
    show: isHovered,
    btnRef: divRef,
    popupRef: tooltipRef,
  });

  return (
    <>
      <div ref={mergeRefs(hoverRef, divRef)}>
        {children}
      </div>
      {isHovered && (
        <PortalWrapper
          rootId="popup-root"
          isOpen={true}
          className={styles.wrapper}
          childOpts={{
            className: styles.container,
            style: posStyles,
            ref: tooltipRef,
          }}
        >
          <div className={`${styles.tooltip} ${styles[direction]}`}>
            <span>{text}</span>
          </div>
        </PortalWrapper>
      )}
    </>
  );
}