import { Card, CardContent, Skeleton } from '@mui/material';

export const CharacterCardSkeleton = () => (
  <Card variant="outlined" sx={{ height: '100%' }}>
    <CardContent>
      <Skeleton variant="text" width="70%" height={32} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" width="85%" height={20} />
    </CardContent>
  </Card>
);
