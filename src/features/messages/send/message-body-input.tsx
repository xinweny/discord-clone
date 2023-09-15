import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Descendant,
  Node,
  Transforms,
  type BaseEditor,
} from 'slate';
import {
  Slate,
  Editable,
  ReactEditor,
} from 'slate-react';
import {
  type HistoryEditor,
} from 'slate-history';

import type { MessageData } from '../types';

import { resetEditor, decorator } from '@utils';

import { Leaf } from './leaf';

type MessageBodyInputProps = {
  name: string;
  authorized: boolean;
  enterSubmit: React.KeyboardEventHandler<HTMLDivElement>;
  editor: BaseEditor & ReactEditor & HistoryEditor;
  message?: MessageData;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function MessageBodyInput({
  name,
  authorized,
  enterSubmit,
  editor,
  message,
  ...props
}: MessageBodyInputProps) {
  const { roomId } = useParams();

  const {
    watch,
    control,
    setValue,
  } = useFormContext();

  const body = watch(name);

  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: message?.body || '' }],
    },
  ];

  useEffect(() => {
    const text = editor.children.map(node => Node.string(node)).join('');

    setValue(name, text);
  }, [body]);

  useEffect(() => {
    resetEditor(editor);
    Transforms.select(editor, { offset: 0, path: [0, 0] });

    const focusEditor = setTimeout(() => { ReactEditor.focus(editor); });

    return () => { clearTimeout(focusEditor); }
  }, [roomId]);

  const { placeholder } = props;

  return (
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange },
        }) => (
          <Slate
            editor={editor}
            initialValue={initialValue}
            onChange={onChange}
          >
            <Editable
              placeholder={!authorized
                ? 'You do not have permission to send messages in this channel.'
                : placeholder
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  enterSubmit(e);

                  resetEditor(editor);
                }
              }}
              readOnly={!authorized}
              renderLeaf={Leaf}
              decorate={decorator}
              autoFocus
            />
          </Slate>
        )}
      />
  );
}