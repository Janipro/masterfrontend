import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import StudentClass from '../components/student/StudentClass';
import TeacherClass from '../components/teacher/TeacherClass';

export default function Class() {
  const isTeacher = localStorage.getItem('is_admin') == 'true';
  return (
    <Box>
      <NavBar />
      {isTeacher ? <TeacherClass /> : <StudentClass />}
    </Box>
  );
}
