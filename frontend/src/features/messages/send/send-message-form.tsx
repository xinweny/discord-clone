import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { sendMessageSchema } from '../schema';

import { SendMessageFields } from '../types';

import { useFileWatchMulti, useCustomSubmitHandlers } from '@components/hooks';
import { useEditor } from '../hooks';

import { AttachmentsPreview } from './attachments-preview';
import { MessageOptionsBar } from './message-options-bar';
import { UploadFileButton } from './upload-file-button';
import { MessageBodyInput } from './message-body-input';

import { useSendMessageMutation } from '../api';

import styles from './send-message-form.module.scss';

type SendMessageFormProps = {
  authorized?: boolean;
  placeholder?: string;
  errorPlaceholder?: string;
  anchorRef?: React.RefObject<HTMLDivElement>;
  next?: string | null | undefined;
};

export function SendMessageForm({
  authorized = true,
  placeholder,
  errorPlaceholder,
  anchorRef,
  next,
}: SendMessageFormProps) {
  const { roomId, serverId } = useParams();

  const defaultValues = {
    serverId,
    roomId,
    attachments: [],
    body: '',
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

  const { editor } = useEditor();

  const [sendMessage] = useSendMessageMutation();

  const onSubmit = async (data: SendMessageFields) => {
    const { body, attachments } = data;

    await sendMessage({
      roomId: roomId!,
      serverId,
      body,
      attachments,
      next,
    }).unwrap();

    reset();
    setAllFiles([]);
    anchorRef?.current?.scrollIntoView();
  };

  const { enterSubmit } = useCustomSubmitHandlers(handleSubmit(onSubmit));

  return (
    <div className={styles.container}>
      <FormProvider {...methods}>
        <AttachmentsPreview fileWatch={fileWatch} />
        <form className={`${styles.form} ${authorized ? '' : styles.unauthorized}`}>
          <UploadFileButton authorized={authorized} fileWatch={fileWatch} />
          <MessageBodyInput
            name="body"
            authorized={authorized}
            enterSubmit={enterSubmit}
            placeholder={placeholder}
            errorPlaceholder={errorPlaceholder}
            editor={editor}
          />
          <MessageOptionsBar editor={editor} />
        </form>
      </FormProvider>
    </div>
  );
}