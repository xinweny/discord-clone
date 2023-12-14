import {
  useForm,
  FormProvider,
  SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { EditEmojiFields, CustomEmojiData } from '../types';

import { editEmojiSchema } from '../schema';

import { useServerContext } from '@features/servers/context';

import { EditEmojiNameInput } from './edit-emoji-name-input';

import { useEditEmojiMutation } from '../api';

type EditEmojiFormProps = {
  emoji: CustomEmojiData;
  closeForm: () => void;
};

export function EditEmojiForm({ emoji, closeForm }: EditEmojiFormProps) {
  const server = useServerContext();

  const defaultValues = {
    emojiId: emoji._id,
    serverId: server?._id,
    name: emoji.name,
  };

  const methods = useForm<EditEmojiFields>({
    defaultValues,
    resolver: zodResolver(editEmojiSchema),
  });
  const { handleSubmit, reset } = methods;

  const [editEmoji] = useEditEmojiMutation();

  const onSubmit: SubmitHandler<EditEmojiFields> = async (data) => {
    const { name } = data;

    if (name === emoji.name) return;

    await editEmoji(data).unwrap();

    reset({
      name,
      serverId: server?._id,
    });

    closeForm();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditEmojiNameInput onSubmit={onSubmit} />
      </form>
    </FormProvider>
  );
}