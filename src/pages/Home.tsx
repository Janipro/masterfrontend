import { Box } from '@mui/material';
import HomeContent from '../components/HomeContent';
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <Box>
      <NavBar isEditor />
      <HomeContent />
    </Box>
  );
}
