import type { RenderElementProps } from 'slate-react';

import type { EmojiProps } from '@components/ui/media';

import { Emoji } from '@components/ui/media';

export function Element (props: RenderElementProps) {
  const { attributes, children, element } = props;

  console.log(attributes);

  switch (element.type) {
    case 'emoji':
      return <span {...attributes}>
        <Emoji {...element as EmojiProps} />
        {children}
      </span>;
    default:
      return <div {...attributes}>{children}</div>;
  }
}