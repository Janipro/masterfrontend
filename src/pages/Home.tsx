import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import StudentDashboard from './student/StudentDashboard';
import TeacherDashboard from './teacher/TeacherDashboard';

export default function Home() {
  const isTeacher = localStorage.getItem('is_admin') == 'true';
  return (
    <Box>
      <NavBar />
      {isTeacher ? <TeacherDashboard /> : <StudentDashboard />}
    </Box>
  );
}
