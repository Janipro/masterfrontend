import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import CodeIcon from '@mui/icons-material/Code';
import Editor from './Editor';
import { Container, Stack } from '@mui/material';

export default function PlaygroundContent() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Container sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
            textAlign: 'left',
          }}
        >
          <Typography
            sx={{
              border: '1px solid #3f3f3f',
            }}
          >
            <Stack direction="row" gap={0.5} bgcolor={'#EDEBEB'}>
              <CodeIcon sx={{ color: '#4CCC17' }} />
              <Typography>Python Kode</Typography>
            </Stack>
            <Editor />
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
