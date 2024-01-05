import { useState, useEffect } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';

type ArgsData = {
  show: boolean;
  btnRef: React.RefObject<Element>;
  popupRef: React.RefObject<Element>;
  position: PositionData;
  isLoaded?: boolean;
};

export type PositionData = {
  direction: 'top' | 'bottom' | 'left' | 'right';
  align: 'start' | 'end' | 'center';
  gap: number;
};

const getPosStyle = (
  position: PositionData,
  btnRect: DOMRect,
  popupRect: DOMRect,
  windowSize: {
    width: number | null;
    height: number | null;
  },
) => {
  const { height, width } = popupRect;

  const posStyles = {
    top: 0,
    left: 0,
    width,
    height,
  };

  const { direction, align, gap } = position;

  const { width: vw, height: vh } = windowSize;

  if (typeof vw !== 'number' || typeof vh !== 'number') return posStyles;

  switch (direction) {
    case 'top': {
      posStyles.top = btnRect.top - popupRect.height - gap,
      posStyles.left = btnRect.left + (align === 'center'
        ? (btnRect.width - popupRect.width) / 2
        : align === 'start' ? 0 : btnRect.width - popupRect.width
      );
      break;
    }
    case 'bottom': {
      posStyles.top = btnRect.bottom + gap;
      posStyles.left = btnRect.left + (align === 'center'
        ? (btnRect.width - popupRect.width) / 2
        : align === 'start' ? 0 : btnRect.width - popupRect.width
      );
      break;
    }
    case 'left': {
      posStyles.top = btnRect.top + (align === 'center'
        ? (btnRect.height - popupRect.height) / 2
        : align === 'start' ? 0 : btnRect.height - popupRect.height
      );
      posStyles.left = btnRect.left - popupRect.width - gap;
      break;
    }
    case 'right': {
      posStyles.top = btnRect.top + (align === 'center'
        ? (btnRect.height - popupRect.height) / 2
        : align === 'start' ? 0 : btnRect.height - popupRect.height
      );
      posStyles.left = btnRect.right + gap;
      break;
    }
    default: break;
  }
    
  const { top, left } = posStyles;
  const bottom = top + height;
  const right = left + width;

  posStyles.top = (top < 0)
    ? 0
    : (bottom > vh) ? top - (bottom - vh) : top;
  posStyles.left = (left < 0)
    ? 0
    : (right > vw) ? left - (right - vw)  : left;
  posStyles.height = (height > vh) ? vh : height;
  posStyles.width = (width > vw) ? vw : width;

  return posStyles as React.CSSProperties;
};

export const usePopupPos = ({
  show,
  btnRef,
  popupRef,
  isLoaded = true,
  position,
}: ArgsData) => {
  const [style, setStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  const windowSize = useWindowSize();

  useEffect(() => {
    if (!show || !isLoaded) return;

    const timeoutId = setTimeout(() => {
      if (!show) return;
      if (!btnRef.current || !popupRef.current) return;

      const btnRect = btnRef.current.getBoundingClientRect();
      const popupRect = popupRef.current.getBoundingClientRect();

      setStyle(getPosStyle(position, btnRect, popupRect, windowSize));
    }, 0);
    
    return () => { clearTimeout(timeoutId); };
  }, [show, isLoaded, windowSize]);

  return style;
};