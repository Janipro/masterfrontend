import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import StudentStatistics from './student/StudentStatistics';
import TeacherStatistics from './teacher/TeacherStatistics';

export default function Class() {
  const isTeacher = localStorage.getItem('is_admin') == 'true';
  return (
    <Box>
      <NavBar />
      {isTeacher ? <TeacherStatistics /> : <StudentStatistics />}
    </Box>
  );
}
