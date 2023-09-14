import type { RenderLeafProps } from 'slate-react';

export function Leaf ({
  attributes,
  children,
  leaf,
}: RenderLeafProps) {
  if (leaf.decoration === 'link') {
    children = (
      <a
        style={{ cursor: 'pointer' }}
        href={leaf.text}
        onClick={() => {
          window.open(leaf.text, '_blank', 'noopener,noreferrer');
        }}
      >
        {children}
      </a>
    );
  }

  return <span {...attributes}>{children}</span>;
}