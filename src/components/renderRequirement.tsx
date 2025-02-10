import Requirement from './Requirement';
import { GridRenderCellParams } from '@mui/x-data-grid';

export function renderRequirement(params: GridRenderCellParams<{ title: string; requirement: string[] }>) {
  if (params.value == null) {
    return '';
  }

  return (
    <>
      {params.value.requirement.map((item: string) => (
        <Requirement value={item} size="small" />
      ))}
    </>
  );
}
