import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import StudentDashboard from '../components/StudentDashboard';
import TeacherDashboard from '../components/TeacherDashboard';
import useTeacherStore from '../stores/useTeacherStore';

export default function Home() {
  const { isTeacher } = useTeacherStore();
  return (
    <Box>
      <NavBar isEditor={false} />
      {isTeacher ? <TeacherDashboard /> : <StudentDashboard />}
    </Box>
  );
}
