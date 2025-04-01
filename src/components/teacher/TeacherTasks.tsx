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
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { NAV_COLORS, style } from '../../types/navColors';
import CreateIcon from '@mui/icons-material/Create';
import { columns, columns2, columns4 } from '../../types/userData';
import { studygroup, task, taskRequirement } from '../../types/tableProps';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { GET_ALL_TASKS } from '../../../graphql/queries/getAllTasks';
import { GET_ACTIVE_CREATED_TASKS } from '../../../graphql/queries/getActiveCreatedTasks';
import { GET_CREATED_TASKS } from '../../../graphql/queries/getCreatedTasks';
import { CREATE_RECOMMENDED } from '../../../graphql/mutations/createRecommended';
import { CREATE_RECOMMENDED_STUDENT } from '../../../graphql/mutations/createRecommendedStudent';
import { useStore } from 'zustand';
import useSelectedStore from '../../stores/useSelectedStore';
import { UPDATE_TASK_VISIBILITY } from '../../../graphql/mutations/updateTaskVisibility';
import { DELETE_TASK_BY_TASK_ID } from '../../../graphql/mutations/deleteTaskByTaskId';
import { classTranslations, courseTranslations, typeTranslations } from '../../types/translations';
import { GET_ALL_STUDY_GROUPS } from '../../../graphql/queries/getAllStudygroups';
import { GET_ENROLMENTS_BY_STUDY_GROUP_ID } from '../../../graphql/queries/getEnrolmentsByStudyGroupId';

export default function TeacherTasks() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [inactiveTasks, setInactiveTasks] = useState(false);
  const client = useApolloClient();
  const userId = parseInt(localStorage.getItem('id')!);
  const {
    allTasksSelectionModel,
    studygroupSelectionModel,
    recommendedSelectionModel: createdTasksSelectionModel,
    setRecommendedSelectionModel: setCreatedTasksSelectionModel,
    setAllTasksSelectionModel,
    setStudygroupSelectionModel,
  } = useStore(useSelectedStore);
  const { loading: tasksLoading, error: tasksError, data: allTasks } = useQuery(GET_ALL_TASKS);
  const {
    loading: createdLoading,
    error: createdError,
    data: createdTasks,
  } = useQuery(GET_CREATED_TASKS, { variables: { userId: userId } });
  const { loading: activeCreatedLoading, data: activeCreatedTasks } = useQuery(GET_ACTIVE_CREATED_TASKS, {
    variables: { userId: userId },
  });
  const { loading: studygroupsLoading, data: studygroupsData } = useQuery(GET_ALL_STUDY_GROUPS, {
    variables: { userId: userId },
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
  if (tasksLoading || createdLoading || studygroupsLoading || activeCreatedLoading) {
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
      difficulty: task.difficulty,
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
      difficulty: task.difficulty,
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
      difficulty: task.difficulty,
    }));
  };

  const getStudygroups = (): studygroup[] => {
    return studygroupsData.allStudygroups.nodes.map((studyGroup: studygroup) => ({
      id: studyGroup.studyGroupId,
      title: studyGroup.studyGroupName,
      level:
        studyGroup.courseByCourseId.courseName in courseTranslations
          ? classTranslations[courseTranslations[studyGroup.courseByCourseId.courseName]]
          : 'ukjent',
      class: studyGroup.courseByCourseId?.courseName,
      school: studyGroup.schoolBySchoolId?.schoolName,
    }));
  };

  const handleShare = async () => {
    try {
      for (const taskId in allTasksSelectionModel) {
        for (const studygroupId in studygroupSelectionModel) {
          const response = await createRecommended({
            variables: {
              userId: userId,
              taskId: allTasksSelectionModel[taskId],
              studyGroupId: studygroupSelectionModel[studygroupId],
            },
          });
          const recommendedId = response.data.createRecommended.recommended.recommendedId;
          const { data } = await client.query({
            query: GET_ENROLMENTS_BY_STUDY_GROUP_ID,
            variables: {
              studyGroupId: studygroupSelectionModel[studygroupId],
            },
          });
          for (const student of data.allEnrolments.nodes) {
            await createRecommendedStudent({
              variables: {
                userId: student.userId,
                recommendedId: recommendedId,
              },
            });
          }
        }
      }
      setAllTasksSelectionModel([]);
      setStudygroupSelectionModel([]);
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

            <Grid2 spacing={2} container direction="column" mt={2}>
              <Grid2 container direction="row">
                <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
                  Alle oppgaver
                </Typography>
                {/*<SearchBar options={rows2} prompt="Søk etter oppgaver" />*/}
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
                            Del valgte oppgaver med følgende undervisningsgrupper:
                          </Typography>
                          {/*<SearchBar options={rows3} prompt="Søk etter elever" />
                          TODO: ADD SEARCH FUNCTIONALITY */}
                          <Table
                            rows={getStudygroups()}
                            columns={columns4}
                            selectable
                            selectionModel={studygroupSelectionModel}
                            setSelectionModel={setStudygroupSelectionModel}
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
