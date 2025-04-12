import TextField from '@mui/material/TextField';
import { useNewTaskStore } from '../../stores/useTaskCodeStore';
import useDarkmodeEditorStore from '../../stores/useDarkmodeEditorStore';
import { NAV_COLORS } from '../../types/navColors';

const TeacherPlaygroundTitleField = () => {
  const { newTitle, setNewTitle } = useNewTaskStore();
  const { isDarkmodeEditor } = useDarkmodeEditorStore();

  return (
    <TextField
      fullWidth
      size="small"
      margin="none"
      variant="outlined"
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      helperText={`${newTitle?.length}/100`}
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
      sx={{
        '& .MuiFormHelperText-root': {
          color: isDarkmodeEditor ? 'rgba(255, 255, 255, 0.7) !important' : 'rgba(0, 0, 0, 0.6) !important',
        },
        ' .MuiOutlinedInput-input': {
          color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
        },
      }}
    />
  );
};
export default TeacherPlaygroundTitleField;
