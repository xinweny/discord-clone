import React from 'react';

type MainLayoutProps = {
  sideBar: React.ReactNode;
  children: React.ReactNode;
  infoTab?: React.ReactNode;
  topNotice?: React.ReactNode;
};

export function MainLayout({
  sideBar,
  children,
  infoTab,
  topNotice,
}: MainLayoutProps) {
  return (
    <div>
      {topNotice && <div>{topNotice}</div>}
      <div>
        <div>
          {sideBar}
        </div>
        <div>
          {children}
        </div>
        {infoTab && <div>{infoTab}</div>}
      </div>
    </div>
  );
}