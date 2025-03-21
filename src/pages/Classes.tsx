import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import useTeacherStore from '../stores/useTeacherStore';
import StudentClasses from '../components/student/StudentClasses';
import TeacherClasses from '../components/teacher/TeacherClasses';

export default function Classes() {
  const { isTeacher } = useTeacherStore();
  return (
    <Box>
      <NavBar isEditor={false} />
      {isTeacher ? <TeacherClasses /> : <StudentClasses />}
    </Box>
  );
}
