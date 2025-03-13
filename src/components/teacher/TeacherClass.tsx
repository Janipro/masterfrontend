import {
  Backdrop,
  Box,
  Button,
  Container,
  CssBaseline,
  Fade,
  Grid2,
  Modal,
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
import { announcement, task, taskRequirement } from '../../types/tableProps';
import { useMutation, useQuery } from '@apollo/client';
import { GET_GIVEN_TASKS } from '../../../graphql/queries/getGivenTasks';
import { GET_ALL_ANNOUNCEMENTS } from '../../../graphql/queries/getAllAnnouncements';
import { CREATE_ANNOUNCEMENT } from '../../../graphql/mutations/createAnnouncement';

export default function TeacherClass() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { loading: taskLoading, error, data: taskData } = useQuery(GET_GIVEN_TASKS, { variables: { userId: 2 } });
  const { loading: announcementLoading, data: announcementData } = useQuery(GET_ALL_ANNOUNCEMENTS, {
    variables: { studyGroupId: 1 },
  });
  const [createAnnouncement] = useMutation(CREATE_ANNOUNCEMENT, {
    refetchQueries: [{ query: GET_ALL_ANNOUNCEMENTS, variables: { studyGroupId: 1 } }],
  });

  if (taskLoading || announcementLoading) {
    return (
      <Box mt="30vh">
        <p> Laster inn... </p>
      </Box>
    );
  }

  if (error) {
    console.log('could not load from db');
  }
  const getGivenTasks = (): task[] => {
    return taskData.allTasks.nodes.map((task: task) => ({
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
          userId: 2,
          title: title,
          content: content,
          datePublished: new Date(),
          studyGroupId: 1,
        },
      });
      handleClose();
    } catch (error) {
      console.log('Error creating announcement: ', error);
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
                R1 - Leksehjelp
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
              >
                Rediger
              </Button>
            </Stack>
            <Stack direction="row" spacing={8} mb={4} color={NAV_COLORS.text}>
              <Typography>Fag: R1</Typography>
              <Typography>Lærer: Petter Swemann</Typography>
              <Typography>E-post: Petter.swemann@stovgs.no</Typography>
            </Stack>

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
                onClick={handleOpen}
                size="small"
              >
                Ny kunngjøring
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
            <Table rows={getGivenTasks()} columns={columns} selectable />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
