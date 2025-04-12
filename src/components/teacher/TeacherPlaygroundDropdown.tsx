import React from 'react';
import useDarkmodeEditorStore from '../../stores/useDarkmodeEditorStore';
import { NAV_COLORS } from '../../types/navColors';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

interface dropDownProps {
  itemList: string[];
  setSelectedItem: (item: string) => void;
  selectedItem: string;
}

const TeacherPlaygroundDropdown: React.FC<dropDownProps> = ({ itemList, setSelectedItem, selectedItem }) => {
  const { isDarkmodeEditor } = useDarkmodeEditorStore();
  const [anchorElNavbar, setAnchorElNavbar] = React.useState<null | HTMLElement>(null);

  const handleOpenDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNavbar(event.currentTarget);
  };

  const handleCloseDropdown = React.useCallback(() => {
    setAnchorElNavbar(null);
  }, []);

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    handleCloseDropdown();
  };

  React.useEffect(() => {
    const handleResize = () => {
      handleCloseDropdown();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleCloseDropdown]);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              my: 0,
              color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isDarkmodeEditor
                ? NAV_COLORS.editor_button_background_dark
                : NAV_COLORS.editor_button_background,
              borderRadius: '20px',
              marginRight: 0,
              marginLeft: 1.45,
              textTransform: 'none',
              px: 0,
              minWidth: 'auto',
              width: 'fit-content',
              boxShadow: isDarkmodeEditor ? 1 : 2,
            }}
          >
            <Button
              key={'expandNavbar'}
              onClick={handleOpenDropdown}
              sx={{
                color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: isDarkmodeEditor
                  ? NAV_COLORS.editor_button_background_dark
                  : NAV_COLORS.editor_button_background,
                borderRadius: 20,
                mx: 0,
                my: 0,
                textTransform: 'none',
                paddingLeft: 1.3,
                paddingRight: 1,
                py: 0.5,
                minWidth: '105px',
                width: 'fit-content',
              }}
            >
              <Typography
                sx={{
                  typography: 'body2',
                  fontWeight: 'medium',
                  color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
                  '&.Mui-focused': {
                    color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
                  },
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {selectedItem}
              </Typography>
              <ExpandLessRoundedIcon
                sx={{
                  color: isDarkmodeEditor
                    ? NAV_COLORS.editor_icon_redo_undo_background_dark
                    : NAV_COLORS.editor_icon_background,
                  fontSize: 'large',
                  transform: anchorElNavbar ? 'rotate(180deg)' : null,
                }}
              />
            </Button>
          </Box>
        </Box>
      </Box>
      <Menu
        sx={{
          display: 'block',
          mt: '35px',
          '& .MuiPaper-root': {
            boxShadow: 5,
            minWidth: '50px',
            backgroundColor: isDarkmodeEditor
              ? NAV_COLORS.editor_button_background_dark
              : NAV_COLORS.editor_button_background,
            color: isDarkmodeEditor ? NAV_COLORS.editor_icon_background_dark : NAV_COLORS.editor_icon_background,
          },
          '& .MuiMenuItem-root': {
            color: isDarkmodeEditor ? NAV_COLORS.editor_icon_background_dark : NAV_COLORS.editor_icon_background,
            '&:hover': {
              backgroundColor: isDarkmodeEditor
                ? NAV_COLORS.editor_menu_background_highlight_dark
                : NAV_COLORS.editor_menu_background_highlight,
            },
          },
          '& .MuiList-root': {
            padding: 0,
          },
          '& .MuiButtonBase-root': {
            display: 'flex',
            justifyContent: 'center',
          },
        }}
        slotProps={{
          paper: {
            sx: {
              '&::-webkit-scrollbar': {
                width: '6px',
                borderRadius: '5px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: isDarkmodeEditor
                  ? NAV_COLORS.editor_pane_background_dark
                  : NAV_COLORS.editor_pane_background,
                borderRadius: '0 5px 5px 0',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#B7B7B7',
                borderRadius: '5px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#9E9E9E',
              },
            },
          },
        }}
        id="dropdown-menu"
        anchorEl={anchorElNavbar}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={Boolean(anchorElNavbar)}
        onClose={handleCloseDropdown}
      >
        {itemList.map((item, index) => (
          <MenuItem key={index} onClick={() => handleSelectItem(item)}>
            <Typography
              sx={{
                typography: 'body2',
                fontWeight: 'medium',
                color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
                '&.Mui-focused': {
                  color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
                },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {item}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export default TeacherPlaygroundDropdown;
