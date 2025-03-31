import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Fade,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid2,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CreateIcon from '@mui/icons-material/Create';
import Table from '../Table';
import InfoCard from '../InfoCard';
import { useState } from 'react';
import { style } from '../../types/navColors';
import { columns, columns3 } from '../../types/userData';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_COURSES } from '../../../graphql/queries/getAllCourses';
import { GET_ALL_STUDENTS } from '../../../graphql/queries/getAllStudents';
import { GET_ALL_STUDY_GROUPS } from '../../../graphql/queries/getAllStudygroups';
import { GET_ALL_ACTIVE_STUDY_GROUPS } from '../../../graphql/queries/getAllActiveStudygroups';
import { CREATE_STUDY_GROUP } from '../../../graphql/mutations/createStudygroup';
import { CREATE_ENROLMENT } from '../../../graphql/mutations/createEnrolment';
import { UPDATE_RECOMMENDED_VISIBILITY } from '../../../graphql/mutations/updateRecommendedVisibility';
import { DELETE_RECOMMENDED_BY_RECOMMENDED_ID } from '../../../graphql/mutations/deleteRecommendedByRecommendedId';
import { course, recommended, student, studygroup, taskRequirement, user } from '../../types/tableProps';
import useSelectedStore from '../../stores/useSelectedStore';
import { useStore } from 'zustand';
import { GET_RECOMMENDEDS } from '../../../graphql/queries/getRecommendeds';
import { GET_ACTIVE_RECOMMENDEDS } from '../../../graphql/queries/getActiveRecommendeds';
import { classTranslations, typeTranslations } from '../../types/translations';

