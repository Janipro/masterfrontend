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
import { columns, columns2, columns3, rows2 } from '../../types/userData';
import { student, task, taskRequirement, user } from '../../types/tableProps';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_TASKS } from '../../../graphql/queries/getAllTasks';
import { GET_ACTIVE_CREATED_TASKS } from '../../../graphql/queries/getActiveCreatedTasks';
import { GET_CREATED_TASKS } from '../../../graphql/queries/getCreatedTasks';
import { GET_ALL_STUDENTS } from '../../../graphql/queries/getAllStudents';
import { CREATE_RECOMMENDED } from '../../../graphql/mutations/createRecommended';
import { CREATE_RECOMMENDED_STUDENT } from '../../../graphql/mutations/createRecommendedStudent';
import { useStore } from 'zustand';
import useSelectedStore from '../../stores/useSelectedStore';
import { UPDATE_TASK_VISIBILITY } from '../../../graphql/mutations/updateTaskVisibility';
import { DELETE_TASK_BY_TASK_ID } from '../../../graphql/mutations/deleteTaskByTaskId';
import { classTranslations, typeTranslations } from '../../types/translations';

export default function TeacherTasks() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [inactiveTasks, setInactiveTasks] = useState(false);
  const userId = parseInt(localStorage.getItem('id')!);
  const classId = parseInt(localStorage.getItem('class_id')!);
  const schoolId = parseInt(localStorage.getItem('school_id')!);
  const { allTasksSelectionModel, setAllTasksSelectionModel } = useStore(useSelectedStore);
  const {
    recommendedSelectionModel: createdTasksSelectionModel,
    setRecommendedSelectionModel: setCreatedTasksSelectionModel,
  } = useStore(useSelectedStore);
  const { studentSelectionModel, setStudentSelectionModel } = useStore(useSelectedStore);
  const { loading: tasksLoading, error: tasksError, data: allTasks } = useQuery(GET_ALL_TASKS);
  const {
    loading: createdLoading,
    error: createdError,
    data: createdTasks,
  } = useQuery(GET_CREATED_TASKS, { variables: { userId: userId } });
  const { loading: activeCreatedLoading, data: activeCreatedTasks } = useQuery(GET_ACTIVE_CREATED_TASKS, {
    variables: { userId: userId },
  });
  const { loading: studentsLoading, data: studentsData } = useQuery(GET_ALL_STUDENTS, {
    variables: { classId: classId, schoolId: schoolId },
  });
  const [createRecommended] = useMutation(CREATE_RECOMMENDED);
  const [createRecommendedStudent] = useMutation(CREATE_RECOMMENDED_STUDENT);
  const [updateTaskVisibility] = useMutation(UPDATE_TASK_VISIBILITY, {
    refetchQueries: [
      { query: GET_CREATED_TASKS, variables: { userId: userId } },
      { query: GET_ACTIVE_CREATED_TASKS, variables: { userId: userId } },
    ],
  });
  const [deleteTaskByTaskId] = useMutation(DELETE_TASK_BY_TASK_ID, {
    refetchQueries: [
      { query: GET_CREATED_TASKS, variables: { userId: userId } },
      { query: GET_ACTIVE_CREATED_TASKS, variables: { userId: userId } },
    ],
  });
  if (tasksLoading || createdLoading || studentsLoading || activeCreatedLoading) {
    return (
      <Box mt="30vh">
        <p> Laster inn... </p>
      </Box>
    );
  }

  if (tasksError || createdError) {
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
      type: task.type.toLowerCase() === 'exercise' ? typeTranslations.exercise : typeTranslations.obligatory,
    }));
  };

  const getCreatedTasks = (): task[] => {
    return createdTasks.allTasks.nodes.map((task: task) => ({
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
      type: task.type.toLowerCase() === 'exercise' ? typeTranslations.exercise : typeTranslations.obligatory,
    }));
  };

  const getActiveCreatedTasks = (): task[] => {
    return activeCreatedTasks.allTasks.nodes.map((task: task) => ({
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
      type: task.type.toLowerCase() === 'exercise' ? typeTranslations.exercise : typeTranslations.obligatory,
    }));
  };

  const getClass = (): student[] => {
    return studentsData.allUsers.nodes.map((student: user) => ({
      id: student.userId,
      title: `${student.firstname} ${student.lastname}`,
      level: student.classByClassId?.grade in classTranslations ? classTranslations[student.classByClassId?.grade] : 0,
      class: student.classByClassId?.className,
      school: student.schoolBySchoolId?.schoolName,
    }));
  };

  const handleShare = async () => {
    try {
      for (const taskId in allTasksSelectionModel) {
        const response = await createRecommended({
          variables: {
            userId: userId,
            taskId: allTasksSelectionModel[taskId],
            studyGroupId: 1, // Temp value (need to edit when figma implemented)
          },
        });
        const recommendedId = response.data.createRecommended.recommended.recommendedId;
        for (const studentId in studentSelectionModel) {
          await createRecommendedStudent({
            variables: {
              userId: studentSelectionModel[studentId],
              recommendedId: recommendedId,
            },
          });
        }
      }
      setAllTasksSelectionModel([]);
      setStudentSelectionModel([]);
      handleClose();
    } catch (error) {
      console.log('Could not share task: ', error);
    }
  };

  const handleVisibility = async (isActive: boolean) => {
    try {
      for (const taskId in createdTasksSelectionModel) {
        await updateTaskVisibility({
          variables: {
            isActive: isActive,
            taskId: createdTasksSelectionModel[taskId],
          },
        });
      }
      setCreatedTasksSelectionModel([]);
    } catch (error) {
      console.log('Could not update task: ', error);
    }
  };

  const handleDelete = async () => {
    try {
      for (const taskId in createdTasksSelectionModel) {
        await deleteTaskByTaskId({
          variables: {
            taskId: createdTasksSelectionModel[taskId],
          },
        });
      }
      setCreatedTasksSelectionModel([]);
    } catch (error) {
      console.log('Could not delete task: ', error);
    }
  };

  return (
    <Fade in timeout={500}>
      <Box>
        <CssBaseline />
        <Container component={'main'} sx={{ bgcolor: 'background.default' }}>
          <Grid2 direction="column" container spacing={2} mt={10}>
            <Grid2 direction="row" container>
              <Typography typography="h5">Mine oppgaver</Typography>
              <Grid2 container direction={'row'} spacing={1} sx={{ flexGrow: 0 }} ml={'auto'} mt={'auto'}>
                <Button
                  variant="contained"
                  startIcon={<VisibilityIcon />}
                  sx={{
                    backgroundColor: NAV_COLORS.background,
                    color: NAV_COLORS.text,
                    textTransform: 'none',
                  }}
                  disabled={createdTasksSelectionModel.length === 0}
                  size="small"
                  onClick={() => handleVisibility(true)}
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
                  disabled={createdTasksSelectionModel.length === 0}
                  size="small"
                  onClick={() => handleVisibility(false)}
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
                  disabled={createdTasksSelectionModel.length === 0}
                  size="small"
                  onClick={handleDelete}
                >
                  Slett
                </Button>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Vis inaktive"
                    value={inactiveTasks}
                    onChange={() => setInactiveTasks(!inactiveTasks)}
                  />
                </FormGroup>
              </Grid2>
            </Grid2>
            <Table
              rows={inactiveTasks ? getCreatedTasks() : getActiveCreatedTasks()}
              columns={columns}
              selectable
              key={inactiveTasks ? 'inactive' : 'active'}
              selectionModel={createdTasksSelectionModel}
              setSelectionModel={setCreatedTasksSelectionModel}
            />

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
                    disabled={allTasksSelectionModel.length === 0}
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
                          <Table
                            rows={getClass()}
                            columns={columns3}
                            selectable
                            selectionModel={studentSelectionModel}
                            setSelectionModel={setStudentSelectionModel}
                          />
                          <Button
                            variant="contained"
                            startIcon={<ShareIcon />}
                            sx={{
                              textTransform: 'none',
                              ml: 'auto',
                            }}
                            onClick={handleShare}
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
            <Table
              rows={getAllTasks()}
              columns={columns2}
              selectable
              selectionModel={allTasksSelectionModel}
              setSelectionModel={setAllTasksSelectionModel}
            />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
