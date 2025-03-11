import { Box } from '@mui/material';
import Requirement from './Requirement';
import { GridRenderCellParams } from '@mui/x-data-grid';

export function renderRequirement(params: GridRenderCellParams<{ title: string; requirement: string[] }>) {
  if (params.value == null) {
    return '';
  }

  return (
    <Box
      sx={{
        typography: 'body2',
        fontFamily: 'inter',
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
        alignContent: 'normal',
        justifyContent: 'left',
        alignItems: 'center',
        gap: '5px',
      }}
    >
      {params.value.requirement.map((item: string) => (
        <Requirement value={item} size="x-small" />
      ))}
    </Box>
  );
}
