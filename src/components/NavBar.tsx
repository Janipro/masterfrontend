import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import PopUpMenu from './PopUpMenu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { CssBaseline, Fade, FormControlLabel, FormGroup, Modal, Stack, Switch } from '@mui/material';
import { NAV_COLORS } from '../types/navColors';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { useNavigate } from 'react-router-dom';
import useDarkmodeStore from '../stores/useDarkmodeStore';
import useDarkmodeEditorStore from '../stores/useDarkmodeEditorStore';
import logo from '../assets/educode.png';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const settings = ['Profil', 'Logg ut'];

export default function NavBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const isTeacher = localStorage.getItem('is_admin');
  const { isDarkmode, setDarkmode } = useDarkmodeStore();
  const { isDarkmodeEditor, setDarkmodeEditor } = useDarkmodeEditorStore();

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: isDarkmode ? NAV_COLORS.background_dark : NAV_COLORS.background,
        boxShadow: 'none',
        borderBottom: isDarkmode ? '1.3px solid #323232' : '1.3px solid #D6E4ED',
        color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text,
      }}
    >
      <CssBaseline />
      <Container maxWidth={'xl'}>
        <Toolbar disableGutters sx={{ minHeight: '50px !important' }}>
          <img
            src={logo}
            width="40"
            height="auto"
            alt="EduCode logo"
            unselectable="on"
            draggable={false}
            style={{
              cursor: 'Pointer',
              zIndex: 100,
            }}
            onClick={() => navigate('/')}
          />
          <Box
            sx={{
              padding: 0,
              margin: 0,
              zIndex: 100,
            }}
          >
            <PopUpMenu isEditor={false} />
          </Box>
          <Stack direction="row" sx={{ flexGrow: 0, ml: 'auto', alignItems: 'center' }}>
            <FormGroup sx={{ display: 'none' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isTeacher === 'true'}
                    onChange={(e) => localStorage.setItem('is_admin', e.target.checked.toString())}
                  />
                }
                label="Lærermodus"
              />
            </FormGroup>

            <IconButton>
              <NotificationsRoundedIcon sx={{ color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text }} />
            </IconButton>
            <IconButton onClick={handleOpen}>
              <SettingsIcon sx={{ color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text }} />
            </IconButton>
            <Modal open={open} onClose={handleClose} aria-labelledby="settings-modal-title">
              <Fade in={open}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    heigth: 'auto',
                    bgcolor: isDarkmode ? NAV_COLORS.editor_modal_background_dark : NAV_COLORS.editor_modal_background,
                    boxShadow: 5,
                    borderRadius: '5px',
                    p: 4,
                    textAlign: 'center',
                  }}
                >
                  <IconButton
                    onClick={() => {
                      handleClose();
                    }}
                    size="small"
                    sx={{ position: 'absolute', top: '5px', right: '5px' }}
                  >
                    <CloseRoundedIcon
                      sx={{
                        color: isDarkmode ? NAV_COLORS.editor_modal_color_dark : NAV_COLORS.editor_modal_color,
                        fontSize: 'medium',
                      }}
                    />
                  </IconButton>
                  <Typography id="settings-modal-title" variant="h5" component="h2" fontWeight="500">
                    Innstillinger
                  </Typography>
                  <Stack direction="column" alignItems="left" mt={4} gap={1}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch checked={isDarkmode} onChange={(e) => setDarkmode(e.target.checked)} />}
                        label="Nettside mørk modus"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch checked={isDarkmodeEditor} onChange={(e) => setDarkmodeEditor(e.target.checked)} />
                        }
                        label="Editor mørk modus"
                      />
                    </FormGroup>
                  </Stack>
                </Box>
              </Fade>
            </Modal>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, m: '8px', color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text }}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              sx={{
                mt: '35px',
                display: { xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' },
                '& .MuiPaper-root': {
                  backgroundColor: isDarkmode
                    ? NAV_COLORS.editor_button_background_dark
                    : NAV_COLORS.editor_button_background,
                  color: isDarkmode ? NAV_COLORS.editor_icon_background_dark : NAV_COLORS.editor_icon_background,
                },
                '& .MuiMenuItem-root': {
                  color: isDarkmode ? NAV_COLORS.editor_icon_background_dark : NAV_COLORS.editor_icon_background,
                  '&:hover': {
                    backgroundColor: isDarkmode
                      ? NAV_COLORS.editor_menu_background_highlight_dark
                      : NAV_COLORS.editor_menu_background_highlight,
                  },
                },
                '& .MuiList-root': {
                  padding: 0,
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
                      backgroundColor: isDarkmode
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
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting === 'Logg ut' ? (
                    <Link
                      to="/"
                      style={{ color: 'inherit' }}
                      onClick={() => {
                        localStorage.removeItem('id');
                        navigate(0);
                      }}
                    >
                      <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                    </Link>
                  ) : (
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
