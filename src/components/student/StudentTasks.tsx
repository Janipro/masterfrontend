import { Box, Container, CssBaseline, Fade, Grid2, Typography } from '@mui/material';
import Table from '../Table';
import SearchBar from '../SearchBar';
import { columns, columns2, rows } from '../../types/userData';
import { useQuery } from '@apollo/client';
import { GET_ALL_TASKS } from '../../../graphql/queries/getAllTasks';
import { tableProps } from '../../types/tableProps';

export default function StudentTasks() {
  const { loading, error, data } = useQuery(GET_ALL_TASKS);

  if (loading) {
    return <p> Loading... </p>;
  }

  if (error) {
    console.log(`could not load tasks ${error}`);
  }

  const transformData = (): tableProps[] => {
    return data.allTasks.nodes.map((task: tableProps) => ({
      id: task.taskId,
      course: task.courseByCourseId?.courseName,
      title: task.taskName,
      owner: task.userByUserId?.email,
      requirement: [task.taskrequirementsByTaskId?.nodes[0].requirementByRequirementId.requirementName],
      level: task.difficulty,
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
            <Table rows={rows} columns={columns} selectable={false} />

            <Grid2 container spacing={2} direction="column">
              <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
                Alle oppgaver
              </Typography>
              <SearchBar options={rows} prompt="Søk etter oppgaver" />
            </Grid2>
            <Table rows={transformData()} columns={columns2} selectable={false} />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
