import { Button, Box, Typography } from '@mui/material';
import NavigationRoundedIcon from '@mui/icons-material/NavigationRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { NAV_COLORS } from '../types/navColors';
import useDarkmodeEditorStore from '../stores/useDarkmodeEditorStore';
import { useNewTaskStore, useTaskCodeStore } from '../stores/useTaskCodeStore';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK } from '../../graphql/mutations/updateTask';
import { GET_CREATED_TASKS } from '../../graphql/queries/getCreatedTasks';
import { GET_ACTIVE_CREATED_TASKS } from '../../graphql/queries/getActiveCreatedTasks';
import { GET_ALL_TASKS } from '../../graphql/queries/getAllTasks';
import { GET_RECOMMENDEDS } from '../../graphql/queries/getRecommendeds';
import { GET_ACTIVE_RECOMMENDEDS } from '../../graphql/queries/getActiveRecommendeds';
import { GET_TASK } from '../../graphql/queries/getTask';

const functions = ['Kjør', 'Publiser', 'Lagre endringer'];

export default function NavbarEditorCreateEditButtons() {
  const { executeCode, selectedTaskId } = useTaskCodeStore();
  const { isDarkmodeEditor } = useDarkmodeEditorStore();
  const { newTitle, newDescription, newPublicAccess } = useNewTaskStore();
  const userId = parseInt(localStorage.getItem('id')!);

  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [
      { query: GET_CREATED_TASKS, variables: { userId: userId } },
      { query: GET_ACTIVE_CREATED_TASKS, variables: { userId: userId } },
      { query: GET_RECOMMENDEDS, variables: { userId: userId } },
      { query: GET_ACTIVE_RECOMMENDEDS, variables: { userId: userId } },
      { query: GET_ALL_TASKS },
      { query: GET_TASK, variables: { taskId: selectedTaskId } },
    ],
  });

  const handleUpdateTask = async () => {
    try {
      await updateTask({
        variables: {
          taskId: selectedTaskId,
          taskName: newTitle,
          taskDescription: newDescription,
          publicAccess: newPublicAccess,
        },
      });
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mx: { xs: 0.95, sm: 2, md: 2, lg: 2, xl: 2 },
        alignItems: 'flex-end',
      }}
    >
      <Box
        sx={{
          my: 2,
          color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDarkmodeEditor
            ? NAV_COLORS.editor_button_background_dark
            : NAV_COLORS.editor_button_background,
          borderRadius: 20,
          mx: 0,
          textTransform: 'none',
          height: '50%',
          px: 0,
          minWidth: 'auto',
          width: 'fit-content',
          boxShadow: 2,
        }}
      >
        <Button
          onClick={executeCode}
          key={functions[0]}
          sx={{
            color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkmodeEditor
              ? NAV_COLORS.editor_button_background_dark
              : NAV_COLORS.editor_button_background,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            mx: 0,
            my: 0,
            textTransform: 'none',
            height: '100%',
            px: { xs: 1, sm: 1, md: 1, lg: 1.5, xl: 1.5 },
            minWidth: 'auto',
            width: 'fit-content',
          }}
        >
          <NavigationRoundedIcon
            sx={{
              mx: 0.2,
              fontSize: 'large',
              transform: 'rotate(90deg)',
              color: '#00D100',
            }}
          />
          <Typography
            sx={{
              display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
              color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
            }}
          >
            &nbsp;{functions[0]}
          </Typography>
        </Button>

        <Box
          sx={{
            my: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkmodeEditor
              ? NAV_COLORS.editor_button_background_dark
              : NAV_COLORS.editor_button_background,
            borderRadius: 0,
            mx: 0,
            height: '45%',
            padding: 0,
          }}
        >
          <Box
            sx={{
              display: 'block',
              width: '1.5px',
              height: '100%',
              backgroundColor: isDarkmodeEditor ? '#5E5E5E' : '#d7e1ed',
            }}
          ></Box>
        </Box>

        <Button
          key={selectedTaskId === null ? functions[1] : functions[2]}
          onClick={() => {
            if (selectedTaskId === null) {
              console.log('Publish not implemented');
            } else {
              console.log('ok');
              handleUpdateTask();
            }
          }}
          sx={{
            color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkmodeEditor
              ? NAV_COLORS.editor_button_background_dark
              : NAV_COLORS.editor_button_background,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            mx: 0,
            my: 0,
            textTransform: 'none',
            height: '100%',
            px: { xs: 1, sm: 1, md: 1, lg: 1.5, xl: 1.5 },
            minWidth: 'auto',
            width: 'fit-content',
          }}
        >
          {selectedTaskId === null ? (
            <ShareRoundedIcon
              sx={{
                mx: 0.2,
                fontSize: 'large',
                color: isDarkmodeEditor ? '#218DFF' : '#1A82F3',
              }}
            />
          ) : (
            <SaveRoundedIcon
              sx={{
                mx: 0.2,
                fontSize: 'large',
                color: isDarkmodeEditor ? '#218DFF' : '#1A82F3',
              }}
            />
          )}
          <Typography
            sx={{
              display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
              color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
            }}
          >
            &nbsp;{selectedTaskId === null ? functions[1] : functions[2]}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
