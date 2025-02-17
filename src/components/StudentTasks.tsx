import { Box, Container, CssBaseline, Fade, Grid2, Typography } from '@mui/material';
import Table from './Table';
import SearchBar from './SearchBar';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { renderRequirement } from './renderRequirement';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

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
  { field: 'title', headerName: 'Tittel', width: 240 },
  {
    field: 'requirement',
    display: 'flex',
    renderCell: renderRequirement,
    valueGetter: (value, row) =>
      row.title == null || row.requirement == null ? null : { title: row.title, requirement: row.requirement },
    filterable: false,
    headerName: 'Krav',
    width: 240,
  } as GridColDef<{ requirement: string[]; title: string }>,
  { field: 'level', headerName: 'Nivå', width: 60 },
  { field: 'course', headerName: 'Fag', width: 120 },
  { field: 'type', headerName: 'Type', width: 120 },
  { field: 'due', headerName: 'Frist', width: 160 },
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

const columns2: GridColDef[] = [
  { field: 'assigned', headerName: 'Tildelt', width: 100 },
  { field: 'title', headerName: 'Tittel', width: 320 },
  {
    field: 'requirement',
    display: 'flex',
    renderCell: renderRequirement,
    valueGetter: (value, row) =>
      row.title == null || row.requirement == null ? null : { title: row.title, requirement: row.requirement },
    filterable: false,
    headerName: 'Krav',
    width: 320,
  } as GridColDef<{ requirement: string[]; title: string }>,
  { field: 'level', headerName: 'Nivå', width: 60 },
  { field: 'course', headerName: 'Fag', width: 140 },
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

export default function StudentTasks() {
  return (
    <Fade in timeout={500}>
      <Box>
        <CssBaseline />
        <Container component={'main'} sx={{ bgcolor: 'background.default' }}>
          <Grid2 direction="column" container spacing={2} mt={10}>
            <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
              Anbefalte oppgaver
            </Typography>
            <Table rows={rows} columns={columns} selectable={false} />

            <Grid2 container spacing={2} direction="column">
              <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
                Alle oppgaver
              </Typography>
              <SearchBar options={rows} prompt="Søk etter oppgaver" />
            </Grid2>
            <Table rows={rows} columns={columns2} selectable={false} />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
