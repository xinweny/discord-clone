import type { RenderElementProps } from 'slate-react';

import type { EmojiProps } from '@components/ui/media';

import { Emoji } from '@components/ui/media';

export function Element (props: RenderElementProps) {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'emoji':
      return <div {...attributes}>
        <Emoji {...element as EmojiProps} />
        {children}
      </div>;
    default:
      return <div {...attributes}>{children}</div>;
  }
}