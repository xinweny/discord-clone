import { ModalButton, ModalButtonProps } from '@components/ui/buttons';

import { CreateCategoryModal } from './create-category-modal';

export function CreateCategoryButton({ btnRef, children, ...props }: ModalButtonProps) {
  return (
    <ModalButton
      btnRef={btnRef}
      modal={CreateCategoryModal}
      {...props}
    >
      {children}
    </ModalButton>
  );
}