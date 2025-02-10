import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { orange, red } from '@mui/material/colors';
import CodeIcon from '@mui/icons-material/Code';
import Editor from './Editor';
import { Container, Stack } from '@mui/material';

const fakeData = {
  forLoop: orange,
  ifStatement: red,
};

export default function EditorContent() {
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
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                marginLeft: 2,
                backgroundColor: fakeData.forLoop[400],
                borderRadius: 2,
                padding: 0.25,
              }}
            >
              for-løkke
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                marginLeft: 2,
                backgroundColor: fakeData.ifStatement[400],
                borderRadius: 2,
                padding: 0.25,
              }}
            >
              if-setning
            </Typography>
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
