import { ButtonHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to: string;
  children: string;
}

export function LinkButton(
  { to, children }: LinkButtonProps
) {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate(to)}>
      {children}
    </button>
  );
}