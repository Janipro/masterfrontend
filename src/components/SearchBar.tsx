import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { tableProps } from '../types/tableProps';

export default function SearchBar({ options }: { options: tableProps[] }) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Søk etter oppgave" />}
      getOptionLabel={(option: tableProps) => option.title}
    />
  );
}
