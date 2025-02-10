import { Paper } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { nbNO } from '@mui/x-data-grid/locales/nbNO';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useCallback, useState } from 'react';

const initialRows = [
  {
    id: 1,
    title: 'Chicken Nuggets',
    requirement: 'for-løkke',
    level: 'VG1',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '14.02.2025 13:00',
    status: 'Uncomplete',
  },
  {
    id: 2,
    title: 'Peter Griffith',
    requirement: 'if-setning',
    level: '10',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '14.02.2025 13:00',
    status: 'Uncomplete',
  },
  {
    id: 3,
    title: 'Peter Griffin',
    requirement: 'while-løkke',
    level: '9',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '17.02.2025 13:00',
    status: 'Uncomplete',
  },
  {
    id: 4,
    title: 'Peter Grizzler',
    requirement: 'for-løkke',
    level: '9',
    course: 'Matematikk',
    type: 'Obligatorisk',
    due: '15.02.2025 15:00',
    status: 'Uncomplete',
  },
  {
    id: 5,
    title: 'Peter Nuggets',
    requirement: 'if-setning',
    level: '8',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
    status: 'Uncomplete',
  },
  {
    id: 6,
    title: 'Peter Gooner',
    requirement: 'if-setning',
    level: '8',
    course: 'Matematikk',
    type: 'Anbefalt',
    due: '14.02.2025 14:00',
    status: 'Uncomplete',
  },
];

const paginationModel = { page: 0, pageSize: 5 };
type Row = (typeof initialRows)[number];

export default function Table() {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const toggleStatus = useCallback(
    (id: GridRowId, status: string) => () => {
      setRows((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, status: status } : row)));
      console.log(id, status);
    },
    []
  );
  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Tittel', width: 220 },
    { field: 'requirement', headerName: 'Krav', width: 220 },
    { field: 'level', headerName: 'Nivå', width: 60 },
    { field: 'course', headerName: 'Fag', width: 100 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'due', headerName: 'Frist', width: 140 },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      headerName: 'Status',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<CheckBoxIcon sx={{ color: '#4CCC17' }} />}
          label="Fullført"
          onClick={toggleStatus(params.id, 'Complete')}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<IndeterminateCheckBoxIcon sx={{ color: '#FCD703' }} />}
          label="Underveis"
          onClick={toggleStatus(params.id, 'Underway')}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<CheckBoxOutlineBlankIcon />}
          label="Ikke fullført"
          onClick={toggleStatus(params.id, 'Uncomplete')}
          showInMenu
        />,
      ],
    },
  ];

  return (
    <>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          localeText={nbNO.components.MuiDataGrid.defaultProps.localeText}
        />
      </Paper>
    </>
  );
}
