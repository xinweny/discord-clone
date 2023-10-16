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

import type { MessageEmojiData } from './types';
import type { MessageData } from './types';

import type {
  CustomEditor,
  CustomElement,
  CustomRange,
  EmojiElement,
  TextElement,
} from '@config';

import { findUrls } from '@utils';
import { isServerInviteLink } from '@features/server-invites/utils';

type UrlMatchData = {
  url: string;
  index: number;
  path: number;
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

export const findUrlsInNode = (node: Node): UrlMatchData[] => {
  const urlMatches = [] as UrlMatchData[];

  const { children } = node;

  if (!children) return urlMatches;

  for (const [path, child] of children.entries()) {
    if ('text' in child) {
      const { text } = child;

      const matches = findUrls(text);

      if (matches) {
        matches.forEach((m) => {  
          urlMatches.push({
            url: m,
            index: text.indexOf(m),
            path,
          });
        });
      }
    }
  }

  return urlMatches;
};

export const decorator = (entry: NodeEntry): CustomRange[] => {
  const [node, path] = entry;

  const nodeText = Node.string(node); 

  if (!nodeText) return [];

  const urls = findUrlsInNode(node);

  const range = urls.map(({ url, index, path: p }) => {
    const r = {
      anchor: {
        path: [...path, p],
        offset: index,
      },
      focus: {
        path: [...path, p],
        offset: index + url.length,
      },
    };

    return {
      ...r,
      decoration: isServerInviteLink(url) ? 'server_invite_link' : 'link',
    };
  }) as CustomRange[];

  return range;
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
            url: undefined,
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

export const slateDeserialize = (message: MessageData): Descendant[] => {
  const { body, emojis } = message;

  const nodes: Descendant[] = [];
  const lines = body.split('\n');

  const emojiRegex = /(<:.+?:[a-z0-9]+>)|(\p{Emoji_Presentation})/gu;

  for (const line of lines) {
    const lineNode = {
      type: 'text',
      children: [] as CustomElement[],
    } as TextElement;

    const strs = line
      .split(emojiRegex)
      .filter(string => !!string);

    const { children } = lineNode;

    if (strs.length === 0) {
      children.push({ text: '' } as TextElement);
      nodes.push(lineNode);
      continue;
    }

    if (strs[0].match(emojiRegex)) children.push({ text: '' } as TextElement);

    for (const str of strs) {
      if (str.match(emojiRegex)) {
        const emoji = emojis.find(emoji =>
          (emoji.id === str) ||
          (emoji.id === str.split(':').slice(-1)[0].replace('>', ''))
        ) as MessageEmojiData;

        const { id, custom, shortcode, url } = emoji;

        children.push({
          type: 'emoji',
          id,
          custom,
          shortcode,
          emoji: url || id,
          children: [{ text: '' }],
        } as EmojiElement);
      } else {
        children.push({ text: str } as TextElement);
      }
    }

    nodes.push(lineNode);
  }

  return nodes;
};