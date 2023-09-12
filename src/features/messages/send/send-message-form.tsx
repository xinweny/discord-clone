import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { sendMessageSchema } from '../schema';

import { useFileWatchMulti, useCustomSubmitHandlers } from '@hooks';

import { TextAreaInput } from '@components/ui/forms';
import { MessageOptionsBar } from './message-options-bar';

import { useSendMessageMutation } from '../api';
import { UploadFileButton } from './upload-file-button';

type SendMessageFormProps = {
  authorized?: boolean;
  placeholder?: string;
};

export type MessageFields = {
  attachments: File[];
  body: string;
};

export function SendMessageForm({ authorized = true, placeholder }: SendMessageFormProps) {
  const { channelId, roomId, serverId } = useParams();

  const methods = useForm<MessageFields>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: { attachments: [], body: '' },
  });
  const {
    control,
    setValue,
    reset,
    handleSubmit,
  } = methods;

  const fileWatch = useFileWatchMulti({
    control,
    name: 'attachments',
    setValue,
  });
  const { setAllFiles } = fileWatch;

  const [sendMessage] = useSendMessageMutation();

  const onSubmit = async (data: MessageFields) => {
    const { body, attachments } = data;

    await sendMessage({
      roomId: channelId || roomId!,
      serverId,
      body,
      attachments,
    }).unwrap();

    reset();
    setAllFiles([]);
  };

  const { enterSubmit } = useCustomSubmitHandlers(handleSubmit(onSubmit));

  return (
    <FormProvider {...methods}>
      <UploadFileButton authorized={authorized} fileWatch={fileWatch} />
      <form>
        <TextAreaInput
          label="Message body"
          name="body"
          id="body"
          onKeyDown={enterSubmit}
          placeholder={!authorized ?
            'You do not have permission to send messages in this channel.'
            : placeholder
          }
          disabled={!authorized}
        />
      </form>
      <MessageOptionsBar />
    </FormProvider>
  );
}