export const useCaret = (divElRef: React.RefObject<HTMLDivElement>) => {
  const getCaretPos = () => {
    if (!divElRef.current) return 0;

    const sel = document.getSelection();

    if (!sel) return 0;

    sel.modify('extend', 'backward', 'paragraphboundary');

    const pos = sel.toString().length;
    if (sel.anchorNode != undefined) sel.collapseToEnd();

    return pos;
  }

  return {
    getCaretPos,
  };
}