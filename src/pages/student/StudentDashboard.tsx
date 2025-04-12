import { Box, Container, CssBaseline, Fade, Grid2, List, ListItem, Typography } from '@mui/material';
import Table from '../../components/Table';
import InfoCard from '../../components/InfoCard';
import Calendar from '../../components/Calendar';
import Requirement from '../../components/Requirement';
import { useQuery } from '@apollo/client';
import { taskRequirement, enrolment, recommendedStudent } from '../../types/tableProps';
import { GET_RECOMMENDED_STUDENTS } from '../../../graphql/queries/getRecommendedStudents';
import { GET_ALL_ENROLMENTS } from '../../../graphql/queries/getAllEnrolments';
import { columns5 } from '../../types/userData';
import { typeTranslations } from '../../types/translations';

export default function StudentDashboard() {
  const userId = parseInt(localStorage.getItem('id')!);
  const {
    loading: recommendedsLoading,
    error: recommendedsError,
    data: recommendedTasks,
  } = useQuery(GET_RECOMMENDED_STUDENTS, { variables: { userId: userId } });
  const { loading: studygroupLoading, data: studygroupData } = useQuery(GET_ALL_ENROLMENTS, {
    variables: { userId: userId },
  });
  if (recommendedsLoading || studygroupLoading) {
    return (
      <Box mt="30vh">
        <p> Laster inn... </p>
      </Box>
    );
  }

  if (recommendedsError) {
    console.log(localStorage.getItem('id'));
    console.log('could not load from db: ', recommendedsError);
  }
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
          <Grid2 sx={{ display: 'flex' }}>
            <Grid2
              component="main"
              sx={{
                flexGrow: 1,
                textAlign: 'left',
              }}
            >
              <Typography variant="h5" noWrap component="div" sx={{ mt: 10, ml: -3 }}>
                Mine fag
              </Typography>
              <Grid2 container direction={'row'} spacing={2} sx={{ m: 2, p: 1, maxWidth: 600 }}>
                {studygroupData.allEnrolments.nodes.map((enrolment: enrolment) => (
                  <InfoCard
                    title={enrolment.studygroupByStudyGroupId.studyGroupName}
                    id={enrolment.studygroupByStudyGroupId.studyGroupId}
                  />
                ))}
              </Grid2>
            </Grid2>
            <Grid2
              component="main"
              sx={{
                flexGrow: 1,
                mt: 10,
              }}
            >
              <Typography variant="h5" noWrap component="div">
                Progresjon
              </Typography>
              <Grid2 container sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <List dense sx={{ listStyle: 'decimal', pl: 4 }}>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Requirement value="for-løkke" size="small" />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Requirement value="if-setning" size="small" />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Requirement value="while-løkke" size="small" />
                  </ListItem>
                </List>
              </Grid2>
              <Calendar />
            </Grid2>
          </Grid2>
          <Grid2
            component="main"
            sx={{
              flexGrow: 1,
              textAlign: 'left',
              mt: -4,
            }}
          >
            <Typography variant="h5" noWrap component="div" sx={{ mb: 2 }}>
              Anbefalte oppgaver
            </Typography>
            <Table rows={getRecommendedTasks()} columns={columns5} selectable={false} />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
