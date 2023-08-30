import { ReactionData } from '../types';

type AddToExistingReactionButtonProps = {
  reaction: ReactionData;
};

export function AddToExistingReactionButton({
  reaction
}: AddToExistingReactionButtonProps) {
  const { count, type } = reaction;

  return (
    <button>
      <img src={type === 'custom' ? reaction.url : reaction.native} />
      <p>{count}</p>
    </button>
  );
}