import { AppBar, Link, Toolbar, Typography } from '@mui/material';
import { CharacterDetailPage } from '@pages/character-detail';
import { CharactersPage } from '@pages/characters';
import { BrowserRouter, Navigate, Route, Link as RouterLink, Routes } from 'react-router-dom';
import { AppProvider } from './providers';

export const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Link component={RouterLink} to="/" color="inherit" underline="none" sx={{ mr: 2 }}>
              <Typography variant="h6">Star Wars</Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <main>
          <Routes>
            <Route path="/" element={<CharactersPage />} />
            <Route path="/character/:id" element={<CharacterDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AppProvider>
  );
};
