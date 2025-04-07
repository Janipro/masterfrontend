import { Box, Paper } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { nbNO } from '@mui/x-data-grid/locales/nbNO';
import { useMemo, useState } from 'react';
import { task, student, recommended, recommendedStudent } from '../types/tableProps';
import useTeacherStore from '../stores/useTeacherStore';
import { useTaskCodeStore } from '../stores/useTaskCodeStore';
import { useNavigate } from 'react-router-dom';

const paginationModel = { page: 0, pageSize: 5 };

export default function Table({
  rows,
  selectable,
  columns,
  selectionModel,
  setSelectionModel,
}: {
  rows: task[] | student[] | recommended[] | recommendedStudent[];
  selectable: boolean;
  columns: GridColDef[];
  selectionModel?: GridRowSelectionModel;
  setSelectionModel?: (updateSelectedState: GridRowSelectionModel) => void;
}) {
  type Row = (typeof rows)[number];
  const [initialRows /*, setRows*/] = useState<Row[]>(rows);
  const { isTeacher, setIsOwner } = useTeacherStore();
  const { setTaskId } = useTaskCodeStore();
  const navigate = useNavigate();

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
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          rowSelectionModel={selectionModel}
          onCellClick={(params: GridCellParams) => {
            const hasTaskId = (rows: unknown[]): boolean => {
              const first = rows[0];
              return typeof first === 'object' && first !== null && 'taskId' in first;
            };

            if (hasTaskId(initialRows)) {
              if (params.field === 'title') {
                setTaskId(params.row.taskId);
                const email = localStorage.getItem('email') || '';
                setIsOwner(params.row.owner.toLowerCase() === email.toLowerCase()); //should probably compare user ids instead, but all the tables only has owner (email) atm
                navigate('/playground');
              }
            }
          }}
        />
      </Paper>
    </Box>
  );
}
