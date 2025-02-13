import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import StudentTasks from '../components/StudentTasks';
import TeacherTasks from '../components/TeacherTasks';
import useTeacherStore from '../stores/useTeacherStore';

export default function Tasks() {
  const { isTeacher } = useTeacherStore();
  return (
    <Box>
      <NavBar isEditor={false} />
      {isTeacher ? <TeacherTasks /> : <StudentTasks />}
    </Box>
  );
}
