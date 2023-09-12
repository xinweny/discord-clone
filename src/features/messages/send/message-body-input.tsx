import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

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
  const inputRef = useRef<HTMLDivElement>(null);
  const caretPos = useRef<number>(0);

  const {
    register,
    watch,
    setValue,
  } = useFormContext();

  const body = watch(name);

  useEffect(() => { register(name); }, []);

  useEffect(() => { inputRef.current?.focus(); }, []);
  
  const { placeholder } = props;

  return (
    <div
      {...props}
      ref={inputRef}
      onInput={(e) => {
        if (inputRef.current) inputRef.current.textContent = e.currentTarget.textContent;

        setValue(
          name,
          e.currentTarget.textContent?.trim() || '',
          {
            shouldValidate: true,
            shouldDirty: true,
          }
        );
      }}
      placeholder={!authorized
        ? 'You do not have permission to send messages in this channel.'
        : placeholder
      }
      onKeyDown={onKeyDown}
      contentEditable
      suppressContentEditableWarning
    >
      {body}
    </div>
  );
}