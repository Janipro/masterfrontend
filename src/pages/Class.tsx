import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import useTeacherStore from '../stores/useOwnerStore';
import StudentClass from '../components/student/StudentClass';
import TeacherClass from '../components/teacher/TeacherClass';

export default function Class() {
  const { isTeacher } = useTeacherStore();
  return (
    <Box>
      <NavBar />
      {isTeacher ? <TeacherClass /> : <StudentClass />}
    </Box>
  );
}
