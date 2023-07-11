import React from 'react';

interface AppLayoutProps {
  navBar: React.ReactNode;
  mainContent: React.ReactNode;
}

export function AppLayout({
  navBar,
  mainContent,
}: AppLayoutProps) {
  return (
    <>
      <div>
        {navBar}
      </div>
      <div>
        {mainContent}
      </div>
    </>
  );
}