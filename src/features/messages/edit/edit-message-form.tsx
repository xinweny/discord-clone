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
import { useEditor } from '../hooks';

import { CancelSubmitMessage } from './cancel-submit-message';
import { MessageBodyInput } from '../send/message-body-input';
import { MessageOptionsBar } from '../send/message-options-bar';

import { useEditMessageMutation } from '../api';

type EditMessageFormProps = {
  message: MessageData;
  closeForm: () => void;
};

export function EditMessageForm({
  message,
  closeForm,
}: EditMessageFormProps) {
  const { _id } = message;

  const { serverId, roomId } = useParams();

  const defaultValues = {
    serverId,
    roomId: roomId,
    messageId: _id,
    body: '',
    emojis: [],
  };

  const methods = useForm<EditMessageFields>({
    defaultValues,
  });
  const { handleSubmit } = methods;

  const [editMessage] = useEditMessageMutation();

  const { editor, emojis, setEmojis } = useEditor();

  const onSubmit = async (data: EditMessageFields) => {
    await editMessage({
      serverId: serverId!,
      roomId: message.roomId,
      messageId: message._id,
      body: data.body,
      emojis: emojis,
    }).unwrap();

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
        <MessageBodyInput
          name="body"
          authorized={true}
          message={message}
          editor={editor}
          setEmojis={setEmojis}
          enterSubmit={(e) => {
            enterSubmit(e);
            escapeCancel(e);
          }}
        />
        <CancelSubmitMessage clickHandlers={{
          cancel: clickCancel,
          submit: clickSubmit,
        }}/>
      </form>
      <MessageOptionsBar editor={editor} editMode={true} />
    </FormProvider>
  );
}