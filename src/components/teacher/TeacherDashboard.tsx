import {
  Backdrop,
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
                    onClick={handleOpen}
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
                          <TextField
                            id="keep-mounted-modal-title"
                            label="Gruppenavn"
                            variant="outlined"
                            sx={{ width: 200 }}
                          />
                          <TextField
                            id="keep-mounted-modal-description"
                            label="Kort beskrivelse av gruppen"
                            multiline
                            rows={3}
                            sx={{ width: 400 }}
                          />
                          <Stack direction="row"></Stack>
                          <Table rows={rows3} columns={columns3} selectable />
                          <Button
                            variant="contained"
                            startIcon={<CreateIcon />}
                            sx={{
                              textTransform: 'none',
                              scale: 1,
                              ml: 'auto',
                            }}
                            onClick={handleOpen}
                          >
                            Opprett
                          </Button>
                        </Grid2>
                      </Box>
                    </Fade>
                  </Modal>
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
