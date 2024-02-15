import type { RenderElementProps } from 'slate-react';

import type { EmojiProps } from '@components/ui/media';

import { Emoji } from '@components/ui/media';

import styles from './element.module.scss';
import { Tooltip } from '@components/ui/popups';

export function Element (props: RenderElementProps) {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'emoji':
      return <span {...attributes} className={styles.element}>
        <Tooltip
          text={element.shortcode}
          direction="top"
          gap={4}
        >
          <Emoji {...element as EmojiProps} />
        </Tooltip>
        {children}
      </span>;
    default:
      return <div {...attributes}>{children}</div>;
  }
}