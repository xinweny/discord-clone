import { useState } from 'react'

export const useDisplay = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const show = () => { setVisible(true); };

  const hide = () => { setVisible(false); };

  const hover = {
    onMouseEnter: show,
    onMouseLeave: hide,
  };

  return {
    visible,
    show,
    hide,
    hover,
  };
}