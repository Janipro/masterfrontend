import { Box, Container, Fade, Grid2, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import InfoCard from '../../components/InfoCard';
import { enrolment } from '../../types/tableProps';
import { GET_ALL_ENROLMENTS } from '../../../graphql/queries/getAllEnrolments';

export default function StudentClasses() {
  const userId = parseInt(localStorage.getItem('id')!);
  const { loading, error, data } = useQuery(GET_ALL_ENROLMENTS, {
    variables: { userId: userId },
  });
  if (loading) {
    return (
      <Box mt="30vh">
        <p> Laster inn... </p>
      </Box>
    );
  }

  if (error) {
    console.log('could not load from db: ', error);
  }
  return (
    <Fade in timeout={500}>
      <Box>
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
                {data.allEnrolments.nodes.map((enrolment: enrolment) => (
                  <InfoCard
                    title={enrolment.studygroupByStudyGroupId.studyGroupName}
                    id={enrolment.studygroupByStudyGroupId.studyGroupId}
                  />
                ))}
              </Grid2>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
