import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import type {
  EditMessageFields,
  MessageData,
} from '../types';

import {
  useCustomSubmitHandlers,
  useCustomCancelHandlers,
} from '@hooks';

import { TextAreaInput } from '@components/ui/forms';
import { CancelSubmitMessage } from './cancel-submit-message';

import { useEditMessageMutation } from '../api';

type EditMessageFormProps = {
  message: MessageData;
  closeForm: () => void;
};

export function EditMessageForm({
  message,
  closeForm,
}: EditMessageFormProps) {
  const { _id, body } = message;

  const { serverId, roomId } = useParams();

  const defaultValues = {
    serverId,
    roomId: roomId,
    messageId: _id,
    body,
  };

  const methods = useForm<EditMessageFields>({
    defaultValues,
  });
  const { handleSubmit } = methods;

  const [editMessage] = useEditMessageMutation();

  const onSubmit = async (data: EditMessageFields) => {
    await editMessage(data).unwrap();

    closeForm();
  };

  const {
    enterSubmit,
    clickSubmit,
  } = useCustomSubmitHandlers(handleSubmit(onSubmit));

  const {
    escapeCancel,
    clickCancel,
  } = useCustomCancelHandlers(closeForm);

  return (
    <FormProvider {...methods}>
      <form>
        <TextAreaInput
          label="Message body"
          name="body"
          id="body"
          onKeyDown={(e) => {
            enterSubmit(e);
            escapeCancel(e);
          }}
        />
        <CancelSubmitMessage clickHandlers={{
          cancel: clickCancel,
          submit: clickSubmit,
        }}/>
      </form>
    </FormProvider>
  );
}