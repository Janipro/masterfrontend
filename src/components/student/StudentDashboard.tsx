import { Box, Container, CssBaseline, Fade, Grid2, List, ListItem, Typography } from '@mui/material';
import Table from '../Table';
import InfoCard from '../InfoCard';
import Calendar from '../Calendar';
import Requirement from '../Requirement';
import { useQuery } from '@apollo/client';
import { recommended, taskRequirement, enrolment } from '../../types/tableProps';
import { GET_RECOMMENDED_TASKS } from '../../../graphql/queries/getRecommendeds';
import { GET_ALL_ENROLMENTS } from '../../../graphql/queries/getAllEnrolments';
import { columns } from '../../types/userData';

export default function StudentDashboard() {
  const userId = parseInt(localStorage.getItem('id')!);
  const {
    loading: taskLoading,
    error,
    data: taskData,
  } = useQuery(GET_RECOMMENDED_TASKS, { variables: { userId: userId } });
  const { loading: studygroupLoading, data: studygroupData } = useQuery(GET_ALL_ENROLMENTS, {
    variables: { userId: userId },
  });
  if (taskLoading || studygroupLoading) {
    return (
      <Box mt="30vh">
        <p> Laster inn... </p>
      </Box>
    );
  }

  if (error) {
    console.log(localStorage.getItem('id'));
    console.log('could not load from db: ', error);
  }
  const getRecommendedTasks = (): recommended[] => {
    return taskData.allRecommendeds.nodes.map((recommended: recommended) => ({
      id: recommended.taskByTaskId.taskId,
      course: recommended.taskByTaskId.courseByCourseId?.courseName,
      title: recommended.taskByTaskId.taskName,
      owner: recommended.taskByTaskId.userByUserId?.email,
      requirement: recommended.taskByTaskId.taskrequirementsByTaskId
        ? recommended.taskByTaskId.taskrequirementsByTaskId.nodes.map(
            (req: taskRequirement) => req.requirementByRequirementId.requirementName
          )
        : [],
      level: recommended.taskByTaskId.level,
      type: recommended.taskByTaskId.type,
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
            <Typography variant="h5" noWrap component="div" sx={{ mb: 0.5 }}>
              Anbefalte oppgaver
            </Typography>
            <Table rows={getRecommendedTasks()} columns={columns} selectable={false} />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
