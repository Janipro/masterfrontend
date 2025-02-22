import {
  Box,
  Container,
  CssBaseline,
  Fade,
  Grid2,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { TYPE_COLORS } from '../types/typeColors';
import { NAV_COLORS } from '../types/navColors';

const chartSetting = {
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: NAV_COLORS.background,
    color: NAV_COLORS.text,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const dataset = [
  {
    'if-statement': 13,
    'for-loop': 18,
    'while-loop': 8,
    inheritance: 4,
    description: 'Vanlige feil',
  },
];

function createData(student: string) {
  return { student };
}

const rows = [
  createData('Martin Stokke'),
  createData('Petter Pettersen'),
  createData('Petter Pettersen'),
  createData('Petter Pettersen'),
];

export default function StudentStatistics() {
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
                Statistikk
              </Typography>
              <Grid2 container direction={'row'} spacing={2} sx={{ m: 2, p: 1, maxWidth: 600 }}>
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
                    TYPE_COLORS['if-statement'],
                    TYPE_COLORS['for-loop'],
                    TYPE_COLORS['while-loop'],
                    TYPE_COLORS.inheritance,
                  ]}
                  grid={{ vertical: false }}
                  {...chartSetting}
                />
              </Grid2>
            </Grid2>
            <Grid2
              component="main"
              sx={{
                flexGrow: 1,
                mt: 10,
              }}
            >
              <Typography variant="h6" noWrap component="div">
                Følgende elever vises
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 200 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Elev</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.student}>
                        <StyledTableCell component="th" scope="row">
                          {row.student}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </Fade>
  );
}
