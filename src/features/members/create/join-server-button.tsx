import { useNavigate } from 'react-router-dom';

import { handleServerError } from '@utils';

import { useGetUserData } from '@features/auth/hooks';

import { useGetUserServerMemberQuery } from '../api';
import { useJoinServerMutation } from '../api';

import styles from './join-server-button.module.scss';

type JoinServerButtonProps = {
  children: React.ReactNode;
  serverId: string;
  className?: string;
};

export function JoinServerButton({
  children,
  serverId,
  className,
}: JoinServerButtonProps) {
  const { user } = useGetUserData();

  const [joinServer] = useJoinServerMutation();

  const { data: member } = useGetUserServerMemberQuery({
    userId: user.data!.id,
    serverId,
  });

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (!member) await joinServer(serverId).unwrap();

      navigate(`/channels/${serverId}`);
    } catch (error) {
      handleServerError(error, {
        status: 500,
        message: 'E11000 duplicate key error collection',
      }, () => { navigate(`/channels/${serverId}`); });
    }
  };

  return (
    <button onClick={handleClick} className={`${styles.button} ${member && styles.joined} ${className || ''}`}>
      {member ? 'Joined' : children}
    </button>
  );
}