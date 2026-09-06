'use client';

import React from 'react';
import { PreloaderProvider } from './PreloaderContext';

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <PreloaderProvider>
      {children}
    </PreloaderProvider>
  );
}
