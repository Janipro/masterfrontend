import { Box, Container, CssBaseline, Grid2, Typography } from '@mui/material';
import Table from './Table';
import InfoCard from './InfoCard';

const subjects = [1, 2, 3, 4, 5, 6, 7, 8];

const rows = [
  {
    id: 1,
    title: 'Chicken Nuggets',
    requirement: ['for-løkke', 'if-setning'],
    level: 'VG1',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '14.02.2025 13:00',
    status: 'Uncomplete',
    assigned: '8AB',
  },
  {
    id: 2,
    title: 'Peter Griffith',
    requirement: ['for-løkke'],
    level: '10',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '14.02.2025 13:00',
    status: 'Uncomplete',
    assigned: 'R1',
  },
  {
    id: 3,
    title: 'Peter Griffin',
    requirement: ['for-løkke', 'while-løkke'],
    level: '9',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '17.02.2025 13:00',
    status: 'Uncomplete',
    assigned: 'R2',
  },
  {
    id: 4,
    title: 'Peter Grizzler',
    requirement: ['if-setning'],
    level: '9',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '15.02.2025 15:00',
    status: 'Uncomplete',
    assigned: '8CD',
  },
  {
    id: 5,
    title: 'Peter Nuggets',
    requirement: ['if-setning', 'while-løkke'],
    level: '8',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
    status: 'Uncomplete',
    assigned: '10EF',
  },
  {
    id: 6,
    title: 'Peter Gooner',
    requirement: ['for-løkke', 'if-setning'],
    level: '8',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
    status: 'Uncomplete',
    assigned: '1T',
  },
];

export default function TeacherDashboard() {
  return (
    <Box component={'main'} sx={{ bgcolor: 'background.default' }}>
      <CssBaseline />
      <Container sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            textAlign: 'left',
          }}
        >
          <Typography variant="h5" noWrap component="div" sx={{ mt: 10, ml: -3 }}>
            Mine undervisningsgrupper
          </Typography>
          <Grid2 container direction={'row'} spacing={4} sx={{ m: 2, p: 1, maxWidth: 970 }}>
            {subjects.map(() => (
              <InfoCard />
            ))}
          </Grid2>
        </Box>
      </Container>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          textAlign: 'left',
        }}
      >
        <Typography variant="h5" noWrap component="div">
          Tildelte oppgaver
        </Typography>
        <Table rows={rows} selectable />
      </Box>
    </Box>
  );
}
