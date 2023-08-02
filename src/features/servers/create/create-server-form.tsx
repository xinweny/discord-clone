import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { serverSchema } from './server-schema';

import { FormInput, FileInput, ErrorMessage } from '@components/ui';

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
    formState: { errors },
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
      <FormInput
        type="text"
        name="name"
        id="serverName"
        label="Server's name"
        register={register}
        rules={{ required: true }}
      />
      <button type="submit">Create</button>
      <p>{errors.file?.message}</p>
    </form>
  );
}