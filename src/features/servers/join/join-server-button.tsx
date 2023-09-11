import { useNavigate } from 'react-router-dom';

import { handleServerError } from '@utils';

import { useJoinServerMutation } from '@features/members/api';

type JoinServerButtonProps = {
  children: React.ReactNode;
  serverId: string;
};

export function JoinServerButton({
  children,
  serverId,
}: JoinServerButtonProps) {
  const [joinServer] = useJoinServerMutation();

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await joinServer(serverId).unwrap();

      navigate(`/channels/${serverId}`);
    } catch (error) {
      handleServerError(error, {
        status: 500,
        message: 'E11000 duplicate key error collection',
      }, () => { navigate(`/channels/${serverId}`); });
    }
  };

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
}