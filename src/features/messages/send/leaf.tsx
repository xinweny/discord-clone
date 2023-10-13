import type { RenderLeafProps } from 'slate-react';

import type { CustomText } from '@config';

import { findUrls } from '@utils';

export function Leaf ({
  attributes,
  children,
  leaf,
}: RenderLeafProps) {
  const { decoration, text } = leaf as CustomText;

  return (
    <span {...attributes}>
      {decoration === 'link' && !!findUrls(text)
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
    </span>
  );
}