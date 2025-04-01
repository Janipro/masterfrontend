import TextField from '@mui/material/TextField';
import { useNewTaskStore } from '../../stores/useTaskCodeStore';

const TeacherPlaygroundTitleField = () => {
  const { title, setTitle } = useNewTaskStore();

  return (
    <TextField
      fullWidth
      size="small"
      margin="none"
      variant="outlined"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      helperText={`${title.length}/100`}
      slotProps={{
        htmlInput: {
          maxLength: 100,
        },
        input: {
          sx: {
            fontWeight: 'medium',
            fontSize: '2em',
          },
        },
      }}
    />
  );
};
export default TeacherPlaygroundTitleField;
