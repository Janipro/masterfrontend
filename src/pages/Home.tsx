import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import StudentDashboard from '../components/StudentDashboard';
import TeacherDashboard from '../components/TeacherDashboard';

export default function Home() {
  const isStudent = false;
  return (
    <Box>
      <NavBar isEditor={false} />
      {isStudent ? <StudentDashboard /> : <TeacherDashboard />}
    </Box>
  );
}
