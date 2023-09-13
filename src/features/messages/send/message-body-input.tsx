import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

type MessageBodyInputProps = {
  name: string;
  authorized: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function MessageBodyInput({
  name,
  authorized,
  onKeyDown,
  ...props
}: MessageBodyInputProps) {
  const {
    register,
    watch,
    setValue,
  } = useFormContext();

  const body = watch(name);

  const [editor] = useState(() => withReact(createEditor()));

  useEffect(() => { register(name); }, []);

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: body }],
    },
  ];

  const { placeholder } = props;

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      place
    >
      <Editable
        placeholder={!authorized
          ? 'You do not have permission to send messages in this channel.'
          : placeholder
        }
        autoFocus={true}
      />
    </Slate>
  );
}