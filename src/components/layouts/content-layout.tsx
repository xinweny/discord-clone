import React from 'react';

type ContentLayoutProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  infoTab?: React.ReactNode;
};

export function ContentLayout({
  header,
  children,
  infoTab,
}: ContentLayoutProps) {
  return (
    <>
      {header && (
        <div>
          {header}
        </div>
      )}
      <div>
        {children}
      </div>
      {infoTab && (
        <div>
          {infoTab}
        </div>
      )}
    </>
  );
}