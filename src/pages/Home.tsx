import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <Box>
      <NavBar isEditor={false} />
      <Dashboard />
    </Box>
  );
}
