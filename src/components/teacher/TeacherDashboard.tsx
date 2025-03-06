import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Fade,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid2,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CreateIcon from '@mui/icons-material/Create';
import Table from '../Table';
import InfoCard from '../InfoCard';
import { useState } from 'react';
import { style } from '../../types/navColors';
import { columns, columns3, rows, rows3 } from '../../types/userData';

const subjects = [1, 2, 3, 4, 5, 6, 7, 8];

export default function TeacherDashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
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
                <Stack direction="row" ml={'auto'} mt={'auto'} gap={1}>
                  <Button
                    variant="contained"
                    startIcon={<CreateIcon />}
                    color="primary"
                    sx={{ textTransform: 'none' }}
                    onClick={handleOpen}
                    size="small"
                  >
                    Opprett undervisningsgruppe
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
                        <Grid2 container direction="column" spacing={2}>
                          <Stack direction="row">
                            <Typography id="keep-mounted-modal-title" variant="h5" fontWeight="medium">
                              Ny undervisningsgruppe
                            </Typography>
                          </Stack>
                          <Stack direction="row" gap={1}>
                            <TextField
                              id="keep-mounted-modal-title"
                              label="Gruppenavn"
                              variant="outlined"
                              sx={{ width: 200 }}
                              size="small"
                            />
                            <FormControl sx={{ minWidth: 100 }} size="small">
                              <InputLabel id="demo-select-small-label">Fag</InputLabel>
                              <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                              >
                                <MenuItem value={10}>R1</MenuItem>
                                <MenuItem value={20}>IT1</MenuItem>
                                <MenuItem value={30}>1T</MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 100 }} size="small">
                              <InputLabel id="demo-select-small-label">Nivå</InputLabel>
                              <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                              >
                                <MenuItem value={10}>VG1</MenuItem>
                                <MenuItem value={20}>VG2</MenuItem>
                                <MenuItem value={30}>VG3</MenuItem>
                              </Select>
                            </FormControl>
                          </Stack>
                          <TextField
                            id="keep-mounted-modal-description"
                            label="Kort beskrivelse av gruppen"
                            multiline
                            rows={3}
                            sx={{ width: 440 }}
                          />
                          <Stack direction="row"></Stack>
                          <Table rows={rows3} columns={columns3} selectable />
                          <Button
                            variant="contained"
                            startIcon={<CreateIcon />}
                            sx={{
                              textTransform: 'none',
                              ml: 'auto',
                            }}
                            onClick={handleOpen}
                            size="small"
                          >
                            Opprett undervisningsgruppe
                          </Button>
                        </Grid2>
                      </Box>
                    </Fade>
                  </Modal>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox size="small" />} label="Vis inaktive" />
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
              <Grid2 container direction={'row'} sx={{ flexGrow: 0, ml: 'auto' }} spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<VisibilityIcon />}
                  sx={{ backgroundColor: '#EDEBEB', color: '#3F3F3F', textTransform: 'none' }}
                  disabled
                  size="small"
                >
                  Aktiver
                </Button>
                <Button
                  variant="contained"
                  startIcon={<VisibilityOffIcon />}
                  sx={{ backgroundColor: '#EDEBEB', color: '#3F3F3F', textTransform: 'none' }}
                  disabled
                  size="small"
                >
                  Deaktiver
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  sx={{ backgroundColor: '#EDEBEB', color: '#3F3F3F', textTransform: 'none' }}
                  disabled
                  size="small"
                >
                  Slett
                </Button>
                <FormGroup>
                  <FormControlLabel control={<Checkbox size="small" />} label="Vis inaktive" />
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
