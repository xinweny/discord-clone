import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { serverSchema } from './schema';

import {
  TextInput,
  FileInput,
  ErrorMessage,
  FormGroup,
  SubmitButton,
} from '@components/ui';

import { ServerAvatarPreview } from './server-avatar-preview';

import { useCreateServerMutation } from '../api';

type CreateServerFormProps = {
  closeBtn: HTMLButtonElement | null;
};

export type CreateServerFields = {
  name: string;
  file?: File;
};

export function CreateServerForm({ closeBtn }: CreateServerFormProps) {
  const methods = useForm<CreateServerFields>({
    resolver: zodResolver(serverSchema),
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
          <ServerAvatarPreview />
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