import React, { ButtonHTMLAttributes } from 'react';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, onClick }: IButton) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
};