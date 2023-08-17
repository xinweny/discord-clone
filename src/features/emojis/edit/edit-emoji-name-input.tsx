import {
  useFormContext,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';

import type { EditEmojiFields } from '../types';

import { formatEmojiName } from '@utils';

import { TextInput } from '@components/ui/forms';

type EditEmojiNameInputProps = {
  onSubmit: SubmitHandler<EditEmojiFields>;
};

export function EditEmojiNameInput({ onSubmit }: EditEmojiNameInputProps){
  const {
    handleSubmit,
    setValue,
  } = useFormContext();
  
  const name = 'name';

  const blurOnEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <TextInput
      id="emoji-name"
      name={name}
      label="Emoji Name"
      rules={{
        onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
          setValue(name, formatEmojiName(e.target.value));
          handleSubmit(onSubmit as SubmitHandler<FieldValues>)();
        },
      }}
      onKeyDown={blurOnEnter}
      autoFocus
    />
  );
}