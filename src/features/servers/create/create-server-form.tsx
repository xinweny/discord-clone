import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { CreateServerFields } from '../types';

import { createServerSchema } from './schema';

import {
  TextInput,
  FileInput,
  ErrorMessage,
  FormGroup,
  SubmitButton,
} from '@components/ui/forms';

import { ImagePreview } from '@components/ui/media';

import { useCreateServerMutation } from '../api';

type CreateServerFormProps = {
  closeBtn: HTMLButtonElement | null;
};

export function CreateServerForm({ closeBtn }: CreateServerFormProps) {
  const methods = useForm<CreateServerFields>({
    resolver: zodResolver(createServerSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const [createServer] = useCreateServerMutation();

  const onSubmit = async (data: CreateServerFields) => {
    const { name, file } = data;

    try {
      await createServer({ name, file }).unwrap();
      reset();
      if (closeBtn) closeBtn.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ErrorMessage error={errors.file} />
        <label htmlFor="upload">
          <ImagePreview
            name="file"
            defaultSrc="#"
          />
          <FileInput
            id="upload"
            name="file"
            accept="image/*"
            label="Upload"
            hidden
          />
        </label>
        <FormGroup label="server's name" htmlFor="server-name">
          <TextInput
            type="text"
            name="name"
            id="server-name"
            label="Server's name"
            rules={{ required: true }}
          />
        </FormGroup>
        <SubmitButton>Create</SubmitButton>
      </form>
    </FormProvider>
  );
}