import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import StudentTasks from './student/StudentTasks';
import TeacherTasks from './teacher/TeacherTasks';

export default function Tasks() {
  const isTeacher = localStorage.getItem('is_admin') == 'true';
  return (
    <Box>
      <NavBar />
      {isTeacher ? <TeacherTasks /> : <StudentTasks />}
    </Box>
  );
}
