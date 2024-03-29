import type { CategoryData } from '../types';

import { useServerAuthorize } from '@features/servers/hooks';

import { ModalButton, ModalButtonProps } from '@components/ui/buttons';
import { DeleteCategoryModal } from './delete-category-modal';

type DeleteCategoryButtonProps = {
  category: CategoryData;
} & ModalButtonProps;

export function DeleteCategoryButton({
  category,
  children,
  btnRef,
  ...props
}: DeleteCategoryButtonProps) {
  const authorized = useServerAuthorize('manageChannels');

  if (!authorized) return null;

  return (
    <ModalButton
      btnRef={btnRef}
      modal={DeleteCategoryModal}
      modalProps={{ category }}
      {...props}
    >
      {children}
    </ModalButton>
  );
}