import { useEffect } from 'react';
import { Box } from '@mui/material';
import PlaygroundContent from '../components/PlaygroundContent';
import NavBarEditor from '../components/NavBarEditor';

export default function EditorPage() {
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
      <PlaygroundContent />
    </Box>
  );
}
