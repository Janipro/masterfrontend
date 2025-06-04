import { Box, Container, CssBaseline, Fade, Grid2, List, ListItem, Stack, Typography } from '@mui/material';
import Table from '../../components/Table';
import { NAV_COLORS } from '../../types/navColors';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { renderRequirement } from '../../components/renderRequirement';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Requirement from '../../components/Requirement';
import { colorMapping } from '../../types/requirementData';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const rows = [
  {
    id: 1,
    title: 'Chicken Nuggets',
    requirement: ['for-loop', 'if-statement'],
    level: 'VG1',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '14.02.2025 13:00',
    status: 'Uncomplete',
  },
  {
    id: 2,
    title: 'Peter Griffith',
    requirement: ['for-loop'],
    level: '10',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '14.02.2025 13:00',
    status: 'Uncomplete',
  },
  {
    id: 3,
    title: 'Peter Griffin',
    requirement: ['for-loop', 'while-loop'],
    level: '9',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '17.02.2025 13:00',
    status: 'Uncomplete',
  },
  {
    id: 4,
    title: 'Peter Grizzler',
    requirement: ['if-statement'],
    level: '9',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '15.02.2025 15:00',
    status: 'Uncomplete',
  },
  {
    id: 5,
    title: 'Peter Nuggets',
    requirement: ['if-statement', 'while-loop'],
    level: '8',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
    status: 'Uncomplete',
  },
  {
    id: 6,
    title: 'Peter Gooner',
    requirement: ['for-loop', 'if-statement'],
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
    valueGetter: (_, row) =>
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

const chartSetting = {
  width: 800,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const dataset = [
  {
    'if-statement': 13,
    'for-loop': 18,
    'while-loop': 8,
    inheritance: 4,
    description: 'R1 - klasse 1',
  },
  {
    'if-statement': 2,
    'for-loop': 19,
    'while-loop': 8,
    inheritance: 11,
    description: 'IT1 - klasse 2',
  },
];

export default function StudentStatistics() {
  return (
    <Fade in timeout={500}>
      <Box>
        <CssBaseline />
        <Container component={'main'} sx={{ bgcolor: 'background.default' }}>
          <Grid2 direction="column" container spacing={2} mt={10}>
            <Typography variant="h4" noWrap component="div" sx={{ textAlign: 'left' }}>
              Elise Goland
            </Typography>
            <Grid2 container direction="row">
              <Stack direction="column" spacing={1} mb={4} color={NAV_COLORS.text} textAlign="left">
                <Typography>Klasse: 1STA</Typography>
                <Typography>Trinn: VG1</Typography>
                <Typography>Skole: Nydalen Vgs</Typography>
                <Typography>E-post: elise.goland@ofk.no</Typography>
              </Stack>
              <Stack direction="column" spacing={1} ml={12} color={NAV_COLORS.text} textAlign="left">
                <Typography>Undervisningsgrupper:</Typography>
                <Typography>R1 - klasse 1</Typography>
                <Typography>IT1 - klasse 2</Typography>
              </Stack>
            </Grid2>
            <Grid2 container direction="row">
              <Stack direction="column">
                <Typography typography="h6" noWrap component="div">
                  Forbedringsområder
                </Typography>
                <Grid2 container sx={{ justifyContent: 'center', alignItems: 'center' }}>
                  <List dense sx={{ listStyle: 'decimal', pl: 4 }}>
                    <ListItem sx={{ display: 'list-item' }}>
                      <Requirement value="for-loop" size="small" />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                      <Requirement value="if-statement" size="small" />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                      <Requirement value="while-loop" size="small" />
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                      <Requirement value="inheritance" size="small" />
                    </ListItem>
                  </List>
                </Grid2>
              </Stack>
              <Stack direction="column">
                <Typography typography="h6" noWrap component="div">
                  Hint brukt i hver undervisningsgruppe
                </Typography>
                <Grid2 container direction={'row'} spacing={2} sx={{ p: 1, maxWidth: 800 }}>
                  <BarChart
                    dataset={dataset}
                    xAxis={[{ scaleType: 'band', dataKey: 'description' }]}
                    series={[
                      { dataKey: 'if-statement', label: 'if-setning' },
                      { dataKey: 'for-loop', label: 'for-løkke' },
                      { dataKey: 'while-loop', label: 'while-løkke' },
                      { dataKey: 'inheritance', label: 'arv' },
                    ]}
                    colors={[
                      colorMapping['if-statement'],
                      colorMapping['for-loop'],
                      colorMapping['while-loop'],
                      colorMapping.inheritance,
                    ]}
                    grid={{ vertical: false, horizontal: true }}
                    {...chartSetting}
                  />
                </Grid2>
              </Stack>
            </Grid2>
            <Grid2 container spacing={2} direction="column">
              <Typography variant="h5" noWrap component="div" sx={{ textAlign: 'left' }}>
                Mine oppgaver
              </Typography>
            </Grid2>
            <Table rows={rows} columns={columns} selectable={false} />
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
