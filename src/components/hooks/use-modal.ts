import { useState, useEffect } from 'react';

export const useModal = (): [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';

    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return [isOpen, toggle, setIsOpen];
};