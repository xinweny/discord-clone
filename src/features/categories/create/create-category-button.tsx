import { ModalButton } from '@components/ui/buttons';

import { CreateCategoryModal } from './create-category-modal';

type CreateCategoryButtonProps = {
  children?: React.ReactNode;
  btnRef?: React.RefObject<HTMLButtonElement>;
} & React.HTMLAttributes<HTMLButtonElement>;

export function CreateCategoryButton({ btnRef, children, ...props }: CreateCategoryButtonProps) {
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