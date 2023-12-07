import type { ReactionData } from '../types';

import { Emoji } from '@components/ui/media';

import { useGetUserData } from '@features/auth/hooks';

import {
  useIncrementReactionMutation,
  useDecrementReactionMutation,
} from '../api';

import styles from './toggle-reaction-button.module.scss';

type ToggleReactionButtonProps = {
  authorized: boolean;
  reaction: ReactionData;
  serverId?: string;
  roomId: string;
};

export function ToggleReactionButton({
  authorized,
  reaction,
  serverId,
  roomId,
}: ToggleReactionButtonProps) {
  const {
    __t,
    _id,
    count,
    name,
    messageId,
    userIds,
  } = reaction;

  const custom = __t === 'custom';

  const [increment] = useIncrementReactionMutation();
  const [decrement] = useDecrementReactionMutation();

  const { user } = useGetUserData();

  const query = {
    reactionId: _id,
    messageId,
    serverId,
    roomId,
  };

  const handleReact = async () => {
    await increment(query).unwrap();
  };

  const handleUnreact = async () => {
    await decrement(query).unwrap();
  };

  const userHasReacted = userIds.includes(user.data!._id);

  return (
    <button
      className={`${styles.reaction} ${userHasReacted ? styles.unreactButton : styles.reactButton}`}
      onClick={userHasReacted ? handleUnreact : handleReact}
      disabled={!authorized}
    >
      <Emoji
        custom={custom}
        name={name}
        emoji={custom ? reaction.url : reaction.native}
      />
      <p>{count}</p>
    </button>
  );
}