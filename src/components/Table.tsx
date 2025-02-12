import { Paper } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import { nbNO } from '@mui/x-data-grid/locales/nbNO';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useCallback, useMemo, useState } from 'react';
import { renderRequirement } from './renderRequirement';

type tableProps = {
  id: number;
  title: string;
  requirement: string[];
  level: string;
  course: string;
  type: string;
  due: string;
  status: string;
  assigned?: string;
};

const paginationModel = { page: 0, pageSize: 5 };

export default function Table({ rows, selectable }: { rows: tableProps[]; selectable: boolean }) {
  type Row = (typeof rows)[number];
  const [initialRows, setRows] = useState<Row[]>(rows);
  const toggleStatus = useCallback(
    (id: GridRowId, status: string) => () => {
      setRows((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, status: status } : row)));
      console.log(id, status);
    },
    []
  );
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
      width: 220,
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

  const columnVisibilityModel = useMemo(() => {
    if (selectable) {
      return {
        assigned: true,
      };
    }
    return {
      assigned: false,
    };
  }, [selectable]);

  return (
    <>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={initialRows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          localeText={nbNO.components.MuiDataGrid.defaultProps.localeText}
          checkboxSelection={selectable}
          columnVisibilityModel={columnVisibilityModel}
        />
      </Paper>
    </>
  );
}
