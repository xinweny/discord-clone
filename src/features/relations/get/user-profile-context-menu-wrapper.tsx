import { useRef } from 'react';

import { RelationStatus, type RelationData } from '../types';

import {
  type ContextMenuOptionsData,
  ContextMenuWrapper,
} from '@components/ui/context-menu';

import { DmMessageButton } from '@features/dms/create';

import { ToggleBlockButton } from '../create';
import { RemoveRelationButton } from '../delete';

type UserProfileContextMenuWrapperProps = {
  relation?: RelationData;
  senderId: string;
  recipientId: string;
  children: React.ReactNode;
};

export function UserProfileContextMenuWrapper({
  relation,
  senderId,
  recipientId,
  children,
}: UserProfileContextMenuWrapperProps) {
  const blockBtnRef = useRef<HTMLButtonElement>(null);
  const messageBtnRef = useRef<HTMLButtonElement>(null);
  const removeBtnRef = useRef<HTMLButtonElement>(null);

  const getOptions = (relation?: RelationData) => {
    const options: ContextMenuOptionsData[] = [{
      label: relation?.status === RelationStatus.BLOCKED ? 'Unblock' : 'Block',
      action: () => { blockBtnRef.current?.click(); },
      type: relation?.status === RelationStatus.BLOCKED ? undefined : 'danger',
    }];

    if (relation?.status === RelationStatus.FRIENDS) options.unshift({
      label: 'Remove Friend',
      action: () => { removeBtnRef.current?.click(); },
      type: 'danger',
    });

    if (relation?.status !== RelationStatus.BLOCKED) options.push({
      label: 'Message',
      action: () => { messageBtnRef.current?.click(); },
    });

    return options;
  };

  return (
    <>
      <ContextMenuWrapper options={getOptions(relation)} mode="onClick">
        {children}
      </ContextMenuWrapper>
      <div hidden>
        <ToggleBlockButton
          btnRef={blockBtnRef}
          senderId={senderId}
          recipientId={recipientId}
        />
        <DmMessageButton
          btnRef={messageBtnRef}
          userId={recipientId}
        />
        {relation?.status === RelationStatus.FRIENDS && (
          <RemoveRelationButton btnRef={removeBtnRef} relation={relation} />
        )}
      </div>
    </>
  );
}