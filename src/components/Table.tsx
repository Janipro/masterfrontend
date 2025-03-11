import { Box, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { nbNO } from '@mui/x-data-grid/locales/nbNO';
import { useMemo, useState } from 'react';
import { tableProps } from '../types/tableProps';
import useTeacherStore from '../stores/useTeacherStore';

const paginationModel = { page: 0, pageSize: 5 };

export default function Table({
  rows,
  selectable,
  columns,
}: {
  rows: tableProps[];
  selectable: boolean;
  columns: GridColDef[];
}) {
  type Row = (typeof rows)[number];
  const [initialRows /*, setRows*/] = useState<Row[]>(rows);
  const { isTeacher } = useTeacherStore();
  {
    /*const toggleStatus = useCallback(
    (id: GridRowId, status: string) => () => {
      setRows((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, status: status } : row)));
      console.log(id, status);
    },
    []
  );*/
  }

  const columnVisibilityModel = useMemo(() => {
    if (isTeacher) {
      return {
        assigned: true,
      };
    }
    return {
      assigned: false,
    };
  }, [isTeacher]);

  return (
    <Box>
      <Paper sx={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={initialRows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          localeText={nbNO.components.MuiDataGrid.defaultProps.localeText}
          checkboxSelection={selectable}
          columnVisibilityModel={columnVisibilityModel}
          density="compact"
        />
      </Paper>
    </Box>
  );
}
