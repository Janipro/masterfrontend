import {
  Checkbox,
  Fade,
  IconButton,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NAV_COLORS } from '../../types/navColors';
//import useDarkmodeStore from '../../stores/useDarkmodeStore';
import useDarkmodeEditorStore from '../../stores/useDarkmodeEditorStore';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { requirement } from '../../types/tableProps';
import { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { requirementTranslations } from '../../types/translations';

interface RequirementsModalProps {
  openModal: boolean;
  closeModal: () => void;
  allRequirements: requirement[];
  requirements: requirement[];
  setRequirements: (requirements: requirement[]) => void;
}

const TeacherPlaygroundRequirementsModal: React.FC<RequirementsModalProps> = ({
  openModal,
  closeModal,
  requirements,
  allRequirements,
  setRequirements,
}) => {
  const { isDarkmodeEditor } = useDarkmodeEditorStore();
  const [searchTerm, setSearchTerm] = useState('');

  const isChecked = (id: number) => requirements.some((req) => req.requirementId === id);

  const handleToggle = (requirement: requirement) => {
    if (isChecked(requirement.requirementId)) {
      setRequirements(requirements.filter((req) => req.requirementId !== requirement.requirementId));
    } else {
      setRequirements([...requirements, requirement]);
    }
  };
  const filteredRequirements = allRequirements.filter(
    (req) =>
      req.requirementName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      requirementTranslations[req.requirementName.toLowerCase()].includes(searchTerm.toLowerCase())
  );

  return (
    <Modal open={openModal} onClose={closeModal} aria-labelledby="requirements-modal">
      <Fade in={openModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            height: 'auto',
            minHeight: '485px',
            bgcolor: isDarkmodeEditor ? NAV_COLORS.editor_modal_background_dark : NAV_COLORS.editor_modal_background,
            color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
            boxShadow: 5,
            borderRadius: '5px',
            p: 4,
            textAlign: 'center',
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
          <Typography id="requirements-modal-title" variant="h5" component="h2" fontWeight="500">
            Legg til krav
          </Typography>
          <Stack direction="column" alignItems="flex-start" mt={4} gap={2}>
            <TextField
              fullWidth
              placeholder="Søk etter krav..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <SearchRoundedIcon sx={{ fontSize: 'large', color: isDarkmodeEditor ? '#999999' : '#a2a2a2' }} />
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: `1px solid ${isDarkmodeEditor ? NAV_COLORS.editor_textfield_border_dark : NAV_COLORS.editor_textfield_border}`,
                  },
                  '&:hover fieldset': {
                    border: `1px solid ${isDarkmodeEditor ? NAV_COLORS.editor_textfield_border_hover_dark : NAV_COLORS.editor_textfield_border_hover}`,
                  },
                  '&.Mui-focused fieldset': {
                    border: `1px solid ${isDarkmodeEditor ? NAV_COLORS.editor_textfield_border_selected_dark : NAV_COLORS.editor_textfield_border_selected}`,
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#999999',
                  opacity: 1,
                },
                '& .MuiInputBase-input': {
                  color: isDarkmodeEditor ? '#ffffff' : '#000000',
                  opacity: 1,
                },
              }}
            />

            <Paper
              sx={{
                width: '100%',
                maxHeight: 300,
                backgroundColor: isDarkmodeEditor
                  ? NAV_COLORS.editor_pane_background_dark
                  : NAV_COLORS.editor_pane_background,
                overflowY: 'scroll',
                overflowX: 'hidden',
                marginRight: '2px',
                '&::-webkit-scrollbar': {
                  width: '6px',
                  borderRadius: '5px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: isDarkmodeEditor
                    ? NAV_COLORS.editor_pane_background_dark
                    : NAV_COLORS.editor_pane_background,
                  borderRadius: '0 0 3px 0',
                  marginTop: '57.5px',
                  marginBottom: '1.5px',
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
              <Table stickyHeader sx={{ paddingLeft: '6px' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Krav</TableCell>
                    <TableCell align="center">Velg</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRequirements.map((req) => (
                    <TableRow key={req.requirementId}>
                      <TableCell>{requirementTranslations[req.requirementName]}</TableCell>
                      <TableCell align="center">
                        <Checkbox
                          size="small"
                          sx={{
                            py: 0,
                            px: 0,
                            color: '#999999',
                            '&.Mui-checked': {
                              color: '#1976d2',
                            },
                          }}
                          checked={isChecked(req.requirementId)}
                          onChange={() => handleToggle(req)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};
export default TeacherPlaygroundRequirementsModal;
