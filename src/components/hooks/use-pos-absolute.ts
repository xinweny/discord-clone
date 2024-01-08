import { useRef, useState, useLayoutEffect } from 'react';

export type AbsPosData = {
  visible: boolean;
  posX: number;
  posY: number;
};

export type AbsStyleData = {
  display: string;
  left: number;
  top: number;
};

export const usePosAbsolute = (targetRef: React.RefObject<HTMLElement>) => {
  const absElementRef = useRef<HTMLDivElement>(null);

  const initialPosState = {
    visible: false,
    posX: 0,
    posY: 0,
  };

  const [posData, setPosData] = useState<AbsPosData>(initialPosState);

  useLayoutEffect(() => {
    const element = absElementRef.current;

    if (
      element && (posData.posX + element.offsetWidth > window.innerWidth)
    ) {
      setPosData({ ...posData, posX: posData.posX - element.offsetWidth});
    }
    if (
      element && (posData.posY + element.offsetHeight > window.innerHeight)
    ) {
      setPosData({ ...posData, posY: posData.posY - element.offsetHeight});
    }
  }, [posData]);

  const absStyle = {
    display: posData.visible ? 'block' : 'none',
    left: posData.posX,
    top: posData.posY,
  };

  const openAbsElement: React.MouseEventHandler<HTMLElement> = (e) => {
    const absElement = absElementRef.current;
    const targetElement = targetRef.current;

    if (
      targetElement && targetElement.contains(e.target as Node)
    ) {
      e.preventDefault();

      setPosData({ visible: true, posX: e.clientX, posY: e.clientY });
    } else if (
      absElement && !absElement.contains(e.target as Node)
    ) {
      setPosData({ ...posData, visible: false });
    }
  };

  const closeAbsElement = () => { setPosData(initialPosState); };

  return {
    absElementRef,
    posData,
    setPosData,
    absStyle,
    openAbsElement,
    closeAbsElement,
  };
}