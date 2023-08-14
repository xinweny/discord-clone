import { useState, useRef, useLayoutEffect } from 'react';

export type ContextData = {
  visible: boolean;
  posX: number;
  posY: number;
};

export const useContextMenu = (targetRef: React.RefObject<HTMLElement>) => {
  const initialContextState = {
    visible: false,
    posX: 0,
    posY: 0,
  };

  const [contextData, setContextData] = useState<ContextData>(initialContextState);

  const contextMenuRef = useRef<HTMLDivElement>(null);


  useLayoutEffect(() => {
    const contextMenu = contextMenuRef.current;

    if (
      contextMenu && (contextData.posX + contextMenu.offsetWidth > window.innerWidth)
    ) {
      setContextData({ ...contextData, posX: contextData.posX - contextMenu.offsetWidth});
    }
    if (
      contextMenu && (contextData.posY + contextMenu.offsetHeight > window.innerHeight)
    ) {
      setContextData({ ...contextData, posY: contextData.posY - contextMenu.offsetHeight});
    }
  }, [contextData]);

  const openContextMenu: React.MouseEventHandler<HTMLElement> = (e) => {
    const contextMenu = contextMenuRef.current;
    const targetElement = targetRef.current;

    if (
      targetElement && targetElement.contains(e.target as Node)
    ) {
      e.preventDefault();

      setContextData({ visible: true, posX: e.clientX, posY: e.clientY });
    } else if (
      contextMenu && !contextMenu.contains(e.target as Node)
    ) {
      setContextData({ ...contextData, visible: false });
    }
  };

  const closeContextMenu = () => {
    setContextData(initialContextState);
  };

  return {
    contextData,
    contextMenuRef,
    openContextMenu,
    closeContextMenu,
  };
};