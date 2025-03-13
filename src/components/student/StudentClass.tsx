import { Box, Container, CssBaseline, Fade, Grid2, Stack, Typography } from '@mui/material';
import Table from '../Table';
import { NAV_COLORS } from '../../types/navColors';
import Announcements from '../Announcements';
import { recommended, taskRequirement } from '../../types/tableProps';
import { useQuery } from '@apollo/client';
import { GET_RECOMMENDED_TASKS } from '../../../graphql/queries/getRecommendedTasks';
import { columns } from '../../types/userData';

export default function StudentClass() {
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
      level: recommended.taskByTaskId.level,
    }));
  };
  return (
    <Fade in timeout={500}>
      <Box>
        <CssBaseline />
        <Container component={'main'} sx={{ bgcolor: 'background.default' }}>
          <Grid2 direction="column" container spacing={2} mt={10}>
            <Typography variant="h4" noWrap component="div" sx={{ textAlign: 'left' }}>
              R1 - klasse 1
            </Typography>
            <Stack direction="row" spacing={8} mb={4} color={NAV_COLORS.text}>
              <Typography>Fag: Matematikk</Typography>
              <Typography>Lærer: Ole Bull</Typography>
              <Typography>E-post: ole.bull@osloskolen.no</Typography>
            </Stack>

            <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
              Kunngjøringer
            </Typography>
            <Announcements />
            <Grid2 container spacing={2} direction="column">
              <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
                Anbefalte oppgaver
              </Typography>
            </Grid2>
            <Table rows={getRecommendedTasks()} columns={columns} selectable={false} />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
