import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NAV_COLORS } from '../types/navColors';

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

function createData(title: string, content: string, date: string) {
  return { title, content, date };
}

const rows = [
  createData('Frozen yoghurt', 'Kjøp frozen yoghurt i dag', '20.02.2025 15:00'),
  createData('Ice cream sandwich', 'I love ice cream sandwich, sa Joe biden', '19.02.2025 17:30'),
  createData('Frozen yoghurt', 'Kjøp frozen yoghurt i dag', '20.02.2025 15:00'),
  createData('Ice cream sandwich', 'I love ice cream sandwich, sa Joe biden', '19.02.2025 17:30'),
];

export default function Announcements() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tittel</StyledTableCell>
            <StyledTableCell>Innhold</StyledTableCell>
            <StyledTableCell align="right">Dato</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.title}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell>{row.content}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
