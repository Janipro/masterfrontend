import {
  Backdrop,
  Box,
  Button,
  Container,
  CssBaseline,
  Fade,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Table from '../Table';
import { NAV_COLORS, style } from '../../types/navColors';
import Announcements from '../Announcements';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { useState } from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CreateIcon from '@mui/icons-material/Create';
import { columns } from '../../types/userData';
import { announcement, taskRequirement, course, recommended } from '../../types/tableProps';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_ANNOUNCEMENTS } from '../../../graphql/queries/getAllAnnouncements';
import { CREATE_ANNOUNCEMENT } from '../../../graphql/mutations/createAnnouncement';
import { UPDATE_STUDY_GROUP_BY_STUDY_GROUP_ID } from '../../../graphql/mutations/updateStudygroupByStudyGroupId';
import { GET_STUDY_GROUP_BY_STUDY_GROUP_ID } from '../../../graphql/queries/getStudygroupByStudyGroupId';
import { useParams } from 'react-router-dom';
import { GET_ALL_COURSES } from '../../../graphql/queries/getAllCourses';
import { GET_RECOMMENDEDS } from '../../../graphql/queries/getRecommendeds';
import { typeTranslations } from '../../types/translations';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useDarkmodeStore from '../../stores/useDarkmodeStore';

