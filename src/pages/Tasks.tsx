import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import StudentTasks from '../components/student/StudentTasks';
import TeacherTasks from '../components/teacher/TeacherTasks';
import useTeacherStore from '../stores/useTeacherStore';

export default function Tasks() {
  const { isTeacher } = useTeacherStore();
  return (
    <Box>
      <NavBar />
      {isTeacher ? <TeacherTasks /> : <StudentTasks />}
    </Box>
  );
}
