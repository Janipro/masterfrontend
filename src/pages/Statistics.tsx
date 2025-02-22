import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import useTeacherStore from '../stores/useTeacherStore';
import StudentStatistics from '../components/StudentStatistics';

export default function Class() {
  const { isTeacher } = useTeacherStore();
  return (
    <Box>
      <NavBar isEditor={false} />
      {isTeacher ? <StudentStatistics /> : <StudentStatistics />}
    </Box>
  );
}
