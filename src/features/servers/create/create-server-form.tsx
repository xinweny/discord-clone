import { useForm } from 'react-hook-form';

import { FormInput, FileInput } from '@components/ui';

type CreateServerFields = {
  name: string;
  avatar: File;
};

export function CreateServerForm() {
  const { register, handleSubmit } = useForm<CreateServerFields>();

  const onSubmit = (data: CreateServerFields) => {
    console.log(data.avatar);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FileInput
        name="avatar"
        accept="image/*"
        label="Upload"
        register={register}
      >
        <img src="#" alt="Placeholder" />
      </FileInput>
      <FormInput
        type="text"
        name="name"
        id="serverName"
        label="Server's name"
        register={register}
        rules={{ required: true }}
      />
      <button type="submit">Create</button>
    </form>
  );
}