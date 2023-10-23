import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { sendMessageSchema } from '../schema';

import { SendMessageFields } from '../types';

import { useFileWatchMulti, useCustomSubmitHandlers } from '@components/hooks';
import { useEditor } from '../hooks';

import { MessageOptionsBar } from './message-options-bar';
import { UploadFileButton } from './upload-file-button';
import { MessageBodyInput } from './message-body-input';

import { useGetMessagesQuery, useSendMessageMutation } from '../api';

type SendMessageFormProps = {
  authorized?: boolean;
  placeholder?: string;
};

export function SendMessageForm({ authorized = true, placeholder }: SendMessageFormProps) {
  const { roomId, serverId } = useParams();
  
  const { data: messages } = useGetMessagesQuery({ roomId: roomId!, serverId });

  const defaultValues = {
    serverId,
    roomId,
    attachments: [],
    body: '',
    emojis: [],
  };

  const methods = useForm<SendMessageFields>({
    defaultValues,
    resolver: zodResolver(sendMessageSchema),
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

  const { editor, emojis, setEmojis } = useEditor();

  const [sendMessage] = useSendMessageMutation();

  const onSubmit = async (data: SendMessageFields) => {
    const { body, attachments } = data;

    await sendMessage({
      roomId: roomId!,
      serverId,
      body,
      emojis,
      attachments,
      ...((messages?.items && messages.items.length === 0) && { isFirst: true }),
    }).unwrap();

    reset();
    setAllFiles([]);
  };

  const { enterSubmit } = useCustomSubmitHandlers(handleSubmit(onSubmit));

  if (!messages) return false;

  return (
    <FormProvider {...methods}>
      <UploadFileButton authorized={authorized} fileWatch={fileWatch} />
      <form>
        <MessageBodyInput
          name="body"
          authorized={authorized}
          enterSubmit={enterSubmit}
          placeholder={placeholder}
          editor={editor}
          setEmojis={setEmojis}
        />
      </form>
      <MessageOptionsBar editor={editor} />
    </FormProvider>
  );
}