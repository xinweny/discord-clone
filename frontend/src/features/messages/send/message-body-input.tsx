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
import type { MessageData } from '../types';

import { resetEditor, decorator, serialize, slateDeserialize } from '../slate';

import { Leaf } from './leaf';
import { Element } from './element';

import styles from './message-body-input.module.scss';

type MessageBodyInputProps = {
  name: string;
  authorized: boolean;
  enterSubmit: React.KeyboardEventHandler<HTMLDivElement>;
  editor: CustomEditor;
  message?: MessageData;
  errorPlaceholder?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function MessageBodyInput({
  name,
  authorized,
  enterSubmit,
  editor,
  message,
  errorPlaceholder = 'You do not have permission to send messages in this channel.',
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
    if (!body) return;

    const { text } = serialize(editor.children);

    setValue(name, text);
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
              className={styles.input}
              placeholder={!authorized ? errorPlaceholder : placeholder}
              renderPlaceholder={({ children, attributes }) => {
                const style = attributes.style;
                style.top = '50%';
                style.transform = 'translateY(-50%)';

                return (
                  <div {...attributes}>
                    <span>{children}</span>
                  </div>
                );
              }}
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