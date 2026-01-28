import { Box, Container, Typography } from '@mui/material';
import { CharacterList } from '@widgets/CharacterList';

export const CharactersPage = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Star Wars Characters
    </Typography>
    <Box sx={{ mt: 3 }}>
      <CharacterList />
    </Box>
  </Container>
);
