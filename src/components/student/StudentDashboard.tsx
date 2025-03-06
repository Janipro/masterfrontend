import { Box, Container, CssBaseline, Fade, Grid2, List, ListItem, Typography } from '@mui/material';
import Table from '../Table';
import InfoCard from '../InfoCard';
import Calendar from '../Calendar';
import Requirement from '../Requirement';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { renderRequirement } from '../renderRequirement';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

const subjects = [1, 2, 3, 4, 5, 6];

const rows = [
  {
    id: 1,
    title: 'Chicken Nuggets',
    requirement: ['for-løkke', 'if-setning'],
    level: 'VG1',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '14.02.2025 13:00',
    status: 'Uncomplete',
  },
  {
    id: 2,
    title: 'Peter Griffith',
    requirement: ['for-løkke'],
    level: '10',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '14.02.2025 13:00',
    status: 'Uncomplete',
  },
  {
    id: 3,
    title: 'Peter Griffin',
    requirement: ['for-løkke', 'while-løkke'],
    level: '9',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '17.02.2025 13:00',
    status: 'Uncomplete',
  },
  {
    id: 4,
    title: 'Peter Grizzler',
    requirement: ['if-setning'],
    level: '9',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '15.02.2025 15:00',
    status: 'Uncomplete',
  },
  {
    id: 5,
    title: 'Peter Nuggets',
    requirement: ['if-setning', 'while-løkke'],
    level: '8',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
    status: 'Uncomplete',
  },
  {
    id: 6,
    title: 'Peter Gooner',
    requirement: ['for-løkke', 'if-setning'],
    level: '8',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
    status: 'Uncomplete',
  },
];

const columns: GridColDef[] = [
  { field: 'assigned', headerName: 'Tildelt', width: 100 },
  { field: 'title', headerName: 'Tittel', width: 220 },
  {
    field: 'requirement',
    display: 'flex',
    renderCell: renderRequirement,
    valueGetter: (value, row) =>
      row.title == null || row.requirement == null ? null : { title: row.title, requirement: row.requirement },
    filterable: false,
    headerName: 'Krav',
    width: 260,
  } as GridColDef<{ requirement: string[]; title: string }>,
  { field: 'level', headerName: 'Nivå', width: 60 },
  { field: 'course', headerName: 'Fag', width: 100 },
  { field: 'type', headerName: 'Type', width: 100 },
  { field: 'due', headerName: 'Frist', width: 140 },
  {
    field: 'actions',
    type: 'actions',
    width: 80,
    headerName: 'Status',
    getActions: () => [
      <GridActionsCellItem icon={<CheckBoxIcon sx={{ color: '#4CCC17' }} />} label="Fullført" showInMenu />,
      <GridActionsCellItem
        icon={<IndeterminateCheckBoxIcon sx={{ color: '#FCD703' }} />}
        label="Underveis"
        showInMenu
      />,
      <GridActionsCellItem icon={<CheckBoxOutlineBlankIcon />} label="Ikke fullført" showInMenu />,
    ],
  },
];

export default function StudentDashboard() {
  return (
    <Fade in timeout={500}>
      <Box>
        <CssBaseline />
        <Container component={'main'} sx={{ bgcolor: 'background.default' }}>
          <Grid2 sx={{ display: 'flex' }}>
            <Grid2
              component="main"
              sx={{
                flexGrow: 1,
                textAlign: 'left',
              }}
            >
              <Typography variant="h5" noWrap component="div" sx={{ mt: 10, ml: -3 }}>
                Mine fag
              </Typography>
              <Grid2 container direction={'row'} spacing={2} sx={{ m: 2, p: 1, maxWidth: 600 }}>
                {subjects.map(() => (
                  <InfoCard />
                ))}
              </Grid2>
            </Grid2>
            <Grid2
              component="main"
              sx={{
                flexGrow: 1,
                mt: 10,
              }}
            >
              <Typography variant="h5" noWrap component="div">
                Progresjon
              </Typography>
              <Grid2 container sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <List dense sx={{ listStyle: 'decimal', pl: 4 }}>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Requirement value="for-løkke" size="small" />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Requirement value="if-setning" size="small" />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>
                    <Requirement value="while-løkke" size="small" />
                  </ListItem>
                </List>
              </Grid2>
              <Calendar />
            </Grid2>
          </Grid2>
          <Grid2
            component="main"
            sx={{
              flexGrow: 1,
              textAlign: 'left',
              mt: -4,
            }}
          >
            <Typography variant="h5" noWrap component="div" sx={{ mb: 0.5 }}>
              Anbefalte oppgaver
            </Typography>
            <Table rows={rows} columns={columns} selectable={false} />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
