import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { serverSchema } from './server-schema';

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
  const {
    register, 
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
    reset,
    control,
  } = useForm<CreateServerFields>({
    resolver: zodResolver(serverSchema),
  });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorMessage error={errors.file} />
      <label htmlFor="upload">
        <ServerAvatarPreview control={control} />
        <FileInput
          id="upload"
          name="file"
          accept="image/*"
          label="Upload"
          register={register}
          setValue={setValue}
          hidden
        />
      </label>
      <FormGroup label="server's name" htmlFor="server-name">
        <TextInput
          type="text"
          name="name"
          id="server-name"
          label="Server's name"
          register={register}
          rules={{ required: true }}
        />
      </FormGroup>
      <SubmitButton isDirty={isDirty} isValid={isValid}>Create</SubmitButton>
      <p>{errors.file?.message}</p>
    </form>
  );
}