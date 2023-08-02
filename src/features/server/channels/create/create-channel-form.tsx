import { useForm } from 'react-hook-form';

import { FormInput } from '@components/ui';

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

  const closeForm = () => { closeBtnRef.current?.click(); };

  return (
    <form>
      <FormInput
        name="name"
        label="Channel Name"
        id="channel-name"
        placeholder="new-channel"
        register={register}
      />
      <div>
        <button type="button" onClick={closeForm}>Cancel</button>
        <button type="submit">Create Channel</button>
      </div>
    </form>
  );
}