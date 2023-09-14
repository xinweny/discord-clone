import type { RenderLeafProps } from 'slate-react';

type CustomText = {
  text: string;
  decoration: string;
};

export function Leaf ({
  attributes,
  children,
  leaf,
}: RenderLeafProps) {
  const { decoration } = leaf as CustomText;

  if (decoration === 'link') {
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