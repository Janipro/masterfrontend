import { Box } from '@mui/material';
import PlaygroundContent from '../components/PlaygroundContent';
import NavBar from '../components/NavBar';

export default function EditorPage() {
  return (
    <Box>
      <NavBar isEditor />
      <PlaygroundContent />
    </Box>
  );
}
