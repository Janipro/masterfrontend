import { Box, Container, CssBaseline, Grid2, List, ListItem, ListItemText, Typography } from '@mui/material';
import Table from './Table';
import InfoCard from './InfoCard';
import Calendar from './Calendar';
import { orange, red } from '@mui/material/colors';

const subjects = [1, 2, 3, 4, 5, 6];

export default function Dashboard() {
  return (
    <Box component={'main'} sx={{ bgcolor: 'background.default' }}>
      <CssBaseline />
      <Container sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            textAlign: 'left',
          }}
        >
          <Typography variant="h5" noWrap component="div" sx={{ mt: 10 }}>
            Mine fag
          </Typography>
          <Grid2 container direction={'row'} spacing={1} sx={{ m: 2, p: 1, maxWidth: 530 }}>
            {subjects.map(() => (
              <InfoCard />
            ))}
          </Grid2>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography variant="h5" noWrap component="div" sx={{ mt: 10 }}>
            Progresjon
          </Typography>
          <Grid2 container sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <List dense sx={{ listStyle: 'decimal', pl: 4 }}>
              <ListItem sx={{ display: 'list-item' }}>
                <ListItemText
                  primary="for-løkke"
                  sx={{
                    backgroundColor: orange[400],
                    borderRadius: 2,
                    padding: 0.25,
                  }}
                />
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <ListItemText
                  primary="if-setning"
                  sx={{
                    backgroundColor: red[400],
                    borderRadius: 2,
                    padding: 0.25,
                  }}
                />
              </ListItem>
            </List>
          </Grid2>
          <Calendar />
        </Box>
      </Container>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          textAlign: 'left',
        }}
      >
        <Typography variant="h5" noWrap component="div">
          Utvalgte oppgaver
        </Typography>
        <Table />
      </Box>
    </Box>
  );
}
