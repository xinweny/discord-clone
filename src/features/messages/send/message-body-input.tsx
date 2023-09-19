import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Descendant,
  Transforms,
  Editor,
} from 'slate';
import {
  Slate,
  Editable,
  ReactEditor,
} from 'slate-react';

import type { CustomEditor } from '@config';
import type { MessageData, MessageEmojiData } from '../types';

import { resetEditor, decorator, serialize, slateDeserialize } from '../slate';

import { Leaf } from './leaf';
import { Element } from './element';

type MessageBodyInputProps = {
  name: string;
  authorized: boolean;
  enterSubmit: React.KeyboardEventHandler<HTMLDivElement>;
  editor: CustomEditor;
  message?: MessageData;
  setEmojis: React.Dispatch<React.SetStateAction<MessageEmojiData[]>>;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function MessageBodyInput({
  name,
  authorized,
  enterSubmit,
  editor,
  message,
  setEmojis,
  ...props
}: MessageBodyInputProps) {
  const { roomId } = useParams();

  const {
    watch,
    control,
    setValue,
  } = useFormContext();

  const body = watch(name);

  const initialValue: Descendant[] = message
    ? slateDeserialize(message)
    : [
      {
        type: 'text',
        children: [{ text: '' }],
      } as Descendant,
    ];

  useEffect(() => {
    if (body) {
      const { text, emojis } = serialize(editor.children);

      if (setEmojis) setEmojis(emojis);
      setValue(name, text);
    }
  }, [body]);

  useEffect(() => {
    Transforms.select(editor, message
    ? Editor.end(editor, [])
    : { offset: 0, path: [0, 0] });

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
                enterSubmit(e);

                if (e.key === 'Enter' && !e.shiftKey) {
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