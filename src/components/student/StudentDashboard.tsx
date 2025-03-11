import { Box, Container, CssBaseline, Fade, Grid2, List, ListItem, Typography } from '@mui/material';
import Table from '../Table';
import InfoCard from '../InfoCard';
import Calendar from '../Calendar';
import Requirement from '../Requirement';
import { useQuery } from '@apollo/client';
import { recommended, taskRequirement } from '../../types/tableProps';
import { GET_RECOMMENDED_TASKS } from '../../../graphql/queries/getRecommendedTasks';
import { columns } from '../../types/userData';

const subjects = [1, 2, 3, 4, 5, 6];

export default function StudentDashboard() {
  const { loading, error, data } = useQuery(GET_RECOMMENDED_TASKS, { variables: { userId: 1 } });

  if (loading) {
    return (
      <Box mt="30vh">
        <p> Loading... </p>
      </Box>
    );
  }

  if (error) {
    console.log('could not load from db');
  }
  const getRecommendedTasks = (): recommended[] => {
    return data.allRecommendeds.nodes.map((recommended: recommended) => ({
      id: recommended.taskByTaskId.taskId,
      course: recommended.taskByTaskId.courseByCourseId?.courseName,
      title: recommended.taskByTaskId.taskName,
      owner: recommended.taskByTaskId.userByUserId?.email,
      requirement: recommended.taskByTaskId.taskrequirementsByTaskId
        ? recommended.taskByTaskId.taskrequirementsByTaskId.nodes.map(
            (req: taskRequirement) => req.requirementByRequirementId.requirementName
          )
        : [],
      level: recommended.taskByTaskId.difficulty,
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
                {subjects.map(() => (
                  <InfoCard />
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
