import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Fade,
  FormControlLabel,
  FormGroup,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CreateIcon from '@mui/icons-material/Create';
import Table from '../Table';
import InfoCard from '../InfoCard';
import { GridColDef } from '@mui/x-data-grid';
import { renderRequirement } from '../renderRequirement';

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

const columns: GridColDef[] = [
  { field: 'assigned', headerName: 'Tildelt', width: 100 },
  { field: 'title', headerName: 'Tittel', width: 220 },
  {
    field: 'requirement',
    display: 'flex',
    renderCell: renderRequirement,
    valueGetter: (value, row) =>
      row.title == null || row.requirement == null ? null : { title: row.title, requirement: row.requirement },
    filterable: false,
    headerName: 'Krav',
    width: 240,
  } as GridColDef<{ requirement: string[]; title: string }>,
  { field: 'level', headerName: 'Nivå', width: 60 },
  { field: 'course', headerName: 'Fag', width: 100 },
  { field: 'type', headerName: 'Type', width: 100 },
  { field: 'due', headerName: 'Frist', width: 140 },
];

export default function TeacherDashboard() {
  return (
    <Fade in timeout={500}>
      <Box component={'main'} sx={{ bgcolor: 'background.default' }}>
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
              <Grid2 container direction="row" mt={10}>
                <Typography variant="h5" noWrap component="div">
                  Mine undervisningsgrupper
                </Typography>
                <Stack direction="row" ml={'auto'} mt={'auto'}>
                  <Button
                    variant="contained"
                    startIcon={<CreateIcon />}
                    color="primary"
                    sx={{ textTransform: 'none', scale: 0.8 }}
                  >
                    Opprett undervisningsgruppe
                  </Button>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Vis inaktive" sx={{ scale: 0.8 }} />
                  </FormGroup>
                </Stack>
              </Grid2>
              <Grid2 container direction={'row'} spacing={4} sx={{ m: 2, p: 1, maxWidth: 970 }}>
                {subjects.map(() => (
                  <InfoCard />
                ))}
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2
            component="main"
            sx={{
              flexGrow: 1,
              textAlign: 'left',
            }}
          >
            <Grid2 container direction="row" sx={{ mb: 0.5 }}>
              <Typography variant="h5" noWrap component="div">
                Utdelte oppgaver
              </Typography>
              <Grid2 container direction={'row'} sx={{ flexGrow: 0, ml: 'auto' }}>
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
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Vis inaktive" sx={{ scale: 0.8 }} />
                </FormGroup>
              </Grid2>
            </Grid2>
            <Table rows={rows} columns={columns} selectable />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
