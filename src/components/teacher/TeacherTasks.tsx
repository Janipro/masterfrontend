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
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import Table from '../Table';
import SearchBar from '../SearchBar';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { GridColDef } from '@mui/x-data-grid';
import { renderRequirement } from '../renderRequirement';
import { NAV_COLORS } from '../../types/navColors';
import CreateIcon from '@mui/icons-material/Create';

const rows = [
  {
    id: 1,
    title: 'Chicken Nuggets',
    requirement: ['for-løkke', 'if-setning'],
    level: 'VG1',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '14.02.2025 13:00',
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
  },
  {
    id: 2,
    title: 'Peter Griffith',
    requirement: ['for-løkke'],
    level: '10',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '14.02.2025 13:00',
  },
  {
    id: 3,
    title: 'Peter Griffin',
    requirement: ['for-løkke', 'while-løkke'],
    level: '9',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '17.02.2025 13:00',
  },
  {
    id: 4,
    title: 'Peter Grizzler',
    requirement: ['if-setning'],
    level: '9',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '15.02.2025 15:00',
  },
  {
    id: 5,
    title: 'Peter Nuggets',
    requirement: ['if-setning', 'while-løkke'],
    level: '8',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
  },
  {
    id: 6,
    title: 'Peter Gooner',
    requirement: ['for-løkke', 'if-setning'],
    level: '8',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
  },
  {
    id: 7,
    title: 'Peter Cooner',
    requirement: ['while-løkke', 'if-setning'],
    level: '9',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
  },
  {
    id: 8,
    title: 'Sexy Sigma',
    requirement: ['if-setning'],
    level: '10',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
  },
];

const rows3 = [
  {
    id: 1,
    title: 'Petter Banh Cuon',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
  {
    id: 2,
    title: 'Petter Kjaken',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
  {
    id: 3,
    title: 'Petter Ballestad',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
  {
    id: 4,
    title: 'Petter Rizzler',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
  {
    id: 5,
    title: 'Petter Dass',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
  {
    id: 6,
    title: 'Petter Slalom',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
  {
    id: 7,
    title: 'Petter Mammasønn',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
  {
    id: 8,
    title: 'Petter Rambølseter',
    level: 'VG1',
    class: '1STB',
    school: 'St. Hallvard VGS',
  },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const columns: GridColDef[] = [
  { field: 'assigned', headerName: 'Tildelt', width: 100 },
  { field: 'course', headerName: 'Fag', width: 100 },
  { field: 'title', headerName: 'Tittel', width: 280 },
  {
    field: 'requirement',
    display: 'flex',
    renderCell: renderRequirement,
    valueGetter: (value, row) =>
      row.title == null || row.requirement == null ? null : { title: row.title, requirement: row.requirement },
    filterable: false,
    headerName: 'Krav',
    width: 280,
  } as GridColDef<{ requirement: string[]; title: string }>,
  { field: 'level', headerName: 'Nivå', width: 60 },
  { field: 'type', headerName: 'Type', width: 100 },
  { field: 'due', headerName: 'Frist', width: 160 },
];

const columns2: GridColDef[] = [
  { field: 'course', headerName: 'Fag', width: 100 },
  { field: 'title', headerName: 'Tittel', width: 300 },
  {
    field: 'requirement',
    display: 'flex',
    renderCell: renderRequirement,
    valueGetter: (value, row) =>
      row.title == null || row.requirement == null ? null : { title: row.title, requirement: row.requirement },
    filterable: false,
    headerName: 'Krav',
    width: 300,
  } as GridColDef<{ requirement: string[]; title: string }>,
  { field: 'level', headerName: 'Nivå', width: 80 },
  { field: 'owner', headerName: 'Laget av', width: 300 },
];

const columns3: GridColDef[] = [
  { field: 'title', headerName: 'Elev', width: 240 },
  { field: 'level', headerName: 'Trinn', width: 60 },
  { field: 'class', headerName: 'Klasse', width: 60 },
  { field: 'school', headerName: 'Skole', width: 200 },
];

export default function TeacherTasks() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fade in timeout={500}>
      <Box>
        <CssBaseline />
        <Container component={'main'} sx={{ bgcolor: 'background.default' }}>
          <Grid2 direction="column" container spacing={2} mt={10}>
            <Grid2 direction="row" container>
              <Typography typography="h5">Utdelte oppgaver</Typography>
              <Grid2 container direction={'row'} spacing={0} sx={{ flexGrow: 0, ml: 'auto' }}>
                <Button
                  variant="contained"
                  startIcon={<VisibilityIcon />}
                  sx={{
                    backgroundColor: NAV_COLORS.background,
                    color: NAV_COLORS.text,
                    textTransform: 'none',
                    scale: 0.8,
                  }}
                  disabled
                >
                  Aktiver
                </Button>
                <Button
                  variant="contained"
                  startIcon={<VisibilityOffIcon />}
                  sx={{
                    backgroundColor: NAV_COLORS.background,
                    color: NAV_COLORS.text,
                    textTransform: 'none',
                    scale: 0.8,
                  }}
                  disabled
                >
                  Deaktiver
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  sx={{
                    backgroundColor: NAV_COLORS.background,
                    color: NAV_COLORS.text,
                    textTransform: 'none',
                    scale: 0.8,
                  }}
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

            <Grid2 spacing={2} container direction="column">
              <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
                Alle oppgaver
              </Typography>
              <Grid2 container direction="row">
                <SearchBar options={rows2} prompt="Søk etter oppgaver" />
                <Grid2 sx={{ flexGrow: 0, ml: 'auto', mt: 'auto' }}>
                  <Button
                    variant="contained"
                    startIcon={<CreateIcon />}
                    color="primary"
                    sx={{
                      textTransform: 'none',
                      scale: 0.8,
                    }}
                    onClick={handleOpen}
                  >
                    Opprett oppgave
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<ShareIcon />}
                    sx={{
                      backgroundColor: NAV_COLORS.background,
                      color: NAV_COLORS.text,
                      textTransform: 'none',
                      scale: 0.8,
                    }}
                    onClick={handleOpen}
                  >
                    Del oppgave
                  </Button>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <Grid2 container direction="column" spacing={1}>
                          <Stack direction="row">
                            <Typography id="keep-mounted-modal-title" variant="h5" fontWeight="medium">
                              Del oppgaver
                            </Typography>
                          </Stack>
                          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                            Deler valgte oppgaver med:
                          </Typography>
                          <SearchBar options={rows3} prompt="Søk etter elever" />
                          <Table rows={rows3} columns={columns3} selectable />
                        </Grid2>
                      </Box>
                    </Fade>
                  </Modal>
                </Grid2>
              </Grid2>
            </Grid2>
            <Table rows={rows2} columns={columns2} selectable />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
