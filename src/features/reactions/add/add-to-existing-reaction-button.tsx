import type { ReactionData } from '../types';

import { Emoji } from '@components/ui/media';

type AddToExistingReactionButtonProps = {
  reaction: ReactionData;
};

export function AddToExistingReactionButton({
  reaction
}: AddToExistingReactionButtonProps) {
  const { count, name, __t } = reaction;

  const custom = __t === 'custom';

  return (
    <button>
      <Emoji
        custom={custom}
        name={name}
        emoji={custom ? reaction.url : reaction.native}
      />
      <p>{count}</p>
    </button>
  );
}