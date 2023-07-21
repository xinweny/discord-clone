import React from 'react';

type MainLayoutProps = {
  sideBar: React.ReactNode;
  children: React.ReactNode;
  infoTab?: React.ReactNode;
};

export function MainLayout({
  sideBar,
  children,
  infoTab,
}: MainLayoutProps) {
  return (
    <>
      <div>
        {sideBar}
      </div>
      <div>
        {children}
      </div>
      {infoTab && <div>{infoTab}</div>}
    </>
  );
}