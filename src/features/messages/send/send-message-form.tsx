import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { sendMessageSchema } from '../schema';

import { useFileWatchMulti, useCustomSubmitHandlers } from '@hooks';

import { TextAreaInput, FilesInput } from '@components/ui/forms';
import { AttachmentsPreview } from './attachments-preview';
import { MessageOptionsBar } from './message-options-bar';

import { useSendMessageMutation } from '../api';

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

  const { setAllFiles, handleRemove, previews } = useFileWatchMulti({
    control,
    name: 'attachments',
    setValue,
  });

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
      <form>
        {authorized && <AttachmentsPreview previews={previews} handleRemove={handleRemove} />}
        {authorized && <label htmlFor="upload-attachments">
          <img src="#" alt="Upload attachments" />
          <FilesInput
            id="upload-attachments"
            name="attachments"
            label="Upload"
            rules={{ onChange: (e) => {
              setAllFiles(prev => [...prev, ...e.target.files]);
            }}}
            hidden
          />
        </label>}
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
        <MessageOptionsBar />
      </form>
    </FormProvider>
  );
}