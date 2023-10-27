import { useNavigate } from 'react-router-dom';

type LinkButtonProps = {
  to: string;
  children: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function LinkButton(
  { to, children, ...props }: LinkButtonProps
) {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate(to)} {...props}>
      {children}
    </button>
  );
}