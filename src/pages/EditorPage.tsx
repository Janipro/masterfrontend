import { Box } from '@mui/material';
import EditorContent from '../components/EditorContent';
import NavBar from '../components/NavBar';

export default function EditorPage() {
  return (
    <Box>
      <NavBar isEditor />
      <EditorContent />
    </Box>
  );
}
