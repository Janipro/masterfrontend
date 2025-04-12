import { Box, Paper } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { nbNO } from '@mui/x-data-grid/locales/nbNO';
import { useMemo, useState } from 'react';
import useOwnerStore from '../stores/useOwnerStore';
import { useCodeStore, useTaskCodeStore } from '../stores/useTaskCodeStore';
import { useNavigate } from 'react-router-dom';
import { task, student, recommended, recommendedStudent, studygroup } from '../types/tableProps';

const paginationModel = { page: 0, pageSize: 10 };

export default function Table({
  rows,
  selectable,
  columns,
  selectionModel,
  setSelectionModel,
}: {
  rows: task[] | student[] | recommended[] | recommendedStudent[] | studygroup[];
  selectable: boolean;
  columns: GridColDef[];
  selectionModel?: GridRowSelectionModel;
  setSelectionModel?: (updateSelectedState: GridRowSelectionModel) => void;
}) {
  type Row = (typeof rows)[number];
  const [initialRows /*, setRows*/] = useState<Row[]>(rows);
  const { setIsOwner } = useOwnerStore();
  const isTeacher = localStorage.getItem('is_admin') == 'true';
  const { setTaskId, selectedTaskId } = useTaskCodeStore();
  const { setCode } = useCodeStore();
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
          pageSizeOptions={[5, 10, 20]}
          sx={{ border: 0 }}
          localeText={nbNO.components.MuiDataGrid.defaultProps.localeText}
          checkboxSelection={selectable}
          columnVisibilityModel={columnVisibilityModel}
          density="compact"
          onRowSelectionModelChange={(newSelectionModel) => {
            if (setSelectionModel) {
              setSelectionModel(newSelectionModel);
            }
          }}
          rowSelectionModel={selectionModel}
          onCellClick={(params: GridCellParams) => {
            const hasTaskId = (rows: unknown[]): boolean => {
              const first = rows[0];
              return typeof first === 'object' && first !== null && 'taskId' in first;
            };

            if (hasTaskId(initialRows)) {
              console.log('it has taskid');
              if (params.field === 'title') {
                console.log('clicked on tht title');
                if (params.row.taskId !== selectedTaskId) {
                  console.log('not same taskid');
                  console.log(params.row.taskId);
                  setTaskId(params.row.taskId);
                  setCode('');
                }
                console.log('last stsep');

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
