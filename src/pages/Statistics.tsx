import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import StudentStatistics from '../components/student/StudentStatistics';
import TeacherStatistics from '../components/teacher/TeacherStatistics';

export default function Class() {
  const isTeacher = localStorage.getItem('is_admin');
  return (
    <Box>
      <NavBar />
      {isTeacher ? <TeacherStatistics /> : <StudentStatistics />}
    </Box>
  );
}
