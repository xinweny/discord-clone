import { useNavigate } from 'react-router-dom';

import { useCreateDmMutation } from '../api';

type MessageButtonProps = {
  userId: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export function DmMessageButton({
  children,
  userId,
  ...props
}: MessageButtonProps) {
  const navigate = useNavigate();

  const [createDm] = useCreateDmMutation();

  const handleClick = async () => {
    const homeUrl = '/channels/@me';

    try {
      const dm = await createDm({
        participantIds: [userId],
      }).unwrap();
      
      navigate(`${homeUrl}/${dm._id}`);
    } catch {
      navigate(homeUrl);
    }
  };

  return (
    <button
    {...props}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}