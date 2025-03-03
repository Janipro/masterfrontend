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
import { useState } from 'react';
import useDarkmodeStore from '../stores/useDarkmodeStore';

const functions = ['Kjør', 'Hjelp', 'Lever'];
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
        boxShadow: 2,
        color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text,
      }}
    >
      <CssBaseline />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PopUpMenu />
          <img
            src="src/assets/educode.png"
            width="30"
            height="auto"
            alt="EduCode logo"
            unselectable="on"
            draggable={false}
            style={{
              userSelect: 'none',
              msUserSelect: 'none',
              MozUserSelect: 'none',
              WebkitUserSelect: 'none',
              marginLeft: 18,
            }}
          ></img>
          <Typography typography="h6" fontWeight="medium" marginLeft={0.25}>
            EduCode
          </Typography>
          {isEditor ? (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
              }}
            >
              {functions.map((f) => (
                <Button
                  key={f}
                  sx={{
                    my: 2,
                    display: 'block',
                    backgroundColor: isDarkmode ? '#494949' : 'white',
                    borderRadius: 6,
                    mx: 0.5,
                    textTransform: 'none',
                    color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text,
                  }}
                >
                  <Typography>{f}</Typography>
                </Button>
              ))}
            </Box>
          ) : null}
          <Stack direction="row" sx={{ flexGrow: 0, ml: 'auto' }}>
            <FormGroup>
              <FormControlLabel
                control={<Switch defaultChecked={isTeacher} onChange={() => setTeacher(!isTeacher)} />}
                label="Lærermodus"
              />
            </FormGroup>
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
