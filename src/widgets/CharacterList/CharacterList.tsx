import {
  CharacterCard,
  CharacterCardSkeleton,
  getCharacterIdFromUrl,
  useCharacters,
} from '@entities/character';
import { Alert, Box, Button, Grid, Pagination, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const SKELETON_COUNT = 6;
const skeletonItems = Array.from({ length: SKELETON_COUNT }, (_, i) => i);

const parsePage = (v: string | null): number => {
  const n = Number.parseInt(v || '1', 10);
  return Number.isNaN(n) || n < 1 ? 1 : n;
};

export const CharacterList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get('search') ?? '';
  const page = parsePage(searchParams.get('page'));

  const [searchInput, setSearchInput] = useState(urlSearch);

  useEffect(() => {
    setSearchInput(urlSearch);
  }, [urlSearch]);

  const { data, isLoading, error } = useCharacters({ page, search: urlSearch });

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = searchInput.trim();
      setSearchParams({ search: q, page: '1' });
    },
    [searchInput, setSearchParams]
  );

  const handlePageChange = useCallback(
    (_: unknown, p: number) => {
      setSearchParams({ search: urlSearch, page: String(p) });
    },
    [urlSearch, setSearchParams]
  );

  const totalPages = data ? Math.ceil(data.count / 10) : 1;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
      >
        <TextField
          label="Search characters"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          size="small"
          sx={{ minWidth: 260 }}
          placeholder="e.g. Luke, Vader"
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </Box>

      {error && (
        <Alert severity="error">
          {error instanceof Error ? error.message : 'Failed to load characters'}
        </Alert>
      )}

      {data && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {data.count} character{data.count !== 1 ? 's' : ''} found
          </Typography>
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          )}
        </Box>
      )}

      {isLoading && (
        <Grid container spacing={2}>
          {skeletonItems.map((i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <CharacterCardSkeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {data && !isLoading && (
        <Grid container spacing={2}>
          {data.results.map((person) => {
            const id = getCharacterIdFromUrl(person.url);
            return (
              <Grid item xs={12} sm={6} md={4} key={person.url}>
                <CharacterCard
                  person={person}
                  onClick={() =>
                    id && navigate(`/character/${id}`, { state: { fromSearch: location.search } })
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      )}

      {data?.results.length === 0 && !isLoading && (
        <Typography color="text.secondary">No characters found. Try a different search.</Typography>
      )}
    </Box>
  );
};
