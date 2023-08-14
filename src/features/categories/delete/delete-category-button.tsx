import { createContext } from 'react';

import type { CategoryData } from '../types';

import { useServerAuthorize } from '@hooks';

import { ModalButton } from '@components/ui/buttons';
import { DeleteCategoryModal } from './delete-category-modal';

type DeleteCategoryButtonProps = {
  category: CategoryData;
  children?: React.ReactNode;
  btnRef?: React.RefObject<HTMLButtonElement>;
} & React.HTMLAttributes<HTMLButtonElement>;

export const CategoryContext = createContext<CategoryData | null>(null);

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