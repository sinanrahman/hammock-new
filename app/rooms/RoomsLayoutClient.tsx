'use client';

import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function RoomsLayoutClient({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      {children}
      <AnimatePresence>
        {modal}
      </AnimatePresence>
    </>
  );
}
