import { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  createEditor,
  Descendant,
  Node,
  Transforms,
  Editor,
} from 'slate';
import {
  Slate,
  Editable,
  withReact,
} from 'slate-react';
import { withHistory } from 'slate-history';

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
  const {
    watch,
    control,
    setValue,
  } = useFormContext();

  const body = watch(name);

  const [editor] = useState(() => (
    withReact(withHistory(createEditor()))
  ));

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

                  Transforms.delete(editor, {
                    at: {
                      anchor: Editor.start(editor, []),
                      focus: Editor.end(editor, []),
                    },
                  });

                  editor.history = {
                    redos: [],
                    undos: [],
                  };
                }
              }}
              autoFocus
            />
          </Slate>
        )}
      />
  );
}