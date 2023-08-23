import { useState } from 'react';
import { ClickAwayListener } from '@mui/material';

type ClickPopupProps = {
  renderPopup: () => React.ReactElement;
  children: React.ReactNode;
};

export function ClickPopup({
  renderPopup,
  children,
}: ClickPopupProps) {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => {
          setShowPopup(prev => !prev);
        }}
      >
        {children}
      </button>
      {showPopup && (
        <ClickAwayListener
          onClickAway={() => { setShowPopup(false); }}
        >
          <div>
            {renderPopup()}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}