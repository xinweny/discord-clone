import React, { ButtonHTMLAttributes } from 'react';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = (
  { children, onClick, type = 'submit' }: IButton
) => {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
};