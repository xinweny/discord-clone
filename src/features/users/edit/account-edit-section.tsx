import { useState } from 'react';

type AccountEditSection = {
  header: string;
  value: string;
  button: React.ReactNode;
  revealPattern?: RegExp;
};

export function AccountEditSection({
  header,
  value,
  button,
  revealPattern,
}: AccountEditSection) {
  const [isMasked, setIsMasked] = useState<boolean>(true);

  const match = revealPattern ? value.match(revealPattern) : null;
  const replaceStr = match ? match[0] : '';

  return (
    <div>
      <div>
        <h4>{header.toUpperCase()}</h4>
        <div>
          <span>{replaceStr
            ? (isMasked
                ? value.replace(replaceStr, '*'.repeat(replaceStr.length))
                : value
              )
            : value
          }</span>
          {revealPattern && (
            <button onClick={() => { setIsMasked((prev) => !prev ); }}>
              {isMasked ? 'Reveal' : 'Hide'}
            </button>
          )}
        </div>
      </div>
      {button}
    </div>
  );
}