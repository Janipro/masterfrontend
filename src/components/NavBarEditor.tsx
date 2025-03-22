import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import PopUpMenu from './PopUpMenu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { CssBaseline, FormControlLabel, FormGroup, Modal, Stack, Switch } from '@mui/material';
import useTeacherStore from '../stores/useTeacherStore';
import { NAV_COLORS } from '../types/navColors';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import NavigationRoundedIcon from '@mui/icons-material/NavigationRounded';
import WbIncandescentRoundedIcon from '@mui/icons-material/WbIncandescentRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import { useNavigate } from 'react-router-dom';
import useDarkmodeStore from '../stores/useDarkmodeStore';
import useDarkmodeEditorStore from '../stores/useDarkmodeEditorStore';
import { useTaskCodeStore } from '../stores/useTaskCodeStore';

const functions = ['Kjør', 'Hjelp', 'Lever', 'Innsendingshistorikk'];
const settings = ['Profil', 'Logg ut'];

export default function NavBarEditor() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElNavbar, setAnchorElNavbar] = React.useState<null | HTMLElement>(null);
  const { isTeacher, setTeacher } = useTeacherStore();
  const { isDarkmode, setDarkmode } = useDarkmodeStore();
  const { isDarkmodeEditor, setDarkmodeEditor } = useDarkmodeEditorStore();
  const { executeCode } = useTaskCodeStore();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = React.useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleOpenExpandedNavbar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNavbar(event.currentTarget);
  };

  const handleCloseExpandedNavbar = React.useCallback(() => {
    setAnchorElNavbar(null);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      handleCloseUserMenu();
      handleCloseExpandedNavbar();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleCloseUserMenu, handleCloseExpandedNavbar]);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: isDarkmodeEditor ? NAV_COLORS.editor_background_dark : '#FFFFFF',
        boxShadow: 'none',
        borderBottom: null,
        color: isDarkmodeEditor ? NAV_COLORS.editor_icon_background_dark : NAV_COLORS.editor_icon_background,
      }}
    >
      <CssBaseline />
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ minHeight: '50px !important' }}>
          <img
            src="src/assets/educode.png"
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
            <PopUpMenu isEditor={true} />
          </Box>
          <Box
            sx={{
              position: 'fixed',
              display: 'flex',
              width: '95vw',
              justifyContent: 'center',
            }}
          >
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
                    height: '40%',
                    px: 0,
                    minWidth: 'auto',
                    width: 'fit-content',
                    boxShadow: 2,
                  }}
                >
                  <Button
                    key={'undoBtn'}
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
                    <ReplayOutlinedIcon
                      sx={{
                        color: isDarkmodeEditor
                          ? NAV_COLORS.editor_icon_redo_undo_background_dark
                          : NAV_COLORS.editor_icon_background,
                        fontSize: 'large',
                      }}
                    />
                  </Button>

                  <Box
                    sx={{
                      my: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
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
                    key={'redoBtn'}
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
                    <ReplayOutlinedIcon
                      sx={{
                        color: isDarkmodeEditor
                          ? NAV_COLORS.editor_icon_redo_undo_background_dark
                          : NAV_COLORS.editor_icon_background,
                        fontSize: 'large',
                        transform: 'scaleX(-1)',
                      }}
                    />
                  </Button>
                </Box>
              </Box>

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
                    key={functions[1]}
                    sx={{
                      color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isDarkmodeEditor
                        ? NAV_COLORS.editor_button_background_dark
                        : NAV_COLORS.editor_button_background,
                      borderRadius: 0,
                      mx: 0,
                      my: 0,
                      textTransform: 'none',
                      height: '100%',
                      px: { xs: 1, sm: 1, md: 1, lg: 1.5, xl: 1.5 },
                      minWidth: 'auto',
                      width: 'fit-content',
                    }}
                  >
                    <WbIncandescentRoundedIcon
                      sx={{
                        mx: 0.2,
                        fontSize: 'large',
                        transform: 'rotate(180deg)',
                        color: '#FDA500',
                      }}
                    />
                    <Typography
                      sx={{
                        display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                        color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
                      }}
                    >
                      &nbsp;{functions[1]}
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
                    key={functions[2]}
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
                    <CloudUploadRoundedIcon
                      sx={{
                        mx: 0.2,
                        fontSize: 'large',
                        color: '#00D100',
                      }}
                    />
                    <Typography
                      sx={{
                        display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                        color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
                      }}
                    >
                      &nbsp;{functions[2]}
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Stack direction="row" sx={{ flexGrow: 0, ml: 'auto', alignItems: 'center' }}>
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
                  mx: { xs: 1, sm: 1, md: 1, lg: 2, xl: 2 },
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
                    borderRadius: '20px',
                    mx: 0,
                    textTransform: 'none',
                    height: '40%',
                    px: 0,
                    minWidth: 'auto',
                    width: 'fit-content',
                    boxShadow: 2,
                  }}
                >
                  <Button
                    key={'submissionHistory'}
                    sx={{
                      color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isDarkmodeEditor
                        ? NAV_COLORS.editor_button_background_dark
                        : NAV_COLORS.editor_button_background,
                      borderRadius: 20,
                      mx: 0,
                      my: 0,
                      textTransform: 'none',
                      height: '100%',
                      px: { xs: 1, sm: 1, md: 1, lg: 1.5, xl: 1.5 },
                      minWidth: 'auto',
                      width: 'fit-content',
                    }}
                  >
                    <HistoryRoundedIcon
                      sx={{
                        color: '#005FD4',
                        fontSize: 'large',
                      }}
                    />
                    <Typography
                      sx={{
                        display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' },
                        color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
                        fontSize: 'small',
                      }}
                    >
                      &nbsp;{functions[3]}
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>

            <Container
              sx={{
                display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' },
                flexDirection: 'row',
                paddingX: '0px !important',
              }}
            >
              <FormGroup sx={{ justifyContent: 'flex-end' }}>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked={isTeacher}
                      onChange={() => setTeacher(!isTeacher)}
                      sx={{
                        '& .MuiSwitch-thumb': {
                          backgroundColor: isDarkmodeEditor ? '#e0e0e0' : '#FFFFFF',
                          opacity: 1,
                        },
                        '& .MuiSwitch-track': {
                          backgroundColor: isDarkmodeEditor ? '#575757' : '#9e9e9e',
                          opacity: 1,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
                          backgroundColor: isDarkmodeEditor ? '#90caf9' : '#1976d2',
                          opacity: 1,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: isDarkmodeEditor ? '#4f6c84' : '#85b5e5',
                          opacity: 1,
                        },
                      }}
                    />
                  }
                  label="Lærermodus"
                />
              </FormGroup>

              <IconButton>
                <NotificationsRoundedIcon
                  sx={{
                    color: isDarkmodeEditor
                      ? NAV_COLORS.editor_icon_background_dark
                      : NAV_COLORS.editor_icon_background,
                  }}
                />
              </IconButton>
              <IconButton onClick={handleOpen}>
                <SettingsIcon
                  sx={{
                    color: isDarkmodeEditor
                      ? NAV_COLORS.editor_icon_background_dark
                      : NAV_COLORS.editor_icon_background,
                  }}
                />
              </IconButton>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  color: isDarkmodeEditor ? NAV_COLORS.editor_icon_background_dark : NAV_COLORS.editor_icon_background,
                }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Container>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none' },
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginLeft: { xs: 0, sm: 0.5, md: 0.5, lg: 0.5, xl: 0.5 },
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
                    borderRadius: '20px',
                    mx: 0,
                    textTransform: 'none',
                    height: '40%',
                    px: 0,
                    minWidth: 'auto',
                    width: 'fit-content',
                    boxShadow: 2,
                  }}
                >
                  <Button
                    key={'expandNavbar'}
                    onClick={handleOpenExpandedNavbar}
                    sx={{
                      color: isDarkmodeEditor ? NAV_COLORS.editor_text_dark : NAV_COLORS.editor_text,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isDarkmodeEditor
                        ? NAV_COLORS.editor_button_background_dark
                        : NAV_COLORS.editor_button_background,
                      borderRadius: 20,
                      mx: 0,
                      my: 0,
                      textTransform: 'none',
                      height: '100%',
                      px: 0.75,
                      minWidth: 'auto',
                      width: 'fit-content',
                    }}
                  >
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
                display: {
                  xs: 'block',
                  sm: 'block',
                  md: 'block',
                  lg: 'none',
                  xl: 'none',
                },
                mt: '35px',
                '& .MuiPaper-root': {
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
              }}
              id="navbar-appbar"
              anchorEl={anchorElNavbar}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNavbar)}
              onClose={handleCloseExpandedNavbar}
            >
              <MenuItem key={'notificationButton'} onClick={handleCloseExpandedNavbar}>
                <IconButton>
                  <NotificationsRoundedIcon
                    sx={{
                      color: isDarkmodeEditor
                        ? NAV_COLORS.editor_icon_background_dark
                        : NAV_COLORS.editor_icon_background,
                    }}
                  />
                </IconButton>
              </MenuItem>
              <MenuItem
                key={'settingsButton'}
                onClick={() => {
                  handleOpen();
                  handleCloseExpandedNavbar();
                }}
              >
                <IconButton>
                  <SettingsIcon
                    sx={{
                      color: isDarkmodeEditor
                        ? NAV_COLORS.editor_icon_background_dark
                        : NAV_COLORS.editor_icon_background,
                    }}
                  />
                </IconButton>
              </MenuItem>
              <MenuItem key={'accountButton'} onClick={handleOpenUserMenu}>
                <IconButton
                  sx={{
                    p: '8px',
                    color: isDarkmodeEditor
                      ? NAV_COLORS.editor_icon_background_dark
                      : NAV_COLORS.editor_icon_background,
                  }}
                >
                  <AccountCircleIcon />
                </IconButton>
              </MenuItem>
            </Menu>

            <Menu
              sx={{
                mt: '35px',
                display: {
                  xs: 'block',
                  sm: 'block',
                  md: 'block',
                  lg: 'none',
                  xl: 'none',
                },
                '& .MuiPaper-root': {
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
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 63,
                horizontal: 164,
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

            <Menu
              sx={{ mt: '35px', display: { xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' } }}
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
            <Modal open={open} onClose={handleClose} aria-labelledby="settings-modal-title">
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 300,
                  heigth: 'auto',
                  bgcolor: isDarkmodeEditor
                    ? NAV_COLORS.editor_button_background_dark
                    : NAV_COLORS.editor_button_background,
                  color: isDarkmodeEditor
                    ? NAV_COLORS.editor_icon_redo_undo_background_dark
                    : NAV_COLORS.editor_icon_background,
                  boxShadow: 5,
                  borderRadius: '5px',
                  p: 4,
                  textAlign: 'center',
                }}
              >
                <Typography id="settings-modal-title" variant="h5" component="h2" fontWeight="500">
                  Innstillinger
                </Typography>
                <Stack direction="column" alignItems="left" mt={4} gap={1}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          defaultChecked={isDarkmode}
                          onChange={() => setDarkmode(!isDarkmode)}
                          sx={{
                            '& .MuiSwitch-thumb': {
                              backgroundColor: isDarkmodeEditor ? '#e0e0e0' : '#FFFFFF',
                              opacity: 1,
                            },
                            '& .MuiSwitch-track': {
                              backgroundColor: isDarkmodeEditor ? '#575757' : '#9e9e9e',
                              opacity: 1,
                            },
                            '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
                              backgroundColor: isDarkmodeEditor ? '#90caf9' : '#1976d2',
                              opacity: 1,
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: isDarkmodeEditor ? '#4f6c84' : '#85b5e5',
                              opacity: 1,
                            },
                          }}
                        />
                      }
                      label="Nettside mørk modus"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          defaultChecked={isDarkmodeEditor}
                          onChange={() => setDarkmodeEditor(!isDarkmodeEditor)}
                          sx={{
                            '& .MuiSwitch-thumb': {
                              backgroundColor: isDarkmodeEditor ? '#e0e0e0' : '#FFFFFF',
                              opacity: 1,
                            },
                            '& .MuiSwitch-track': {
                              backgroundColor: isDarkmodeEditor ? '#575757' : '#9e9e9e',
                              opacity: 1,
                            },
                            '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
                              backgroundColor: isDarkmodeEditor ? '#90caf9' : '#1976d2',
                              opacity: 1,
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: isDarkmodeEditor ? '#4f6c84' : '#85b5e5',
                              opacity: 1,
                            },
                          }}
                        />
                      }
                      label="Editor mørk modus"
                    />
                  </FormGroup>
                </Stack>
              </Box>
            </Modal>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
