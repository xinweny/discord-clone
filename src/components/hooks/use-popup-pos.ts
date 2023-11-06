import { useState, useEffect } from 'react';

type ArgsData = {
  show: boolean;
  btnRef: React.RefObject<Element>;
  popupRef: React.RefObject<Element>;
  position: PositionData;
}

export type PositionData = {
  direction: 'top' | 'bottom' | 'left' | 'right';
  align: 'start' | 'end' | 'center';
  gap: number;
};

const getPosStyle = (position: PositionData, btnRect: DOMRect, popupRect: DOMRect) => {
  const { direction, align, gap } = position;

  const posStyles = {
    opacity: 1,
    top: 0,
    left: 0,
  };

  switch (direction) {
    case 'top': {
      console.log(popupRect);
      posStyles.top = btnRect.top - popupRect.height - gap;
      posStyles.left = btnRect.left - (align === 'start' ? 0 : popupRect.width - btnRect.width);

      break;
    }
    case 'bottom': return {
      top: btnRect.top + btnRect.height + gap,
      left: btnRect.left - (align === 'start' ? 0 : popupRect.width - btnRect.width),
    };
    case 'left': return {
      top: btnRect.top - (align === 'start' ? 0 : popupRect.height - btnRect.height),
      left: btnRect.left + btnRect.width + gap,
    };
    case 'right': return {
      top: btnRect.top - (align === 'start' ? 0 : popupRect.height - btnRect.height),
      left: btnRect.left + gap,
    };
    default: break;
  }

  posStyles.top = posStyles.top < 0 ? 0 : posStyles.top;
  posStyles.left = posStyles.left < 0 ? 0 : posStyles.left;

  return posStyles as React.CSSProperties;
};

export const usePopupPos = (args: ArgsData) => {
  const [style, setStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  const { show, btnRef, popupRef, position } = args;

  useEffect(() => {
    if (!show) return;

    const timeoutId = setTimeout(() => {
      if (!show) return;
      if (!btnRef.current || !popupRef.current) return;

      const btnRect = btnRef.current.getBoundingClientRect();
      const popupRect = popupRef.current.getBoundingClientRect();

      setStyle(getPosStyle(position, btnRect, popupRect));
    }, 60);
    
    return () => { clearTimeout(timeoutId); };
  }, [show]);

  return style;
};