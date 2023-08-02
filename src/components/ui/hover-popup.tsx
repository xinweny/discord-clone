import { useState } from 'react';

type HoverPopupProps = {
  popup: React.ReactNode;
  children: React.ReactNode;
};

export function HoverPopup({ popup, children }: HoverPopupProps) {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <div>
      <div
        onMouseEnter={() => { setShowPopup(true); }}
        onMouseLeave={() => { setShowPopup(false); }}
      >
        {children}
      </div>
      {showPopup && (
        <div>
          {popup}
        </div>
      )}
    </div>
  );
}