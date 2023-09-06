import { RelationData, RelationStatus } from '../types';

import { HoverPopup } from '@components/ui/popups';
import { ModalButton } from '@components/ui/buttons';
import { RemoveRelationModal } from './remove-relation-modal';

type RemoveRelationButtonProps = {
  src?: string;
  relation: RelationData;
};

export function RemoveRelationButton({
  src, relation
}: RemoveRelationButtonProps) {
  const { status } = relation;

  const label = (param: string) => {
    switch (param) {
      case RelationStatus.FRIENDS: return 'Remove Friend';
      case RelationStatus.PENDING_FROM: return 'Reject';
      case RelationStatus.PENDING_TO: return 'Cancel';
      case RelationStatus.BLOCKED: return 'Unblock';
      default: return '';
    }
  };

  return (
    <HoverPopup popup={<div>{label(status)}</div>}>
      <ModalButton
        modal={RemoveRelationModal}
        modalProps={{ relation }}
      >
        <img src={src || ''} alt={label(status)} />
      </ModalButton>
    </HoverPopup>
  );
}