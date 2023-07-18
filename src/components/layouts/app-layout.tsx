import React from 'react';

type AppLayoutProps = {
  navBar: React.ReactNode;
  children: React.ReactNode;
};

export function AppLayout({
  navBar,
  children,
}: AppLayoutProps) {
  return (
    <>
      <div>
        {navBar}
      </div>
      <div>
        {children}
      </div>
    </>
  );
}