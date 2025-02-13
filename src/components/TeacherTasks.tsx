import { Box, Button, Container, CssBaseline, Grid2, Typography } from '@mui/material';
import Table from './Table';
import SearchBar from './SearchBar';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShareIcon from '@mui/icons-material/Share';

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

const rows2 = [
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
  {
    id: 7,
    title: 'Peter Cooner',
    requirement: ['while-løkke', 'if-setning'],
    level: '9',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
    status: 'Uncomplete',
  },
  {
    id: 8,
    title: 'Sexy Sigma',
    requirement: ['if-setning'],
    level: '10',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
    status: 'Uncomplete',
  },
];

export default function TeacherTasks() {
  return (
    <Box>
      <CssBaseline />
      <Container component={'main'} sx={{ bgcolor: 'background.default' }}>
        <Grid2 direction="column" container spacing={2} mt={10}>
          <Grid2 direction="row" container sx={{ mb: 0.5 }}>
            <Typography variant="h5" noWrap component="div">
              Utdelte oppgaver
            </Typography>
            <Grid2 direction="row" sx={{ flexGrow: 0, ml: 'auto' }}>
              <Button
                variant="contained"
                startIcon={<VisibilityIcon />}
                sx={{ backgroundColor: '#EDEBEB', color: '#3F3F3F', textTransform: 'none', scale: 0.8 }}
                disabled
              >
                Aktiver
              </Button>
              <Button
                variant="contained"
                startIcon={<VisibilityOffIcon />}
                sx={{ backgroundColor: '#EDEBEB', color: '#3F3F3F', textTransform: 'none', scale: 0.8 }}
                disabled
              >
                Deaktiver
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                sx={{ backgroundColor: '#EDEBEB', color: '#3F3F3F', textTransform: 'none', scale: 0.8 }}
                disabled
              >
                Slett
              </Button>
            </Grid2>
          </Grid2>
          <Table rows={rows} selectable />

          <Grid2 spacing={2} container direction="column">
            <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
              Alle oppgaver
            </Typography>
            <Grid2 container direction="row">
              <SearchBar options={rows2} />
              <Grid2 sx={{ flexGrow: 0, ml: 'auto', mt: 'auto' }}>
                <Button
                  variant="contained"
                  startIcon={<ShareIcon />}
                  sx={{ backgroundColor: '#EDEBEB', color: '#3F3F3F', textTransform: 'none', scale: 0.8 }}
                  disabled
                >
                  Del
                </Button>
              </Grid2>
            </Grid2>
          </Grid2>
          <Table rows={rows2} selectable />
        </Grid2>
      </Container>
    </Box>
  );
}
