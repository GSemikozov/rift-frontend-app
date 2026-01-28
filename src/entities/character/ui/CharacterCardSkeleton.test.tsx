import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';
import { CharacterCardSkeleton } from './CharacterCardSkeleton';

const theme = createTheme();

function renderWithTheme(ui: ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe('CharacterCardSkeleton', () => {
  it('renders without throwing', () => {
    const { container } = renderWithTheme(<CharacterCardSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders three skeleton placeholders', () => {
    const { container } = renderWithTheme(<CharacterCardSkeleton />);
    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons).toHaveLength(3);
  });
});
