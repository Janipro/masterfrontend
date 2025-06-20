/*
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { tableProps } from '../types/tableProps';

export default function SearchBar({ options, prompt }: { options: tableProps[]; prompt: string }) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={prompt} />}
      getOptionLabel={(option: tableProps) => option.title}
      size="small"
    />
  );
}
*/

// Commented out because it triggers the error that tableProps is not a type. Searchbar is not currently in use.
