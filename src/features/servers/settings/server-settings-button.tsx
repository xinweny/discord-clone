import { useParams } from 'react-router-dom';

import { useServerAuthorize } from '@hooks';

import { ServerContext } from '../context';

import { ModalButton, ModalButtonProps } from '@components/ui/buttons';

import { useGetServerQuery } from '../api';

import { ServerSettingsModal } from './server-settings-modal';

export function ServerSettingsButton({
  children,
  btnRef,
  ...props
}: ModalButtonProps) {
  const { serverId } = useParams();
  const server = useGetServerQuery(serverId!);

  const authorized = useServerAuthorize(['manageChannels', 'manageExpressions', 'manageRoles', 'manageServer']);

  if (!server.isSuccess || !authorized) return null;

  return (
    <ServerContext.Provider value={server.data}>
      <ModalButton
        modal={ServerSettingsModal}
        btnRef={btnRef}
        {...props}
      >
        {children}
      </ModalButton>
    </ServerContext.Provider>
  );
}