import { RelationData } from '../types';

import { ModalButton } from '@components/ui/buttons';
import { RemoveRelationModal } from './remove-relation-modal';

type RemoveRelationButtonProps = {
  children?: React.ReactNode;
  relation: RelationData;
  btnRef?: React.RefObject<HTMLButtonElement>;
};

export function RemoveRelationButton({
  relation,
  children,
  btnRef,
}: RemoveRelationButtonProps) {
  return (
    <ModalButton
      btnRef={btnRef}
      modal={RemoveRelationModal}
      modalProps={{ relation }}
    >
      {children}
    </ModalButton>
  );
}