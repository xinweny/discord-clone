import { useForm, FormProvider } from 'react-hook-form';

import { SubmitButton } from '@components/ui';

import {
  ChannelTypeFieldset,
  ChannelNameInput,
  PrivateChannelSection,
} from '.';

type CreateChannelFormProps = {
  categoryId?: string;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
};

export type CreateChannelFields = {
  name: string;
  type: string;
  categoryId?: string;
  private: boolean;
};

export function CreateChannelForm({
  categoryId, closeBtnRef
}: CreateChannelFormProps) {
  const methods = useForm<CreateChannelFields>({
    defaultValues: {
      name: '',
      type: 'text',
      categoryId,
      private: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <ChannelTypeFieldset />
        <ChannelNameInput />
        <PrivateChannelSection />
        <div>
          <button
            type="button"
            onClick={() => { closeBtnRef.current?.click(); }}
          >Cancel</button>
          <SubmitButton>Create Channel</SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
}