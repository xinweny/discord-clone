import { ModalButton } from '@components/ui/buttons';

import { useGetUserData } from '@features/auth/hooks';

import { EditCustomStatusModal } from './edit-custom-status-modal';

import { useUpdateUserMutation } from '../api';

import CrossIcon from '@assets/icons/cross.svg?react';

type EditCustomStatusButtonProps = {
  customStatus?: string;
  children: React.ReactNode;
  className?: string;
};

export function EditCustomStatusButton({ customStatus, children, className }: EditCustomStatusButtonProps) {
  const { user } = useGetUserData();
  const userId = user.data!.id;

  const [updateCustomStatus] = useUpdateUserMutation();

  const resetCustomStatus = async () => {
    await updateCustomStatus({
      userId,
      customStatus: '',
    }).unwrap();
  };

  return (
    <div className={className}>
      <ModalButton
        modal={EditCustomStatusModal}
      >
        {children}
      </ModalButton>
      {customStatus && (
        <button onClick={resetCustomStatus}>
          <CrossIcon />
        </button>
      )}
    </div>
  );
}