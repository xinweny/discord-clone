import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { messageSchema } from './schema';

import { useFileWatchMulti } from '@hooks';

import { TextAreaInput, FilesInput } from '@components/ui';
import { AttachmentsPreview } from './attachments-preview';

import { useSendMessageMutation } from '../api';

type SendMessageFormProps = {
  disable?: boolean;
  placeholder?: string;
};

export type MessageFields = {
  attachments: File[];
  body: string;
};

export function SendMessageForm({ disable = false, placeholder }: SendMessageFormProps) {
  const { channelId, serverId } = useParams();

  const methods = useForm<MessageFields>({
    resolver: zodResolver(messageSchema),
    defaultValues: { attachments: [], body: '' },
  });
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
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
      roomId: channelId!,
      serverId,
      body,
      attachments,
    }).unwrap();

    reset();
    setAllFiles([]);
  };

  const enterSubmit: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <FormProvider {...methods}>
      <form>
        <AttachmentsPreview previews={previews} handleRemove={handleRemove} />
        <label htmlFor="upload-attachments">
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
        </label>
        <TextAreaInput
          label="Message body"
          name="body"
          id="body"
          onKeyDown={enterSubmit}
          placeholder={disable ?
            'You do not have permission to send messages in this channel.'
            : placeholder
          }
          disabled={disable}
        />
        <p>{errors.attachments?.message}</p>
        <p>{errors.body?.message}</p>
      </form>
    </FormProvider>
  );
}