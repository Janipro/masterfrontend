import { Button, Fade, IconButton, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NAV_COLORS } from '../../types/navColors';
//import useDarkmodeStore from '../../stores/useDarkmodeStore';
import useDarkmodeEditorStore from '../../stores/useDarkmodeEditorStore';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';
import { useNewTaskStore } from '../../stores/useTaskCodeStore';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';

interface CreateTaskModalProps {
  openModal: boolean;
  closeModal: () => void;
  handleCreateTask: () => void;
}

const TeacherPlaygroundCreateTaskModal: React.FC<CreateTaskModalProps> = ({
  openModal,
  closeModal,
  handleCreateTask,
}) => {
  const { isDarkmodeEditor } = useDarkmodeEditorStore();
  const { newTitle, newExpectedOutput, resetNewTask } = useNewTaskStore();
  const navigate = useNavigate();

  const confirmCreateTask = () => {
    handleCreateTask();
    closeModal();
    resetNewTask();
    navigate('/tasks');
  };

  return (
    <Modal open={openModal} onClose={closeModal} aria-labelledby="create-task-modal">
      <Fade in={openModal}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '45%',
            width: '36%',
            minHeight: '350px',
            minWidth: '300px',
            maxWidth: '80vw',
            maxHeight: '80vh',
            bgcolor: isDarkmodeEditor ? NAV_COLORS.editor_modal_background_dark : NAV_COLORS.editor_modal_background,
            color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
            boxShadow: 5,
            borderRadius: '5px',
            p: 3,
            textAlign: 'center',
            overflowY: 'scroll',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              width: '6px',
              borderRadius: '5px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: isDarkmodeEditor
                ? NAV_COLORS.editor_pane_background_dark
                : NAV_COLORS.editor_pane_background,
              borderRadius: '0 0 3px 0',
              marginTop: '2px',
              marginBottom: '2px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#B7B7B7',
              borderRadius: '5px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#9E9E9E',
            },
            '& .MuiTableCell-root': {
              backgroundColor: isDarkmodeEditor
                ? NAV_COLORS.editor_pane_background_dark
                : NAV_COLORS.editor_pane_background,
              borderBottom: `1px solid ${isDarkmodeEditor ? 'rgba(81, 81, 81, 1)' : 'rgba(224, 224, 224, 1)'}`,
              color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
            },
          }}
        >
          <IconButton
            onClick={() => {
              closeModal();
            }}
            size="small"
            sx={{ position: 'absolute', top: '5px', right: '5px' }}
          >
            <CloseRoundedIcon
              sx={{
                color: isDarkmodeEditor ? NAV_COLORS.editor_modal_color_dark : NAV_COLORS.editor_modal_color,
                fontSize: 'medium',
              }}
            />
          </IconButton>
          <Typography
            id="create-task-modal-title"
            variant="h6"
            component="h6"
            fontWeight="500"
            sx={{ lineBreak: 'auto', lineHeight: 1.3 }}
          >
            Er du sikker på at du ønsker å publisere "{newTitle}"?
          </Typography>
          <Typography
            id="create-task-modal-output-title"
            variant="body2"
            component="h6"
            fontWeight="medium"
            sx={{ mt: 2 }}
          >
            Forventet output basert på kjøring av kodefasiten din:
          </Typography>
          <Typography
            id="create-task-modal-output-content"
            variant="body2"
            component="h6"
            fontWeight="medium"
            sx={{
              display: 'flex',
              justifySelf: 'center',
              maxHeight: '60%',
              maxWidth: '70%',
              minWidth: '200px',
              minHeight: '150px',
              border: isDarkmodeEditor ? '2px solid rgb(100, 100, 100)' : '2px solid rgb(185, 185, 185)',
              borderRadius: '10px',
              padding: 1,
              mt: 2,
              whiteSpace: 'pre-line !important',
              lineBreak: 'anywhere',
              overflowY: 'scroll',
              overflowX: 'hidden',
              textAlign: 'left',
              '&::-webkit-scrollbar': {
                width: '6px',
                borderRadius: '5px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: isDarkmodeEditor
                  ? NAV_COLORS.editor_pane_background_dark
                  : NAV_COLORS.editor_pane_background,
                borderRadius: '0 0 3px 0',
                marginTop: '2px',
                marginBottom: '2px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#B7B7B7',
                borderRadius: '5px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#9E9E9E',
              },
              '& .MuiTableCell-root': {
                backgroundColor: isDarkmodeEditor
                  ? NAV_COLORS.editor_pane_background_dark
                  : NAV_COLORS.editor_pane_background,
                borderBottom: `1px solid ${isDarkmodeEditor ? 'rgba(81, 81, 81, 1)' : 'rgba(224, 224, 224, 1)'}`,
                color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
              },
            }}
          >
            {newExpectedOutput}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'flex-end',
              width: '100%',
              justifyContent: { xs: 'center', sm: 'center', md: 'flex-end', lg: 'flex-end', xl: 'flex-end' },
              gap: '20px',
              mt: 3,
              mb: 0,
            }}
          >
            <Button
              onClick={confirmCreateTask}
              sx={{
                my: 0,
                color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isDarkmodeEditor
                  ? NAV_COLORS.editor_button_background_dark
                  : NAV_COLORS.editor_button_background,
                borderRadius: '5px',
                marginRight: 0,
                paddingRight: 1.3,
                textTransform: 'none',
                minWidth: 'auto',
                width: 'fit-content',
                boxShadow: 2,
              }}
            >
              <ShareRoundedIcon
                sx={{
                  marginRight: 0.8,
                  fontSize: 'large',
                  color: isDarkmodeEditor ? '#218DFF' : '#1A82F3',
                }}
              />{' '}
              <Typography id="create-task-modal-output-title" variant="body1" component="h6" fontWeight="medium">
                Publiser
              </Typography>
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
export default TeacherPlaygroundCreateTaskModal;
