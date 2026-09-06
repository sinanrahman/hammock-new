import { ReactNode } from 'react';
import RoomsLayoutClient from './RoomsLayoutClient';

export default function RoomsLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <RoomsLayoutClient modal={modal}>
      {children}
    </RoomsLayoutClient>
  );
}
