import {
  type BaseEditor,
  type NodeEntry,
  Node,
} from 'slate';
import type { ReactEditor } from 'slate-react';
import type { HistoryEditor } from 'slate-history';

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
  
  editor.selection = { anchor: point, focus: point };

  editor.history = { redos: [], undos: [] };

  editor.children = [{
    type: 'paragraph',
    children: [{ text: '' }],
  }];
};

export const decorator = (entry: NodeEntry) => {
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