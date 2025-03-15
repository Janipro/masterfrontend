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
import { columns, columns3, rows3 } from '../../types/userData';
import { useMutation, useQuery } from '@apollo/client';
import { GET_GIVEN_TASKS } from '../../../graphql/queries/getGivenTasks';
import { GET_ALL_COURSES } from '../../../graphql/queries/getAllCourses';
import { GET_ALL_STUDY_GROUPS } from '../../../graphql/queries/getAllStudygroups';
import { CREATE_STUDY_GROUP } from '../../../graphql/mutations/createStudygroup';
import { course, studygroup, task, taskRequirement } from '../../types/tableProps';

export default function TeacherDashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [course, setCourse] = useState('');
  const [description, setDescription] = useState('');
  const [studygroupName, setStudygroupName] = useState('');

  const handleChangeCourse = (event: SelectChangeEvent) => {
    setCourse(event.target.value);
  };

  const { loading: taskLoading, error, data: taskData } = useQuery(GET_GIVEN_TASKS, { variables: { userId: 2 } });
  const { loading: courseLoading, data: courseData } = useQuery(GET_ALL_COURSES);
  const { loading: studygroupLoading, data: studygroupData } = useQuery(GET_ALL_STUDY_GROUPS, {
    variables: { userId: 2 },
  });
  const [createStudygroup] = useMutation(CREATE_STUDY_GROUP, {
    refetchQueries: [{ query: GET_ALL_STUDY_GROUPS, variables: { userId: 2 } }],
  });

  if (taskLoading || courseLoading || studygroupLoading) {
    return (
      <Box mt="30vh">
        <p> Laster inn... </p>
      </Box>
    );
  }

  if (error) {
    console.log('could not load from db');
  }

  const getGivenTasks = (): task[] => {
    return taskData.allTasks.nodes.map((task: task) => ({
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

  const handleCreate = async () => {
    try {
      await createStudygroup({
        variables: {
          courseId: course,
          description: description,
          schoolId: 3,
          studyGroupName: studygroupName,
          userId: 2,
        },
      });
      handleClose();
    } catch (error) {
      console.log('Error creating studygroup: ', error);
    }
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
                              onChange={(e) => {
                                setStudygroupName(e.target.value);
                              }}
                            />
                            <FormControl sx={{ minWidth: 100 }} size="small">
                              <InputLabel id="select-small-course">Fag</InputLabel>
                              <Select
                                labelId="select-small-course"
                                id="select-small"
                                value={course}
                                label="Course"
                                onChange={handleChangeCourse}
                              >
                                {courseData.allCourses.nodes.map((course: course) => (
                                  <MenuItem value={course.courseId}>{course.courseName}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            {/**<FormControl sx={{ minWidth: 100 }} size="small">
                              <InputLabel id="select-small-level">Nivå</InputLabel>
                              <Select
                                labelId="select-small-level"
                                id="select-small"
                                value={level}
                                label="Level"
                                onChange={handleChangeLevel}
                              >
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>VG1</MenuItem>
                                <MenuItem value={12}>VG2</MenuItem>
                                <MenuItem value={13}>VG3</MenuItem>
                              </Select>
                            </FormControl>**/}
                          </Stack>
                          <TextField
                            id="keep-mounted-modal-description"
                            label="Kort beskrivelse av gruppen"
                            multiline
                            rows={3}
                            sx={{ width: 400 }}
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
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
                            onClick={handleCreate}
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
                {studygroupData.allStudygroups.nodes.map((studygroup: studygroup) => (
                  <InfoCard title={studygroup.studyGroupName} />
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
            <Table rows={getGivenTasks()} columns={columns} selectable />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
