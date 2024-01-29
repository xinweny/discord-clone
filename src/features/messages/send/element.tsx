import type { RenderElementProps } from 'slate-react';

import type { EmojiProps } from '@components/ui/media';

import { Emoji } from '@components/ui/media';

import styles from './element.module.scss';

export function Element (props: RenderElementProps) {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'emoji':
      return <span {...attributes} className={styles.element}>
        <Emoji {...element as EmojiProps} />
        {children}
      </span>;
    default:
      return <div {...attributes}>{children}</div>;
  }
}