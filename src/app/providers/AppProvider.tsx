import type { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
};
