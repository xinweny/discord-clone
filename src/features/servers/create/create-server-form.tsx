import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { fileValidator } from '@utils';

import { usePreviewSingle } from '@hooks';

import { FormInput, FileInput, ErrorMessage } from '@components/ui';

import { ServerAvatarPreview } from './server-avatar-preview';

import { useCreateServerMutation } from '../api';

type CreateServerFields = {
  name: string;
  file?: File;
};

const serverSchema = zod.object({
  name: zod.string().min(1),
  file: fileValidator.avatar,
});

export function CreateServerForm() {
  const {
    register, 
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateServerFields>({
    resolver: zodResolver(serverSchema),
  });
  const { fileDataUrl, handleChange } = usePreviewSingle();

  const [createServer] = useCreateServerMutation();

  const onSubmit = async (data: CreateServerFields) => {
    const { name, file } = data;

    try {
      await createServer({ name, file }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorMessage error={errors.file} />
      <label htmlFor="upload">
        <ServerAvatarPreview placeholderSrc="#" previewSrc={fileDataUrl} />
        <FileInput
          id="upload"
          name="file"
          accept="image/*"
          label="Upload"
          register={register}
          setValue={setValue}
          setPreview={handleChange}
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