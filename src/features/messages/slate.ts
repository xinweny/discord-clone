import {
  type BaseEditor,
  type NodeEntry,
  Node,
  Transforms,
  Editor,
  type Descendant,
} from 'slate';
import { ReactEditor } from 'slate-react';
import type { HistoryEditor } from 'slate-history';
import { v4 as uuid } from 'uuid';

import type { MessageEmojiData } from './types';

import type {
  CustomEditor,
  CustomRange,
  EmojiElement,
  TextElement,
} from '@config';

type DeserializeOutput = {
  id: string;
} & ({
  text: string;
} | {
  emoji: MessageEmojiData;
});

export const findUrlsInText = (text: string): [string, number][] => {
  const urlRegex =
    // eslint-disable-next-line no-useless-escape
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

  const matches = text.match(urlRegex);

  return matches
    ? matches.map((m) => [m.trim(), text.indexOf(m.trim())])
    : [];
};

export const resetEditor = (editor: BaseEditor & ReactEditor & HistoryEditor) => {
  const point = { path: [0, 0], offset: 0 };

  Transforms.setSelection(editor, { anchor: point, focus: point });

  Transforms.delete(editor, {
    at: {
      anchor: Editor.start(editor, []),
      focus: Editor.end(editor, []),
    },
  });

  Transforms.removeNodes(editor, { at: [0] });

  Transforms.insertNodes(editor, [{
    type: 'text',
    children: [{ text: '' }],
  } as Descendant]);

  editor.history = { redos: [], undos: [] };
};

export const decorator = (entry: NodeEntry): CustomRange[] => {
  const [node, path] = entry;

  const nodeText = Node.string(node);

  if (!nodeText) return [];

  const urls = findUrlsInText(nodeText);

  return urls.map(([url, index]) => ({
    anchor: {
      path,
      offset: index,
    },
    focus: {
      path,
      offset: index + url.length,
    },
    decoration: 'link',
  }));
};

export const insertEmoji = (editor: CustomEditor, emoji: any) => {
  ReactEditor.focus(editor);

  const image: EmojiElement = {
    type: 'emoji',
    id: emoji.name,
    emoji: emoji.src || emoji.native,
    custom: 'src' in emoji,
    shortcode: emoji.shortcodes,
    children: [{ text: '' }],
  };

  Transforms.insertNodes(editor, image);
  Transforms.move(editor, { distance: 1 });
  Transforms.insertText(editor, ' ');

  ReactEditor.focus(editor);
};

export const withEmojis = (editor: CustomEditor) => {
  const { isVoid, isInline } = editor;

  editor.isVoid = (element) => element.type === 'emoji'
    ? true
    : isVoid(element);

  editor.isInline = (element) => element.type === 'emoji'
    ? true
    : isInline(element);

  return editor;
};

export const serialize = (nodes: Descendant[]) => {
  const emojis: MessageEmojiData[] = [];

  const text = nodes.map(node => {
    if (!('children' in node)) return '';

    return node.children.map(n => {
      if ('type' in n && n.type === 'emoji') {
        const { shortcode, id, emoji } = n;

        if (n.custom) {
          emojis.push({
            id,
            shortcode,
            url: emoji,
            custom: true,
          });

          return `<${shortcode}${id}>`;
        } else {
          emojis.push({
            id: emoji,
            shortcode,
            custom: false,
          });

          return emoji;
        }
      } else {
        return Node.string(n as Descendant);
      }
    }
    ).join('');
  })
    .join('\n')
    .trim();

  return {
    text,
    emojis,
  };
};

export const deserialize = (body: string, emojis: MessageEmojiData[]): DeserializeOutput[] => {
  const strs = body
    .split(/(<:.+?:[a-z0-9]+>)|(\p{Emoji_Presentation})/gu)
    .filter(string => !!string);

  const nodes = strs.map(str => {
    if (str.match(/<:.+?:[a-z0-9]+>/gu)) {
      const emoji = emojis.find(emoji =>
        emoji.id === str.split(':').slice(-1)[0].replace('>', '')
      ) as MessageEmojiData;

      return { id: uuid(), emoji };
    }

    if (str.match(/\p{Emoji_Presentation}/gu)) {
      const emoji = emojis.find(emoji => emoji.id === str) as MessageEmojiData;

      return { id: uuid(), emoji };
    }

    return { id: uuid(), text: str };
  })

  return nodes;
};