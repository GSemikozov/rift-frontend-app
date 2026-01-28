import { ThemeProvider, createTheme } from '@mui/material/styles';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { SwapiPerson } from '../model/types';
import { CharacterCard } from './CharacterCard';

const theme = createTheme();

function renderWithTheme(ui: ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

const mockPerson: SwapiPerson = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.py4e.com/api/planets/1/',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '',
  edited: '',
  url: 'https://swapi.py4e.com/api/people/1/',
};

describe('CharacterCard', () => {
  it('renders character name and details', () => {
    renderWithTheme(<CharacterCard person={mockPerson} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText(/Birth: 19BBY/)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172/)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    renderWithTheme(<CharacterCard person={mockPerson} onClick={onClick} />);
    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
