import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CodeIcon from '@mui/icons-material/Code';
import Editor from './Editor';
import { Container, Stack } from '@mui/material';
import Requirement from './Requirement';

export default function SelectedTask() {
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
            border: '1px solid black',
            borderRadius: 2,
          }}
        >
          <Toolbar>
            <Typography variant="h5" noWrap component="div">
              Oppgave 1
            </Typography>
            <Requirement value="for-løkke" size="large" />
            <Requirement value="if-setning" size="large" />
          </Toolbar>
          <Typography sx={{ marginBottom: 2 }}>Oppgavetekst til opppgave 1</Typography>
        </Box>
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
