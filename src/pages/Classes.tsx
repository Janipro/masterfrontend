import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import StudentClasses from './student/StudentClasses';
import TeacherClasses from './teacher/TeacherClasses';

export default function Classes() {
  const isTeacher = localStorage.getItem('is_admin') == 'true';
  return (
    <Box>
      <NavBar />
      {isTeacher ? <TeacherClasses /> : <StudentClasses />}
    </Box>
  );
}
