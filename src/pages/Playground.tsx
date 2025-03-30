import { useEffect } from 'react';
import { Box } from '@mui/material';
import PlaygroundContent from '../components/PlaygroundContent';
import NavBarEditor from '../components/NavBarEditor';
import useTeacherStore from '../stores/useTeacherStore';
import TeacherPlayGroundContent from '../components/teacher/TeacherPlayGroundContent';

export default function EditorPage() {
  const { isTeacher } = useTeacherStore();

  useEffect(() => {
    const rootElement = document.getElementById('root');
    rootElement!.classList.add('full-width-root');

    return () => {
      rootElement!.classList.remove('full-width-root');
    };
  }, []);

  return (
    <Box>
      <NavBarEditor />
      {isTeacher ? <TeacherPlayGroundContent /> : <PlaygroundContent />}
    </Box>
  );
}
