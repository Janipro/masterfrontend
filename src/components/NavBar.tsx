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
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useDarkmodeStore from '../stores/useDarkmodeStore';
import { useTaskCodeStore } from '../stores/useTaskCodeStore';

const functions = ['Kjør', 'Hjelp', 'Lever', 'Innsendingshistorikk'];
const settings = ['Profil', 'Logg ut'];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  heigth: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

export default function NavBar({ isEditor }: { isEditor: boolean }) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [editorDarkmode, setEditorDarkmode] = useState(false);
  const { isTeacher, setTeacher } = useTeacherStore();
  const { isDarkmode, setDarkmode } = useDarkmodeStore();
  const { executeCode } = useTaskCodeStore();

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
        backgroundColor: isEditor
          ? isDarkmode
            ? '#0F0F0F'
            : '#FFFFFF'
          : isDarkmode
            ? NAV_COLORS.background_dark
            : NAV_COLORS.background,
        boxShadow: 'none',
        border: isEditor ? null : '2px solid #D6E4ED',
        color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text,
      }}
    >
      <CssBaseline />
      <Container maxWidth={isEditor ? false : 'xl'}>
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
            <PopUpMenu />
          </Box>
          {isEditor ? (
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
                    mx: 2,
                    alignItems: { md: 'flex-end' },
                  }}
                >
                  <Box
                    sx={{
                      my: 2,
                      color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isDarkmode ? '#494949' : 'white',
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
                        color: NAV_COLORS.text,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        mx: 0,
                        my: 0,
                        textTransform: 'none',
                        height: '100%',
                        px: 1.5,
                        minWidth: 'auto',
                        width: 'fit-content',
                      }}
                    >
                      <ReplayOutlinedIcon
                        sx={{
                          color: '#323232',
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
                          backgroundColor: '#d7e1ed',
                        }}
                      ></Box>
                    </Box>

                    <Button
                      key={'redoBtn'}
                      sx={{
                        color: NAV_COLORS.text,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        mx: 0,
                        my: 0,
                        textTransform: 'none',
                        height: '100%',
                        px: 1.5,
                        minWidth: 'auto',
                        width: 'fit-content',
                      }}
                    >
                      <ReplayOutlinedIcon
                        sx={{
                          color: '#323232',
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
                    mx: 2,
                    alignItems: { md: 'flex-end' },
                  }}
                >
                  <Box
                    sx={{
                      my: 2,
                      color: NAV_COLORS.text,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
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
                        color: NAV_COLORS.text,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        mx: 0,
                        my: 0,
                        textTransform: 'none',
                        height: '100%',
                        px: 1.5,
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
                          color: '#090909',
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
                          backgroundColor: '#d7e1ed',
                        }}
                      ></Box>
                    </Box>

                    <Button
                      key={functions[1]}
                      sx={{
                        color: NAV_COLORS.text,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderRadius: 0,
                        mx: 0,
                        my: 0,
                        textTransform: 'none',
                        height: '100%',
                        px: 1.5,
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
                          color: '#090909',
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
                          backgroundColor: '#d7e1ed',
                        }}
                      ></Box>
                    </Box>

                    <Button
                      key={functions[2]}
                      sx={{
                        color: NAV_COLORS.text,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        mx: 0,
                        my: 0,
                        textTransform: 'none',
                        height: '100%',
                        px: 1.5,
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
                          color: '#090909',
                        }}
                      >
                        &nbsp;{functions[2]}
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : null}
          <Stack direction="row" sx={{ flexGrow: 0, ml: 'auto', alignItems: 'center' }}>
            {isEditor ? (
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
                    mx: 2,
                    alignItems: { md: 'flex-end' },
                  }}
                >
                  <Box
                    sx={{
                      my: 2,
                      color: NAV_COLORS.text,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
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
                        color: NAV_COLORS.text,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderRadius: 20,
                        mx: 0,
                        my: 0,
                        textTransform: 'none',
                        height: '100%',
                        px: 1.5,
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
                          color: '#090909',
                          fontSize: 'small',
                        }}
                      >
                        &nbsp;{functions[3]}
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : null}
            <FormGroup>
              <FormControlLabel
                control={<Switch defaultChecked={isTeacher} onChange={() => setTeacher(!isTeacher)} />}
                label="Lærermodus"
              />
            </FormGroup>

            <IconButton>
              <NotificationsRoundedIcon sx={{ color: NAV_COLORS.text }} />
            </IconButton>
            <IconButton onClick={handleOpen}>
              <SettingsIcon sx={{ color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text }} />
            </IconButton>
            <Modal open={open} onClose={handleClose} aria-labelledby="settings-modal-title">
              <Box sx={style}>
                <Typography id="settings-modal-title" variant="h5" component="h2" fontWeight="500">
                  Innstillinger
                </Typography>
                <Stack direction="column" alignItems="left" mt={4} gap={1}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch defaultChecked={isDarkmode} onChange={() => setDarkmode(!isDarkmode)} />}
                      label="Nettside mørk modus"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch defaultChecked={editorDarkmode} onChange={() => setEditorDarkmode(!editorDarkmode)} />
                      }
                      label="Editor mørk modus"
                    />
                  </FormGroup>
                </Stack>
              </Box>
            </Modal>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text }}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
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
                    <Link to="/login" style={{ color: 'inherit' }}>
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
