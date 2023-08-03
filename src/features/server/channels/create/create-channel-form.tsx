import { useForm } from 'react-hook-form';

import {
  TextInput,
  RadioInput,
  FormGroup,
  Fieldset,
  SubmitButton,
} from '@components/ui';

import { ChannelTypeInputWrapper } from './channel-type-input-wrapper';

type CreateChannelFormProps = {
  categoryId?: string;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
};

export type CreateChannelFields = {
  name: string;
  type: string;
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
    formState: { isDirty, isValid },
  } = useForm<CreateChannelFields>({
    defaultValues: {
      name: '',
      categoryId,
    }
  });

  return (
    <form>
      <Fieldset legend="channel type">
        <ChannelTypeInputWrapper
          value="text"
          control={control}
          radioInput={<RadioInput
            name="type"
            value="text"
            label="Channel Type"
            register={register}
          />}
        >
          <img src="#" alt="" />
          <div>
            <p>Text</p>
            <p>Send messages, images, GIFs, opinions and puns</p>
          </div>
        </ChannelTypeInputWrapper>
        <ChannelTypeInputWrapper
          value="voice"
          control={control}
          radioInput={<RadioInput
            name="type"
            value="voice"
            label="Channel Type"
            register={register}
          />}
        >
          <img src="#" alt="" />
          <div>
            <p>Voice</p>
            <p>Hang out together with voice, video and screen share</p>
          </div>
        </ChannelTypeInputWrapper>
      </Fieldset>
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
        <SubmitButton isDirty={isDirty} isValid={isValid}>Create Channel</SubmitButton>
      </div>
    </form>
  );
}