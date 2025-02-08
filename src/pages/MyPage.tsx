import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import MyPageContent from '../components/MyPageContent';

export default function MyPage() {
  return (
    <Box>
      <NavBar isEditor={false} />
      <MyPageContent />
    </Box>
  );
}
