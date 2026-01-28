import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import type { SwapiPerson } from '../model/types';

export interface CharacterCardProps {
  person: SwapiPerson;
  onClick?: () => void;
}

export const CharacterCard = ({ person, onClick }: CharacterCardProps) => {
  return (
    <Card variant="outlined">
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {person.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Birth: {person.birth_year} · Gender: {person.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Height: {person.height} · Mass: {person.mass}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
