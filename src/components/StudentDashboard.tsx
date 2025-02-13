import { Box, Container, CssBaseline, Grid2, List, ListItem, Typography } from '@mui/material';
import Table from './Table';
import InfoCard from './InfoCard';
import Calendar from './Calendar';
import Requirement from './Requirement';

const subjects = [1, 2, 3, 4, 5, 6];

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

export default function StudentDashboard() {
  return (
    <Box>
      <CssBaseline />
      <Container component={'main'} sx={{ bgcolor: 'background.default' }}>
        <Grid2 sx={{ display: 'flex' }}>
          <Grid2
            component="main"
            sx={{
              flexGrow: 1,
              textAlign: 'left',
            }}
          >
            <Typography variant="h5" noWrap component="div" sx={{ mt: 10, ml: -3 }}>
              Mine fag
            </Typography>
            <Grid2 container direction={'row'} spacing={2} sx={{ m: 2, p: 1, maxWidth: 600 }}>
              {subjects.map(() => (
                <InfoCard />
              ))}
            </Grid2>
          </Grid2>
          <Grid2
            component="main"
            sx={{
              flexGrow: 1,
              mt: 10,
            }}
          >
            <Typography variant="h5" noWrap component="div">
              Progresjon
            </Typography>
            <Grid2 container sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <List dense sx={{ listStyle: 'decimal', pl: 4 }}>
                <ListItem sx={{ display: 'list-item' }}>
                  <Requirement value="for-løkke" size="small" />
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                  <Requirement value="if-setning" size="small" />
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                  <Requirement value="while-løkke" size="small" />
                </ListItem>
              </List>
            </Grid2>
            <Calendar />
          </Grid2>
        </Grid2>
        <Grid2
          component="main"
          sx={{
            flexGrow: 1,
            textAlign: 'left',
            mt: -4,
          }}
        >
          <Typography variant="h5" noWrap component="div" sx={{ mb: 0.5 }}>
            Anbefalte oppgaver
          </Typography>
          <Table rows={rows} selectable={false} />
        </Grid2>
      </Container>
    </Box>
  );
}
