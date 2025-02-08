import { Box, CssBaseline, Typography } from '@mui/material';
import Table from './Table';
import InfoCard from './InfoCard';

const subjects = [1, 2, 3];

export default function MyPageContent() {
  return (
    <Box component={'main'} sx={{ bgcolor: 'background.default' }}>
      <CssBaseline />
      <Box>
        <Box>
          <Typography variant="h5" noWrap component="div" sx={{ mt: 10 }}>
            Mine fag
          </Typography>
          <Box sx={{ m: 8, display: 'flex', flexGrow: 1, p: 1, gap: 1 }}>
            {subjects.map(() => (
              <InfoCard />
            ))}
          </Box>
        </Box>
      </Box>
      <Box>
        <Table />
      </Box>
    </Box>
  );
}
