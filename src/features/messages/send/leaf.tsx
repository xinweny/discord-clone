import type { RenderLeafProps } from 'slate-react';

import type { CustomText } from '@config';

export function Leaf ({
  attributes,
  children,
  leaf,
}: RenderLeafProps) {
  const { decoration } = leaf as CustomText;

  return (
    <div {...attributes}>
      {decoration === 'link'
        ? <a
          style={{ cursor: 'pointer' }}
          href={leaf.text}
          onClick={() => {
            window.open(leaf.text, '_blank', 'noopener,noreferrer');
          }}
        >
          {children}
        </a>
        : children
      }
    </div>
  );
}