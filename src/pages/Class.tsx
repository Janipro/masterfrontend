import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import ClassContent from '../components/ClassContent';

export default function Class() {
  return (
    <Box>
      <NavBar isEditor={false} />
      <ClassContent />
    </Box>
  );
}
