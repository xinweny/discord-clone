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

  let posStyles = {
    top: 0,
    left: 0,
  };

  switch (direction) {
    case 'top': {
      posStyles = {
        top: btnRect.top - popupRect.height - gap,
        left: btnRect.left + (align === 'center'
          ? (btnRect.width - popupRect.width) / 2
          : align === 'start' ? 0 : btnRect.width - popupRect.width
        ),
      }; break;
    }
    case 'bottom': {
      posStyles = {
        top: btnRect.bottom + gap,
        left: btnRect.left + (align === 'center'
          ? (btnRect.width - popupRect.width) / 2
          : align === 'start' ? 0 : btnRect.width - popupRect.width
        ),
      }; break;
    }
    case 'left': {
      posStyles = {
        top: btnRect.top + (align === 'center'
          ? (btnRect.height - popupRect.height) / 2
          : align === 'start' ? 0 : btnRect.height - popupRect.height
        ),
        left: btnRect.left - gap,
      }; break;
    }
    case 'right': {
      posStyles = {
        top: btnRect.top + (align === 'center'
          ? (btnRect.height - popupRect.height) / 2
          : align === 'start' ? 0 : btnRect.height - popupRect.height
        ),
        left: btnRect.right + gap,
      };
      break;
    }
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
    }, 0);
    
    return () => { clearTimeout(timeoutId); };
  }, [show]);

  return style;
};