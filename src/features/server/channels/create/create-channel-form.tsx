import { useForm } from 'react-hook-form';

import { TextInput, FormGroup } from '@components/ui';

type CreateChannelFormProps = {
  categoryId?: string;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
};

type CreateChannelFields = {
  name: string;
  categoryId?: string;
};

export function CreateChannelForm({
  categoryId, closeBtnRef
}: CreateChannelFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm<CreateChannelFields>({
    defaultValues: {
      name: '',
      categoryId,
    }
  });

  return (
    <form>
      <FormGroup label="channel name" htmlFor="channel-name">
        <TextInput
          name="name"
          label="Channel Name"
          id="channel-name"
          placeholder="new-channel"
          register={register}
        />
      </FormGroup>
      <div>
        <button
          type="button"
          onClick={() => { closeBtnRef.current?.click(); }}
        >Cancel</button>
        <button type="submit">Create Channel</button>
      </div>
    </form>
  );
}