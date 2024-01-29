import { useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { editServerSchema } from '../schema';

import type { EditServerFields } from '../types';

import { ServerContext } from '../context';

import {
  FormGroup,
  TextInput,
  TextAreaInput,
  FormChangesAlert,
} from '@components/ui/forms';
import { Separator } from '@components/ui/displays';

import { ServerAvatarInput } from './server-avatar-input';
import { ServerBannerInput } from './server-banner-input';

import { useEditServerMutation } from '../api';

import styles from './server-overview-form.module.scss';

export function ServerOverviewForm() {
  const server = useContext(ServerContext);

  const defaultValues = {
    serverId: server?._id,
    name: server?.name,
    description: server?.description || '',
    avatar: undefined,
    banner: undefined,
  };

  const methods = useForm<EditServerFields>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(editServerSchema),
  });
  const { handleSubmit, reset } = methods;

  const [editServer] = useEditServerMutation();

  const onSubmit = async (data: EditServerFields) => {
    const updatedServer = await editServer(data).unwrap();

    const { name, description } = updatedServer;
    
    reset({
      name,
      description,
      serverId: server?._id,
      avatar: undefined,
      banner: undefined,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.section}>
          <ServerAvatarInput src={server?.avatarUrl} />
          <FormGroup label="Server Name" htmlFor="server-name">
            <TextInput
              id="server-name"
              label="Server Name"
              name="name"
              maxLength={100}
            />
          </FormGroup>
        </div>
        <Separator className={styles.separator} />
        <FormGroup label="Server Description" htmlFor="server-description" withSeparator>
          <TextAreaInput
            id="server-description"
            label="Server Description"
            name="description"
            maxLength={120}
            options={{ showCharCount: true }}
          />
        </FormGroup>
        <ServerBannerInput src={server?.bannerUrl}/>
        <FormChangesAlert defaultValues={defaultValues} />
      </form>
    </FormProvider>
  );
}