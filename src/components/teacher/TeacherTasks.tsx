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
import { columns, columns2, columns3, rows2, rows3 } from '../../types/userData';
import { task, taskRequirement } from '../../types/tableProps';
import { useQuery } from '@apollo/client';
import { GET_ALL_TASKS } from '../../../graphql/queries/getAllTasks';
import { GET_GIVEN_TASKS } from '../../../graphql/queries/getGivenTasks';

export default function TeacherTasks() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading: tasksLoading, error: tasksError, data: allTasks } = useQuery(GET_ALL_TASKS);
  const {
    loading: givenLoading,
    error: givenError,
    data: givenTasks,
  } = useQuery(GET_GIVEN_TASKS, { variables: { userId: 2 } });

  if (tasksLoading || givenLoading) {
    return (
      <Box mt="30vh">
        <p> Laster inn... </p>
      </Box>
    );
  }

  if (tasksError || givenError) {
    console.log('could not load from db');
  }

  const getAllTasks = (): task[] => {
    return allTasks.allTasks.nodes.map((task: task) => ({
      id: task.taskId,
      course: task.courseByCourseId?.courseName,
      title: task.taskName,
      owner: task.userByUserId?.email,
      requirement: task.taskrequirementsByTaskId
        ? task.taskrequirementsByTaskId.nodes.map(
            (req: taskRequirement) => req.requirementByRequirementId.requirementName
          )
        : [],
      level: task.level,
      type: task.type,
    }));
  };

  const getGivenTasks = (): task[] => {
    return givenTasks.allTasks.nodes.map((task: task) => ({
      id: task.taskId,
      course: task.courseByCourseId?.courseName,
      title: task.taskName,
      owner: task.userByUserId?.email,
      requirement: task.taskrequirementsByTaskId
        ? task.taskrequirementsByTaskId.nodes.map(
            (req: taskRequirement) => req.requirementByRequirementId.requirementName
          )
        : [],
      level: task.level,
      type: task.type,
    }));
  };

  return (
    <Fade in timeout={500}>
      <Box>
        <CssBaseline />
        <Container component={'main'} sx={{ bgcolor: 'background.default' }}>
          <Grid2 direction="column" container spacing={2} mt={10}>
            <Grid2 direction="row" container>
              <Typography typography="h5">Utdelte oppgaver</Typography>
              <Grid2 container direction={'row'} spacing={1} sx={{ flexGrow: 0 }} ml={'auto'} mt={'auto'}>
                <Button
                  variant="contained"
                  startIcon={<VisibilityIcon />}
                  sx={{
                    backgroundColor: NAV_COLORS.background,
                    color: NAV_COLORS.text,
                    textTransform: 'none',
                  }}
                  disabled
                  size="small"
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
                  }}
                  disabled
                  size="small"
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
                  }}
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
            <Table rows={getGivenTasks()} columns={columns} selectable />

            <Grid2 spacing={2} container direction="column">
              <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
                Alle oppgaver
              </Typography>
              <Grid2 container direction="row">
                <SearchBar options={rows2} prompt="Søk etter oppgaver" />
                <Grid2 container sx={{ flexGrow: 0, ml: 'auto' }} spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<CreateIcon />}
                    color="primary"
                    sx={{
                      textTransform: 'none',
                    }}
                    size="small"
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
                    }}
                    onClick={handleOpen}
                    size="small"
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
                          <Typography id="keep-mounted-modal-description" sx={{ mt: 2, mb: 1 }}>
                            Deler valgte oppgaver med:
                          </Typography>
                          {/*<SearchBar options={rows3} prompt="Søk etter elever" />
                          TODO: ADD SEARCH FUNCTIONALITY */}
                          <Table rows={rows3} columns={columns3} selectable />
                          <Button
                            variant="contained"
                            startIcon={<ShareIcon />}
                            sx={{
                              textTransform: 'none',
                              ml: 'auto',
                            }}
                            onClick={handleOpen}
                            size="small"
                          >
                            Del
                          </Button>
                        </Grid2>
                      </Box>
                    </Fade>
                  </Modal>
                </Grid2>
              </Grid2>
            </Grid2>
            <Table rows={getAllTasks()} columns={columns2} selectable />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
