import { useParams } from 'react-router-dom';

import type { ModalProps } from '@types';
import type { CategoryData } from '../types';

import { ConfirmationModal } from '@components/ui/modals';

import { useDeleteCategoryMutation } from '../api';

type DeleteCategoryModalProps = {
  category?: CategoryData;
} & ModalProps;

export function DeleteCategoryModal({
  category,
  isOpen,
  onClose,
}: DeleteCategoryModalProps) {
  const [deleteCategory] = useDeleteCategoryMutation();

  const { serverId } = useParams();

  if (!category) return null;

  const onConfirm = async () => {
    await deleteCategory({
      serverId: serverId!,
      categoryId: category._id,
    });
  };

  return (
    <ConfirmationModal
      title="Delete Category"
      message={`Are you sure you want to delete ${category.name}? This cannot be undone.`}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}