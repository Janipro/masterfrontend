import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import useTeacherStore from '../stores/useTeacherStore';
import StudentClass from '../components/StudentClass';
import TeacherClass from '../components/TeacherClass';

export default function Class() {
  const { isTeacher } = useTeacherStore();
  return (
    <Box>
      <NavBar isEditor={false} />
      {isTeacher ? <TeacherClass /> : <StudentClass />}
    </Box>
  );
}
