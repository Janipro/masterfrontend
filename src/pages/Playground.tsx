import { useEffect } from 'react';
import { Box } from '@mui/material';
import PlaygroundContent from '../components/PlaygroundContent';
import NavBarEditor from '../components/NavBarEditor';
import useOwnerStore from '../stores/useOwnerStore';
import TeacherPlaygroundContent from './teacher/TeacherPlayGroundContent';
import { useTaskCodeStore } from '../stores/useTaskCodeStore';

export default function EditorPage() {
  const { isOwner } = useOwnerStore();
  const { selectedTaskId } = useTaskCodeStore();
  const isTeacher = localStorage.getItem('is_admin') == 'true';

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
      {isTeacher && (isOwner || selectedTaskId === null) ? <TeacherPlaygroundContent /> : <PlaygroundContent />}
    </Box>
  );
}
