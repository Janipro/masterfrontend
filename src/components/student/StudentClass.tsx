import { Box, Container, CssBaseline, Fade, Grid2, Stack, Typography } from '@mui/material';
import Table from '../Table';
import { NAV_COLORS } from '../../types/navColors';
import Announcements from '../Announcements';
import { announcement, recommendedStudent, taskRequirement } from '../../types/tableProps';
import { useQuery } from '@apollo/client';
import { GET_RECOMMENDED_STUDENTS } from '../../../graphql/queries/getRecommendedStudents';
import { columns } from '../../types/userData';
import { GET_ALL_ANNOUNCEMENTS } from '../../../graphql/queries/getAllAnnouncements';
import { GET_STUDY_GROUP_BY_STUDY_GROUP_ID } from '../../../graphql/queries/getStudygroupByStudyGroupId';
import { useParams } from 'react-router-dom';
import { typeTranslations } from '../../types/translations';

export default function StudentClass() {
  const { id } = useParams();
  const userId = parseInt(localStorage.getItem('id')!);
  const {
    loading: recommendedsLoading,
    error: recommendedsError,
    data: recommendedTasks,
  } = useQuery(GET_RECOMMENDED_STUDENTS, { variables: { userId: userId } });
  const { loading: announcementLoading, data: announcementData } = useQuery(GET_ALL_ANNOUNCEMENTS, {
    variables: { studyGroupId: parseInt(id!) },
  });
  const { loading: studygroupLoading, data: studygroupData } = useQuery(GET_STUDY_GROUP_BY_STUDY_GROUP_ID, {
    variables: { studyGroupId: parseInt(id!) },
  });

  if (recommendedsLoading || announcementLoading || studygroupLoading) {
    return (
      <Box mt="30vh">
        <p> Laster inn... </p>
      </Box>
    );
  }

  if (recommendedsError) {
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
        recommendedStudent.recommendedByRecommendedId?.type === 'exercise'
          ? typeTranslations.exercise
          : typeTranslations.obligatory,
    }));
  };

  const getAllAnnouncements = (): announcement[] => {
    return announcementData.allAnnouncements.nodes.map((announcement: announcement) => ({
      title: announcement.title,
      content: announcement.content,
      datePublished: announcement.datePublished,
    }));
  };
  return (
    <Fade in timeout={500}>
      <Box>
        <CssBaseline />
        <Container component={'main'} sx={{ bgcolor: 'background.default' }}>
          <Grid2 direction="column" container spacing={2} mt={10}>
            <Typography variant="h4" noWrap component="div" sx={{ textAlign: 'left' }}>
              {studygroupData.studygroupByStudyGroupId.studyGroupName}
            </Typography>
            <Stack direction="row" spacing={8} color={NAV_COLORS.text}>
              <Typography>{`Fag: ${studygroupData.studygroupByStudyGroupId.courseByCourseId.courseName}`}</Typography>
              <Typography>{`Lærer: ${studygroupData.studygroupByStudyGroupId.userByUserId.firstname} ${studygroupData.studygroupByStudyGroupId.userByUserId.lastname}`}</Typography>
              <Typography>{`E-post: ${studygroupData.studygroupByStudyGroupId.userByUserId.email}`}</Typography>
            </Stack>
            <Typography sx={{ textAlign: 'left', mb: 4 }} color={NAV_COLORS.text}>
              {studygroupData.studygroupByStudyGroupId.description}
            </Typography>

            <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
              Kunngjøringer
            </Typography>
            <Announcements rows={getAllAnnouncements()} />
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
