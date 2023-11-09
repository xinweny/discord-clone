import { RelationData } from '../types';

import { ModalButton } from '@components/ui/buttons';
import { RemoveRelationModal } from './remove-relation-modal';

type RemoveRelationButtonProps = {
  children: React.ReactNode;
  relation: RelationData;
};

export function RemoveRelationButton({
  relation, children
}: RemoveRelationButtonProps) {
  return (
    <ModalButton
      modal={RemoveRelationModal}
      modalProps={{ relation }}
    >
      {children}
    </ModalButton>
  );
}