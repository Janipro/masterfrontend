import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import StudentClasses from '../components/student/StudentClasses';
import TeacherClasses from '../components/teacher/TeacherClasses';

export default function Classes() {
  const isTeacher = localStorage.getItem('is_admin');
  return (
    <Box>
      <NavBar />
      {isTeacher ? <TeacherClasses /> : <StudentClasses />}
    </Box>
  );
}
