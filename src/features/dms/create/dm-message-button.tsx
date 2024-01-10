import { useNavigate } from 'react-router-dom';

import { useCreateDmMutation } from '../api';

type MessageButtonProps = {
  userId: string;
  children?: React.ReactNode;
  btnRef?: React.RefObject<HTMLButtonElement>;
} & React.HTMLAttributes<HTMLButtonElement>;

export function DmMessageButton({
  children,
  userId,
  btnRef,
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
      ref={btnRef}
    >
      {children}
    </button>
  );
}