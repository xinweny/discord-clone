import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormContext, Controller } from 'react-hook-form';
import {
  createEditor,
  Descendant,
  Node,
  Transforms,
} from 'slate';
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
} from 'slate-react';
import { withHistory } from 'slate-history';
import { resetEditor } from '@utils';

type MessageBodyInputProps = {
  name: string;
  authorized: boolean;
  enterSubmit: React.KeyboardEventHandler<HTMLDivElement>;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function MessageBodyInput({
  name,
  authorized,
  enterSubmit,
  ...props
}: MessageBodyInputProps) {
  const { channelId, roomId } = useParams();

  const {
    watch,
    control,
    setValue,
  } = useFormContext();

  const body = watch(name);

  const [editor] = useState(() => (
    withReact(withHistory(createEditor()))
  ));

  useEffect(() => {
    ReactEditor.focus(editor);
    Transforms.select(editor, { offset: 0, path: [0, 0] });
    resetEditor(editor);
  }, [channelId, roomId]);

  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: body }],
    },
  ];

  useEffect(() => {
    const text = editor.children.map(node => Node.string(node)).join('');

    setValue(name, text);
  }, [body]);

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
              autoFocus
            />
          </Slate>
        )}
      />
  );
}