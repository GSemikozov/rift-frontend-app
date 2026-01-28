import { CharacterEditForm, useCharacterWithEdits } from '@features/character-edit';
import ArrowBack from '@mui/icons-material/ArrowBack';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const CharacterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const fromSearch = (location.state as { fromSearch?: string } | null)?.fromSearch ?? '';
  const backToList = () => navigate({ pathname: '/', search: fromSearch });
  const { character, isLoading, error, saveEdits } = useCharacterWithEdits(id);

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">
          {error instanceof Error ? error.message : 'Failed to load character'}
        </Alert>
        <Button startIcon={<ArrowBack />} onClick={backToList} sx={{ mt: 2 }}>
          Back to list
        </Button>
      </Container>
    );
  }

  if (!character) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography>Character not found.</Typography>
        <Button startIcon={<ArrowBack />} onClick={backToList} sx={{ mt: 2 }}>
          Back to list
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={backToList} sx={{ mb: 2 }}>
        Back to list
      </Button>
      <Typography variant="h4" component="h1" gutterBottom>
        {character.name}
      </Typography>
      <Stack spacing={3} sx={{ mt: 2 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Details
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 0.5, columnGap: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Height:
            </Typography>
            <Typography variant="body2">{character.height}</Typography>
            <Typography variant="body2" color="text.secondary">
              Mass:
            </Typography>
            <Typography variant="body2">{character.mass}</Typography>
            <Typography variant="body2" color="text.secondary">
              Hair:
            </Typography>
            <Typography variant="body2">{character.hair_color}</Typography>
            <Typography variant="body2" color="text.secondary">
              Skin:
            </Typography>
            <Typography variant="body2">{character.skin_color}</Typography>
            <Typography variant="body2" color="text.secondary">
              Eyes:
            </Typography>
            <Typography variant="body2">{character.eye_color}</Typography>
            <Typography variant="body2" color="text.secondary">
              Birth year:
            </Typography>
            <Typography variant="body2">{character.birth_year}</Typography>
            <Typography variant="body2" color="text.secondary">
              Gender:
            </Typography>
            <Typography variant="body2">{character.gender}</Typography>
          </Box>
        </Paper>
        <CharacterEditForm character={character} onSave={saveEdits} />
      </Stack>
    </Container>
  );
};
