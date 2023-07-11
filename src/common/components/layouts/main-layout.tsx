import React from 'react';

interface MainLayoutProps {
  sideBar: React.ReactNode;
  mainContent: React.ReactNode;
  infoTab?: React.ReactNode;
}

export function MainLayout({
  sideBar,
  mainContent,
  infoTab,
}: MainLayoutProps) {
  return (
    <>
      <div>
        {sideBar}
      </div>
      <div>
        {mainContent}
      </div>
      {infoTab && (
        <div>
          {infoTab}
        </div>
      )}
    </>
  );
}