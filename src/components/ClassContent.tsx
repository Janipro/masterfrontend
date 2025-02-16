import { Box, Container, CssBaseline, Grid2, Stack, Typography } from '@mui/material';
import Table from './Table';
import { NAV_COLORS } from '../types/navColors';
import Announcements from './Announcements';

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
  },
];

export default function ClassContent() {
  return (
    <Box>
      <CssBaseline />
      <Container component={'main'} sx={{ bgcolor: 'background.default' }}>
        <Grid2 direction="column" container spacing={2} mt={10}>
          <Typography variant="h4" noWrap component="div" sx={{ textAlign: 'left' }}>
            R1 - klasse 1
          </Typography>
          <Stack direction="row" spacing={8} mb={4} color={NAV_COLORS.text}>
            <Typography>Fag: Matematikk</Typography>
            <Typography>Lærer: Ole Bull</Typography>
            <Typography>E-post: ole.bull@osloskolen.no</Typography>
          </Stack>

          <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
            Kunngjøringer
          </Typography>
          <Announcements />
          <Grid2 container spacing={2} direction="column">
            <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
              Anbefalte oppgaver
            </Typography>
          </Grid2>
          <Table rows={rows} selectable={false} />
        </Grid2>
      </Container>
    </Box>
  );
}
