import { useNavigate } from 'react-router-dom';

import { useCreateDmMutation } from '../api';

type MessageButtonProps = {
  userId: string;
  children?: React.ReactNode;
  btnRef?: React.RefObject<HTMLButtonElement>;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLButtonElement>;

export function DmMessageButton({
  children,
  userId,
  btnRef,
  onClick,
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
    
    if (onClick) onClick();
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      ref={btnRef}
    >
      {children}
    </button>
  );
}