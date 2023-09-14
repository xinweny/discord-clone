import type { BaseEditor } from 'slate';
import type { ReactEditor } from 'slate-react';
import type { HistoryEditor } from 'slate-history';

export const resetEditor = (editor: BaseEditor & ReactEditor & HistoryEditor) => {
  const point = { path: [0, 0], offset: 0 };
  
  editor.selection = { anchor: point, focus: point };

  editor.history = { redos: [], undos: [] };

  editor.children = [{
    type: 'paragraph',
    children: [{ text: '' }],
  }];
};