import { useState } from 'react';

export const useModal = (): [boolean, React.MouseEventHandler<HTMLElement>] => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => { setIsOpen(!isOpen) };

  return [isOpen, toggle];
};