import { createContext } from 'react';

import type { CategoryData } from '../types';

import { ModalButton } from '@components/ui/buttons';

import { EditCategoryModal } from './edit-category-modal';

type EditCategoryButtonProps = {
  category: CategoryData;
  children?: React.ReactNode;
  btnRef?: React.RefObject<HTMLButtonElement>;
} & React.HTMLAttributes<HTMLButtonElement>;

export const CategoryContext = createContext<CategoryData | null>(null);

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