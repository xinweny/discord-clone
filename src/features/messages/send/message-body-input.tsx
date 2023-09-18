import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Descendant,
  Transforms,
} from 'slate';
import {
  Slate,
  Editable,
  ReactEditor,
} from 'slate-react';

import type { CustomEditor } from '@config';

import type { MessageData } from '../types';

import { resetEditor, decorator, serialize } from '../slate';

import { Leaf } from './leaf';
import { Element } from './element';

type MessageBodyInputProps = {
  name: string;
  authorized: boolean;
  enterSubmit: React.KeyboardEventHandler<HTMLDivElement>;
  editor: CustomEditor;
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
      type: 'text',
      children: [{ text: message?.body || '' }],
    } as Descendant,
  ];

  useEffect(() => {
    setValue(name, JSON.stringify(editor.children));
  }, [body]);

  useEffect(() => {
    resetEditor(editor);
    Transforms.select(editor, { offset: 0, path: [0, 0] });

    const focusEditor = setTimeout(() => { ReactEditor.focus(editor); });

    return () => { clearTimeout(focusEditor); };
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
              renderElement={Element}
              decorate={decorator}
              autoFocus
            />
          </Slate>
        )}
      />
  );
}