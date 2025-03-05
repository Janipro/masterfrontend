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
import { NAV_COLORS, style } from '../../types/navColors';
import CreateIcon from '@mui/icons-material/Create';
import { columns, columns2, columns3, rows, rows2, rows3 } from '../../types/userData';

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
