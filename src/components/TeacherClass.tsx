import {
  Backdrop,
  Box,
  Button,
  Container,
  CssBaseline,
  Fade,
  Grid2,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Table from './Table';
import { NAV_COLORS } from '../types/navColors';
import Announcements from './Announcements';
import { GridColDef } from '@mui/x-data-grid';
import { renderRequirement } from './renderRequirement';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { useState } from 'react';
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
  { field: 'course', headerName: 'Fag', width: 120 },
  { field: 'title', headerName: 'Tittel', width: 260 },
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
  { field: 'level', headerName: 'Nivå', width: 60 },
  { field: 'type', headerName: 'Type', width: 120 },
  { field: 'due', headerName: 'Frist', width: 160 },
];

export default function TeacherClass() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

          <Stack direction="row">
            <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
              Kunngjøringer
            </Typography>
            <Button
              variant="contained"
              startIcon={<AnnouncementIcon />}
              sx={{
                backgroundColor: NAV_COLORS.background,
                color: NAV_COLORS.text,
                textTransform: 'none',
                scale: 0.8,
                ml: 'auto',
              }}
              onClick={handleOpen}
            >
              Ny kunngjøring
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
                  <Grid2 container direction="column" spacing={3}>
                    <Stack direction="row">
                      <Typography id="keep-mounted-modal-title" variant="h5" fontWeight="medium">
                        Del kunngjøring
                      </Typography>
                    </Stack>
                    <TextField id="keep-mounted-modal-title" label="Tittel" variant="standard" />
                    <TextField
                      id="keep-mounted-modal-description"
                      label="Innhold"
                      multiline
                      rows={8}
                      sx={{ width: 400 }}
                    />
                    <Stack direction="row">
                      <Button
                        variant="contained"
                        startIcon={<ShareIcon />}
                        sx={{
                          backgroundColor: NAV_COLORS.background,
                          color: NAV_COLORS.text,
                          textTransform: 'none',
                          scale: 0.8,
                          ml: 'auto',
                        }}
                        onClick={handleOpen}
                      >
                        Del
                      </Button>
                    </Stack>
                  </Grid2>
                </Box>
              </Fade>
            </Modal>
          </Stack>
          <Announcements />
          <Grid2 container spacing={2} direction="column">
            <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
              Utdelte oppgaver
            </Typography>
          </Grid2>
          <Table rows={rows} columns={columns} selectable />
        </Grid2>
      </Container>
    </Box>
  );
}
