import { ReactionCountData } from '../types';

type AddToExistingReactionButtonProps = {
  reactionCount: ReactionCountData;
};

export function AddToExistingReactionButton({
  reactionCount
}: AddToExistingReactionButtonProps) {
  const { count, customEmoji, data } = reactionCount;

  return (
    <button>
      <img src={data.custom ? customEmoji?.url : data.emoji} />
      <p>{count}</p>
    </button>
  );
}