export default function TeacherDashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [course, setCourse] = useState('');
  const [inactiveTasks, setInactiveTasks] = useState(false);
  const [inactiveStudygroups, setInactiveStudygroups] = useState(false);
  const [description, setDescription] = useState('');
  const [studygroupName, setStudygroupName] = useState('');
  const userId = parseInt(localStorage.getItem('id')!);
  const schoolId = parseInt(localStorage.getItem('school_id')!);
  const classId = parseInt(localStorage.getItem('class_id')!);
  const { studentSelectionModel, setStudentSelectionModel } = useStore(useSelectedStore);
  const { recommendedSelectionModel, setRecommendedSelectionModel } = useStore(useSelectedStore);

  const handleChangeCourse = (event: SelectChangeEvent) => {
    setCourse(event.target.value);
  };

  const {
    loading: recommendedLoading,
    error,
    data: recommendedData,
  } = useQuery(GET_RECOMMENDEDS, { variables: { userId: userId } });
  const { loading: activeRecommendedLoading, data: activeRecommendedData } = useQuery(GET_ACTIVE_RECOMMENDEDS, {
    variables: { userId: userId },
  });
  const { loading: courseLoading, data: courseData } = useQuery(GET_ALL_COURSES);
  const { loading: activeStudygroupLoading, data: activeStudygroupData } = useQuery(GET_ALL_ACTIVE_STUDY_GROUPS, {
    variables: { userId: userId },
  });
  const { loading: studygroupLoading, data: studygroupData } = useQuery(GET_ALL_STUDY_GROUPS, {
    variables: { userId: userId },
  });
  const { loading: studentsLoading, data: studentsData } = useQuery(GET_ALL_STUDENTS, {
    variables: { classId: classId, schoolId: schoolId },
  });
  const [createStudygroup] = useMutation(CREATE_STUDY_GROUP, {
    refetchQueries: [{ query: GET_ALL_ACTIVE_STUDY_GROUPS, variables: { userId: userId } }],
  });
  const [createEnrolment] = useMutation(CREATE_ENROLMENT);
  const [updateRecommendedVisibility] = useMutation(UPDATE_RECOMMENDED_VISIBILITY, {
    refetchQueries: [
      { query: GET_RECOMMENDEDS, variables: { userId: userId } },
      { query: GET_ACTIVE_RECOMMENDEDS, variables: { userId: userId } },
    ],
  });
  const [deleteRecommendedByRecommendedId] = useMutation(DELETE_RECOMMENDED_BY_RECOMMENDED_ID, {
    refetchQueries: [
      { query: GET_RECOMMENDEDS, variables: { userId: userId } },
      { query: GET_ACTIVE_RECOMMENDEDS, variables: { userId: userId } },
    ],
  });

  if (
    recommendedLoading ||
    courseLoading ||
    activeStudygroupLoading ||
    studentsLoading ||
    studygroupLoading ||
    activeRecommendedLoading
  ) {
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
    }));
  };

  const getActiveGivenRecommendeds = (): recommended[] => {
    return activeRecommendedData.allRecommendeds.nodes.map((recommended: recommended) => ({
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
    }));
  };

  const handleCreate = async () => {
    try {
      const response = await createStudygroup({
        variables: {
          courseId: course,
          description: description,
          schoolId: schoolId,
          studyGroupName: studygroupName,
          userId: userId,
        },
      });
      const studyGroupId = response.data.createStudygroup.studygroup.studyGroupId;
      for (const studentId in studentSelectionModel) {
        await createEnrolment({
          variables: {
            studyGroupId: studyGroupId,
            userId: studentSelectionModel[studentId],
          },
        });
      }
      setStudentSelectionModel([]);
      handleClose();
    } catch (error) {
      console.log('Error creating studygroup: ', error);
    }
  };

  const getClass = (): student[] => {
    return studentsData.allUsers.nodes.map((student: user) => ({
      id: student.userId,
      title: `${student.firstname} ${student.lastname}`,
      level: student.classByClassId?.grade in classTranslations ? classTranslations[student.classByClassId?.grade] : 0,
      class: student.classByClassId?.className,
      school: student.schoolBySchoolId?.schoolName,
    }));
  };

  const handleVisibility = async (isActive: boolean) => {
    try {
      for (const recommendedId in recommendedSelectionModel) {
        await updateRecommendedVisibility({
          variables: {
            isActive: isActive,
            taskId: recommendedSelectionModel[recommendedId],
          },
        });
      }
      setRecommendedSelectionModel([]);
    } catch (error) {
      console.log('Could not update recommendation: ', error);
    }
  };

  const handleDelete = async () => {
    try {
      for (const recommendedId in recommendedSelectionModel) {
        await deleteRecommendedByRecommendedId({
          variables: {
            recommendedId: recommendedSelectionModel[recommendedId],
          },
        });
      }
      setRecommendedSelectionModel([]);
    } catch (error) {
      console.log('Could not delete recommendation: ', error);
    }
  };

  return (
    <Fade in timeout={500}>
      <Box component={'main'} sx={{ bgcolor: 'background.default' }}>
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
              <Grid2 container direction="row" mt={10}>
                <Typography variant="h5" noWrap component="div">
                  Mine undervisningsgrupper
                </Typography>
                <Stack direction="row" ml={'auto'} mt={'auto'} gap={1}>
                  <Button
                    variant="contained"
                    startIcon={<CreateIcon />}
                    color="primary"
                    sx={{ textTransform: 'none' }}
                    onClick={handleOpen}
                    size="small"
                  >
                    Opprett undervisningsgruppe
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
                        <Grid2 container direction="column" spacing={2}>
                          <Stack direction="row">
                            <Typography id="keep-mounted-modal-title" variant="h5" fontWeight="medium">
                              Ny undervisningsgruppe
                            </Typography>
                          </Stack>
                          <Stack direction="row" gap={1}>
                            <TextField
                              id="keep-mounted-modal-title"
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
                                value={course}
                                label="Course"
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
                            label="Kort beskrivelse av gruppen"
                            multiline
                            rows={3}
                            sx={{ width: 400 }}
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          />
                          <Stack direction="row"></Stack>
                          <Table rows={getClass()} columns={columns3} selectable />
                          <Button
                            variant="contained"
                            startIcon={<CreateIcon />}
                            sx={{
                              textTransform: 'none',
                              ml: 'auto',
                            }}
                            onClick={handleCreate}
                            size="small"
                          >
                            Opprett undervisningsgruppe
                          </Button>
                        </Grid2>
                      </Box>
                    </Fade>
                  </Modal>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={inactiveStudygroups}
                          onChange={() => setInactiveStudygroups(!inactiveStudygroups)}
                        />
                      }
                      label="Vis inaktive"
                    />
                  </FormGroup>
                </Stack>
              </Grid2>
              <Grid2 container direction={'row'} spacing={4} sx={{ m: 2, p: 1, maxWidth: 970 }}>
                {inactiveStudygroups
                  ? studygroupData.allStudygroups.nodes.map((studygroup: studygroup) => (
                      <InfoCard title={studygroup.studyGroupName} id={studygroup.studyGroupId} />
                    ))
                  : activeStudygroupData.allStudygroups.nodes.map((studygroup: studygroup) => (
                      <InfoCard title={studygroup.studyGroupName} id={studygroup.studyGroupId} />
                    ))}
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2
            component="main"
            sx={{
              flexGrow: 1,
              textAlign: 'left',
            }}
          >
            <Grid2 container direction="row" sx={{ mb: 0.5 }}>
              <Typography variant="h5" noWrap component="div">
                Utdelte oppgaver
              </Typography>
              <Grid2 container direction={'row'} sx={{ flexGrow: 0, ml: 'auto' }} spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<VisibilityIcon />}
                  sx={{ backgroundColor: '#EDEBEB', color: '#3F3F3F', textTransform: 'none' }}
                  disabled={recommendedSelectionModel.length === 0}
                  size="small"
                  onClick={() => handleVisibility(true)}
                >
                  Aktiver
                </Button>
                <Button
                  variant="contained"
                  startIcon={<VisibilityOffIcon />}
                  sx={{ backgroundColor: '#EDEBEB', color: '#3F3F3F', textTransform: 'none' }}
                  disabled={recommendedSelectionModel.length === 0}
                  size="small"
                  onClick={() => handleVisibility(false)}
                >
                  Deaktiver
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  sx={{ backgroundColor: '#EDEBEB', color: '#3F3F3F', textTransform: 'none' }}
                  disabled={recommendedSelectionModel.length === 0}
                  size="small"
                  onClick={handleDelete}
                >
                  Slett
                </Button>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={inactiveTasks}
                        onChange={() => setInactiveTasks(!inactiveTasks)}
                      />
                    }
                    label="Vis inaktive"
                  />
                </FormGroup>
              </Grid2>
            </Grid2>
            <Table
              rows={inactiveTasks ? getGivenRecommendeds() : getActiveGivenRecommendeds()}
              columns={columns}
              selectable
              key={inactiveTasks ? 'inactive' : 'active'}
              selectionModel={recommendedSelectionModel}
              setSelectionModel={setRecommendedSelectionModel}
            />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
