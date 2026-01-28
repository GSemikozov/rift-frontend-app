import type { SwapiPerson } from '@entities/character';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { CharacterEditForm, prepareSubmitPayload } from './CharacterEditForm';

const theme = createTheme();

function renderWithTheme(ui: ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

const mockCharacter: SwapiPerson = {
  name: 'R2-D2',
  height: '96',
  mass: '32',
  hair_color: 'n/a',
  skin_color: 'white, blue',
  eye_color: 'red',
  birth_year: '33BBY',
  gender: 'n/a',
  homeworld: 'https://swapi.py4e.com/api/planets/8/',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '',
  edited: '',
  url: 'https://swapi.py4e.com/api/people/3/',
};

describe('CharacterEditForm', () => {
  it('renders "Edit character" title', () => {
    const onSave = vi.fn();
    renderWithTheme(<CharacterEditForm character={mockCharacter} onSave={onSave} />);
    expect(screen.getByText('Edit character')).toBeInTheDocument();
  });

  it('renders Name field with character name when not unspecified', () => {
    const onSave = vi.fn();
    renderWithTheme(<CharacterEditForm character={mockCharacter} onSave={onSave} />);
    const input = screen.getByLabelText('Name');
    expect(input).toHaveValue('R2-D2');
  });

  it('renders "Save locally" button', () => {
    const onSave = vi.fn();
    renderWithTheme(<CharacterEditForm character={mockCharacter} onSave={onSave} />);
    expect(screen.getByRole('button', { name: /save locally/i })).toBeInTheDocument();
  });

  it('prepareSubmitPayload trims name before save', () => {
    const payload = prepareSubmitPayload({
      name: '  Luke  ',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '1958-01-01',
      gender: 'male',
    });
    expect(payload.name).toBe('Luke');
  });

  it('converts birth_year "19BBY" to date input value 1958-01-01', () => {
    const character: SwapiPerson = { ...mockCharacter, birth_year: '19BBY' };
    const onSave = vi.fn();
    renderWithTheme(<CharacterEditForm character={character} onSave={onSave} />);
    const dateInput = screen.getByLabelText('Birth date');
    expect(dateInput).toHaveValue('1958-01-01');
  });

  it('shows empty Birth date and helper when birth_year is unknown', () => {
    const character: SwapiPerson = { ...mockCharacter, birth_year: 'unknown' };
    const onSave = vi.fn();
    renderWithTheme(<CharacterEditForm character={character} onSave={onSave} />);
    const dateInput = screen.getByLabelText('Birth date');
    expect(dateInput).toHaveValue('');
    const helpers = screen.getAllByText('This field is not specified');
    expect(helpers.length).toBeGreaterThanOrEqual(1);
  });
});
