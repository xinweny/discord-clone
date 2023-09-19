import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { zodResolver } from '@hookform/resolvers/zod';

import { sendMessageSchema } from '../schema';

import { MessageEmojiData, SendMessageFields } from '../types';

import { useFileWatchMulti, useCustomSubmitHandlers } from '@hooks';

import { MessageOptionsBar } from './message-options-bar';

import { useSendMessageMutation } from '../api';
import { withEmojis } from '../slate';

import { UploadFileButton } from './upload-file-button';
import { MessageBodyInput } from './message-body-input';

type SendMessageFormProps = {
  authorized?: boolean;
  placeholder?: string;
};

export function SendMessageForm({ authorized = true, placeholder }: SendMessageFormProps) {
  const { roomId, serverId } = useParams();

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

  const [editor] = useState(
    () => withReact(withEmojis(withHistory(createEditor())))
  );
  const [emojis, setEmojis] = useState<MessageEmojiData[]>([]);

  const [sendMessage] = useSendMessageMutation();

  const onSubmit = async (data: SendMessageFields) => {
    const { body, attachments } = data;

    await sendMessage({
      roomId: roomId!,
      serverId,
      body,
      emojis,
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