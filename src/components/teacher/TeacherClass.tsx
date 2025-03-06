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
import Table from '../Table';
import { NAV_COLORS, style } from '../../types/navColors';
import Announcements from '../Announcements';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { useState } from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CreateIcon from '@mui/icons-material/Create';
import { columns, rows } from '../../types/userData';

export default function TeacherClass() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Fade in timeout={500}>
      <Box>
        <CssBaseline />
        <Container component={'main'} sx={{ bgcolor: 'background.default' }}>
          <Grid2 direction="column" container spacing={2} mt={10}>
            <Stack direction="row">
              <Typography variant="h4" noWrap component="div" sx={{ textAlign: 'left' }}>
                R1 - klasse 1
              </Typography>
              <Button
                variant="contained"
                startIcon={<CreateIcon />}
                color="primary"
                sx={{
                  textTransform: 'none',
                  ml: 'auto',
                  mt: 'auto',
                }}
                size="small"
              >
                Rediger
              </Button>
            </Stack>
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
                  textTransform: 'none',
                  ml: 'auto',
                }}
                onClick={handleOpen}
                size="small"
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
                          Ny kunngjøring
                        </Typography>
                      </Stack>
                      <TextField
                        id="keep-mounted-modal-title"
                        label="Tittel"
                        variant="outlined"
                        size="small"
                        sx={{ width: '14vw' }}
                      />
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
                          startIcon={<PostAddIcon />}
                          sx={{
                            textTransform: 'none',
                            ml: 'auto',
                          }}
                          onClick={handleOpen}
                          size="small"
                        >
                          Publiser
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
    </Fade>
  );
}
