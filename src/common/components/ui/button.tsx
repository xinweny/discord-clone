import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export function Button(
  { children, onClick, type = 'button' }: ButtonProps
) {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
}