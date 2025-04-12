import { Box, Container, CssBaseline, Fade, Grid2, Typography } from '@mui/material';
import Table from '../../components/Table';
import { columns2, columns5 } from '../../types/userData';
import { useQuery } from '@apollo/client';
import { GET_ALL_TASKS } from '../../../graphql/queries/getAllTasks';
import { GET_RECOMMENDED_STUDENTS } from '../../../graphql/queries/getRecommendedStudents';
import { recommendedStudent, task, taskRequirement } from '../../types/tableProps';
import { typeTranslations } from '../../types/translations';

export default function StudentTasks() {
  const userId = parseInt(localStorage.getItem('id')!);
  const { loading: tasksLoading, error: tasksError, data: allTasks } = useQuery(GET_ALL_TASKS);
  const {
    loading: recommendedsLoading,
    error: recommendedsError,
    data: recommendedTasks,
  } = useQuery(GET_RECOMMENDED_STUDENTS, { variables: { userId: userId } });

  if (tasksLoading || recommendedsLoading) {
    return (
      <Box mt="30vh">
        <p> Laster inn... </p>
      </Box>
    );
  }

  if (tasksError || recommendedsError) {
    console.log('could not load from db: ', tasksError);
    console.log('could not load from db: ', recommendedsError);
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
      taskId: task.taskId,
      type: task.type.toLowerCase() === 'exercise' ? typeTranslations.exercise : typeTranslations.obligatory,
      difficulty: task.difficulty,
    }));
  };

  const getRecommendedTasks = (): recommendedStudent[] => {
    return recommendedTasks.allRecommendedstudents.nodes.map((recommendedStudent: recommendedStudent) => ({
      id: recommendedStudent.recommendedStudentId,
      course: recommendedStudent.recommendedByRecommendedId?.taskByTaskId.courseByCourseId?.courseName,
      title: recommendedStudent.recommendedByRecommendedId?.taskByTaskId.taskName,
      owner: recommendedStudent.recommendedByRecommendedId?.taskByTaskId.userByUserId?.email,
      requirement: recommendedStudent.recommendedByRecommendedId?.taskByTaskId.taskrequirementsByTaskId
        ? recommendedStudent.recommendedByRecommendedId?.taskByTaskId.taskrequirementsByTaskId.nodes.map(
            (req: taskRequirement) => req.requirementByRequirementId.requirementName
          )
        : [],
      level: recommendedStudent.recommendedByRecommendedId?.taskByTaskId.level,
      type:
        recommendedStudent.recommendedByRecommendedId?.type.toLowerCase() === 'exercise'
          ? typeTranslations.exercise
          : typeTranslations.obligatory,
      taskId: recommendedStudent.recommendedByRecommendedId?.taskByTaskId.taskId,
      difficulty: recommendedStudent.recommendedByRecommendedId?.taskByTaskId.difficulty,
      due: recommendedStudent.recommendedByRecommendedId?.taskByTaskId.due == null ? 'Ingen frist' : '',
    }));
  };

  return (
    <Fade in timeout={500}>
      <Box>
        <CssBaseline />
        <Container component={'main'} sx={{ bgcolor: 'background.default' }}>
          <Grid2 direction="column" container spacing={2} mt={10}>
            <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
              Anbefalte oppgaver
            </Typography>
            <Table rows={getRecommendedTasks()} columns={columns5} selectable={false} />

            <Grid2 container spacing={2} direction="column" mt={2}>
              <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
                Alle oppgaver
              </Typography>
              {/*<SearchBar options={getAllTasks()} prompt="Søk etter oppgaver" />*/}
            </Grid2>
            <Table rows={getAllTasks()} columns={columns2} selectable={false} />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
