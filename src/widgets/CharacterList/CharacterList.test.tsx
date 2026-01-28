import { type SwapiPeopleResponse, useCharacters } from '@entities/character';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { UseQueryResult } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { CharacterList } from './CharacterList';

function asQueryResult(
  p: Partial<UseQueryResult<SwapiPeopleResponse, Error>>
): UseQueryResult<SwapiPeopleResponse, Error> {
  return p as UseQueryResult<SwapiPeopleResponse, Error>;
}

const theme = createTheme();

function renderWithProviders(ui: ReactElement) {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeProvider>
  );
}

vi.mock('@entities/character', async () => {
  const actual = await vi.importActual<typeof import('@entities/character')>('@entities/character');
  return {
    ...actual,
    useCharacters: vi.fn(),
  };
});

const mockUseCharacters = vi.mocked(useCharacters);

describe('CharacterList', () => {
  it('renders search form', () => {
    mockUseCharacters.mockReturnValue(
      asQueryResult({ data: undefined, isLoading: false, error: null })
    );
    renderWithProviders(<CharacterList />);
    expect(screen.getByLabelText('Search characters')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('shows skeleton grid when loading', () => {
    mockUseCharacters.mockReturnValue(
      asQueryResult({ data: undefined, isLoading: true, error: null })
    );
    const { container } = renderWithProviders(<CharacterList />);
    const grid = container.querySelector('.MuiGrid-container');
    expect(grid).toBeInTheDocument();
    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThanOrEqual(1);
  });

  it('shows count and pagination when data loaded and totalPages > 1', () => {
    mockUseCharacters.mockReturnValue(
      asQueryResult({
        data: { count: 87, next: null, previous: null, results: [] },
        isLoading: false,
        error: null,
      })
    );
    renderWithProviders(<CharacterList />);
    expect(screen.getByText('87 characters found')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument();
  });

  it('calls useCharacters with search after form submit', () => {
    mockUseCharacters.mockReturnValue(
      asQueryResult({ data: undefined, isLoading: false, error: null })
    );
    renderWithProviders(<CharacterList />);
    const input = screen.getByLabelText('Search characters');
    fireEvent.change(input, { target: { value: 'luke' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(mockUseCharacters).toHaveBeenLastCalledWith(
      expect.objectContaining({ page: 1, search: 'luke' })
    );
  });

  it('shows error alert when useCharacters returns error', () => {
    mockUseCharacters.mockReturnValue(
      asQueryResult({
        data: undefined,
        isLoading: false,
        error: new Error('Network error'),
      })
    );
    renderWithProviders(<CharacterList />);
    expect(screen.getByRole('alert')).toHaveTextContent(/network error/i);
  });
});
