import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import useTeacherStore from '../stores/useOwnerStore';
import StudentStatistics from '../components/student/StudentStatistics';
import TeacherStatistics from '../components/teacher/TeacherStatistics';

export default function Class() {
  const { isTeacher } = useTeacherStore();
  return (
    <Box>
      <NavBar />
      {isTeacher ? <TeacherStatistics /> : <StudentStatistics />}
    </Box>
  );
}
