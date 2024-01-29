import type { CategoryData } from '../types';

import { CategoryContext } from '../context';

import { ModalButton, ModalButtonProps } from '@components/ui/buttons';

import { EditCategoryModal } from './edit-category-modal';

type EditCategoryButtonProps = {
  category: CategoryData;
} & ModalButtonProps;

export function EditCategoryButton({
  category,
  children,
  btnRef,
  ...props
}: EditCategoryButtonProps) {
  return (
    <CategoryContext.Provider value={category}>
      <ModalButton
        modal={EditCategoryModal}
        btnRef={btnRef}
        {...props}
      >
        {children}
      </ModalButton>
    </CategoryContext.Provider>
  );
}