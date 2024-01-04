import { useRef } from 'react';
import { useHover } from '@uidotdev/usehooks';

import { mergeRefs } from '@utils';

import { usePopupPos } from '@components/hooks';

import { PortalWrapper } from '@components/wrappers';

import styles from './tooltip.module.scss';

export type TooltipProps = {
  text: string;
  children: React.ReactNode;
  direction: 'left' | 'right' | 'top' | 'bottom';
  gap?: number;
  arrow?: number;
};

const ARROW_WIDTH = 6;

export function Tooltip({
  text,
  children,
  direction,
  gap = 0,
  arrow = 6,
}: TooltipProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [hoverRef, isHovered] = useHover();

  const arrowWidth = typeof arrow === 'number'
    ? arrow
    : ARROW_WIDTH;

  const posStyles = usePopupPos({
    position: {
      direction,
      align: 'center',
      gap: gap + arrowWidth,
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
          isOpen={isHovered}
          className={styles.container}
        >
          <div
            className={`${styles.tooltip} ${styles[direction]}`}
            style={{
              ...posStyles,
              '--arrow-width': `${arrowWidth}px`,
            } as React.CSSProperties}
            ref={tooltipRef}
          >
            <span>{text}</span>
          </div>
        </PortalWrapper>
      )}
    </>
  );
}