export default function TeacherClass() {
  const [editOpen, setEditOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const handleEditOpen = () => {
    setStudygroupName(studygroupData.studygroupByStudyGroupId.studyGroupName);
    setDescription(studygroupData.studygroupByStudyGroupId.description);
    setCourse(studygroupData.studygroupByStudyGroupId.courseByCourseId.courseId);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);
  const handleAnnouncementOpen = () => setAnnouncementOpen(true);
  const handleAnnouncementClose = () => setAnnouncementOpen(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const userId = parseInt(localStorage.getItem('id')!);
  const {
    loading: recommendedLoading,
    error,
    data: recommendedData,
  } = useQuery(GET_RECOMMENDEDS, { variables: { userId: userId } });
  const { loading: announcementLoading, data: announcementData } = useQuery(GET_ALL_ANNOUNCEMENTS, {
    variables: { studyGroupId: parseInt(id!) },
  });
  const { loading: studygroupLoading, data: studygroupData } = useQuery(GET_STUDY_GROUP_BY_STUDY_GROUP_ID, {
    variables: { studyGroupId: parseInt(id!) },
  });
  const { loading: courseLoading, data: courseData } = useQuery(GET_ALL_COURSES);
  const [createAnnouncement] = useMutation(CREATE_ANNOUNCEMENT, {
    refetchQueries: [{ query: GET_ALL_ANNOUNCEMENTS, variables: { studyGroupId: parseInt(id!) } }],
  });
  const [updateStudygroupByStudyGroupId] = useMutation(UPDATE_STUDY_GROUP_BY_STUDY_GROUP_ID, {
    refetchQueries: [{ query: GET_STUDY_GROUP_BY_STUDY_GROUP_ID, variables: { studyGroupId: parseInt(id!) } }],
  });

  const handleChangeCourse = (event: SelectChangeEvent) => {
    setCourse(event.target.value);
  };

  const [studygroupName, setStudygroupName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const { isDarkmode } = useDarkmodeStore();

  if (recommendedLoading || announcementLoading || studygroupLoading || courseLoading) {
    return (
      <Box mt="30vh">
        <p> Laster inn... </p>
      </Box>
    );
  }

  if (error) {
    console.log('could not load from db: ', error);
  }

  const getGivenRecommendeds = (): recommended[] => {
    return recommendedData.allRecommendeds.nodes.map((recommended: recommended) => ({
      id: recommended.recommendedId,
      course: recommended.taskByTaskId?.courseByCourseId?.courseName,
      title: recommended.taskByTaskId?.taskName,
      owner: recommended.taskByTaskId?.userByUserId?.email,
      requirement: recommended.taskByTaskId?.taskrequirementsByTaskId
        ? recommended.taskByTaskId?.taskrequirementsByTaskId.nodes.map(
            (req: taskRequirement) => req.requirementByRequirementId.requirementName
          )
        : [],
      level: recommended.taskByTaskId?.level,
      type: recommended.type === 'exercise' ? typeTranslations.exercise : typeTranslations.obligatory,
      taskId: recommended.taskByTaskId?.taskId,
    }));
  };

  const getAllAnnouncements = (): announcement[] => {
    return announcementData.allAnnouncements.nodes.map((announcement: announcement) => ({
      title: announcement.title,
      content: announcement.content,
      datePublished: announcement.datePublished,
    }));
  };

  const handleCreate = async () => {
    try {
      await createAnnouncement({
        variables: {
          userId: userId,
          title: title,
          content: content,
          datePublished: new Date(),
          studyGroupId: parseInt(id!),
        },
      });
      handleAnnouncementClose();
    } catch (error) {
      console.log('Error creating announcement: ', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateStudygroupByStudyGroupId({
        variables: {
          studyGroupId: parseInt(id!),
          description: description,
          studyGroupName: studygroupName,
          courseId: course,
        },
      });
      handleEditClose();
    } catch (error) {
      console.log('Error updating studygroup: ', error);
    }
  };

  return (
    <Fade in timeout={500}>
      <Box>
        <CssBaseline />
        <Container component={'main'} sx={{ bgcolor: 'background.default' }}>
          <Grid2 direction="column" container spacing={2} mt={10}>
            <Stack direction="row">
              <Typography variant="h4" noWrap component="div" sx={{ textAlign: 'left' }}>
                {studygroupData.studygroupByStudyGroupId.studyGroupName}
              </Typography>
              <Button
                variant="contained"
                startIcon={<CreateIcon />}
                color="primary"
                sx={{
                  textTransform: 'none',
                  ml: 'auto',
                  mt: 'auto',
                }}
                size="small"
                onClick={handleEditOpen}
              >
                Rediger
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={editOpen}
                onClose={handleEditClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={editOpen}>
                  <Box sx={style(isDarkmode)}>
                    <IconButton
                      onClick={() => {
                        handleEditClose();
                      }}
                      size="small"
                      sx={{ position: 'absolute', top: '5px', right: '5px' }}
                    >
                      <CloseRoundedIcon
                        sx={{
                          color: isDarkmode ? NAV_COLORS.editor_modal_color_dark : NAV_COLORS.editor_modal_color,
                          fontSize: 'medium',
                        }}
                      />
                    </IconButton>
                    <Grid2 container direction="column" spacing={2}>
                      <Stack direction="row">
                        <Typography id="keep-mounted-modal-title" variant="h5" fontWeight="medium">
                          Rediger undervisningsgruppe
                        </Typography>
                      </Stack>
                      <Stack direction="row" gap={1}>
                        <TextField
                          id="keep-mounted-modal-title"
                          value={studygroupName}
                          label="Gruppenavn"
                          variant="outlined"
                          sx={{ width: 200 }}
                          size="small"
                          onChange={(e) => {
                            setStudygroupName(e.target.value);
                          }}
                        />
                        <FormControl sx={{ minWidth: 100 }} size="small">
                          <InputLabel id="select-small-course">Fag</InputLabel>
                          <Select
                            labelId="select-small-course"
                            id="select-small"
                            label="Course"
                            value={course}
                            onChange={handleChangeCourse}
                          >
                            {courseData.allCourses.nodes.map((course: course) => (
                              <MenuItem value={course.courseId}>{course.courseName}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                      <TextField
                        id="keep-mounted-modal-description"
                        multiline
                        rows={3}
                        sx={{ width: 400 }}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                      <Stack direction="row"></Stack>
                      <Button
                        variant="contained"
                        startIcon={<CreateIcon />}
                        sx={{
                          textTransform: 'none',
                          ml: 'auto',
                        }}
                        onClick={handleUpdate}
                        size="small"
                      >
                        Oppdater undervisningsgruppe
                      </Button>
                    </Grid2>
                  </Box>
                </Fade>
              </Modal>
            </Stack>
            <Stack direction="row" spacing={8} color={NAV_COLORS.text}>
              <Typography>{`Fag: ${studygroupData.studygroupByStudyGroupId.courseByCourseId.courseName}`}</Typography>
              <Typography>{`Lærer: ${studygroupData.studygroupByStudyGroupId.userByUserId.firstname} ${studygroupData.studygroupByStudyGroupId.userByUserId.lastname}`}</Typography>
              <Typography>{`E-post: ${studygroupData.studygroupByStudyGroupId.userByUserId.email}`}</Typography>
            </Stack>
            <Typography sx={{ textAlign: 'left', mb: 4 }} color={NAV_COLORS.text}>
              {studygroupData.studygroupByStudyGroupId.description}
            </Typography>
            <Stack direction="row">
              <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
                Kunngjøringer
              </Typography>
              <Button
                variant="contained"
                startIcon={<AnnouncementIcon />}
                sx={{
                  textTransform: 'none',
                  ml: 'auto',
                }}
                onClick={handleAnnouncementOpen}
                size="small"
              >
                Ny kunngjøring
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={announcementOpen}
                onClose={handleAnnouncementClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={announcementOpen}>
                  <Box sx={style(isDarkmode)}>
                    <IconButton
                      onClick={() => {
                        handleAnnouncementClose();
                      }}
                      size="small"
                      sx={{ position: 'absolute', top: '5px', right: '5px' }}
                    >
                      <CloseRoundedIcon
                        sx={{
                          color: isDarkmode ? NAV_COLORS.editor_modal_color_dark : NAV_COLORS.editor_modal_color,
                          fontSize: 'medium',
                        }}
                      />
                    </IconButton>
                    <Grid2 container direction="column" spacing={3}>
                      <Stack direction="row">
                        <Typography id="keep-mounted-modal-title" variant="h5" fontWeight="medium">
                          Ny kunngjøring
                        </Typography>
                      </Stack>
                      <TextField
                        id="keep-mounted-modal-title"
                        label="Tittel"
                        variant="outlined"
                        size="small"
                        sx={{ width: '14vw' }}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                      <TextField
                        id="keep-mounted-modal-description"
                        label="Innhold"
                        multiline
                        rows={8}
                        sx={{ width: 400 }}
                        onChange={(e) => {
                          setContent(e.target.value);
                        }}
                      />
                      <Stack direction="row">
                        <Button
                          variant="contained"
                          startIcon={<PostAddIcon />}
                          sx={{
                            textTransform: 'none',
                            ml: 'auto',
                          }}
                          onClick={handleCreate}
                          size="small"
                        >
                          Publiser
                        </Button>
                      </Stack>
                    </Grid2>
                  </Box>
                </Fade>
              </Modal>
            </Stack>
            <Announcements rows={getAllAnnouncements()} />
            <Grid2 container spacing={2} direction="column">
              <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
                Utdelte oppgaver
              </Typography>
            </Grid2>
            <Table rows={getGivenRecommendeds()} columns={columns} selectable />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
