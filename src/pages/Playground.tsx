import { useEffect } from 'react';
import { Box } from '@mui/material';
import PlaygroundContent from '../components/PlaygroundContent';
import NavBarEditor from '../components/NavBarEditor';
import useTeacherStore from '../stores/useTeacherStore';
import TeacherPlaygroundContent from '../components/teacher/TeacherPlaygroundContent';
import { useTaskCodeStore } from '../stores/useTaskCodeStore';

export default function EditorPage() {
  const { isTeacher, isOwner } = useTeacherStore();
  const { selectedTaskId } = useTaskCodeStore();

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
