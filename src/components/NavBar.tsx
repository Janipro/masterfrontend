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
import { FormControlLabel, FormGroup, Stack, Switch } from '@mui/material';
import useTeacherStore from '../stores/useTeacherStore';
import { NAV_COLORS } from '../types/navColors';

const functions = ['Kjør', 'Hjelp', 'Lever'];
const settings = ['Profil', 'Logg ut'];

export default function NavBar({ isEditor }: { isEditor: boolean }) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { isTeacher, setTeacher } = useTeacherStore();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: NAV_COLORS.background, boxShadow: 2 }}>
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
          <Typography color={NAV_COLORS.text} typography="h6" fontWeight="medium" marginLeft={0.25}>
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
                    color: NAV_COLORS.text,
                    display: 'block',
                    backgroundColor: 'white',
                    borderRadius: 6,
                    mx: 0.5,
                    textTransform: 'none',
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
                sx={{ color: NAV_COLORS.text }}
              />
            </FormGroup>
            <IconButton>
              <SettingsIcon sx={{ color: NAV_COLORS.text }} />
            </IconButton>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AccountCircleIcon sx={{ color: NAV_COLORS.text }} />
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
                    <Link to="/signin" style={{ color: 'inherit' }}>
                      <Typography sx={{ textAlign: 'center', color: NAV_COLORS.text }}>{setting}</Typography>
                    </Link>
                  ) : (
                    <Typography sx={{ textAlign: 'center', color: NAV_COLORS.text }}>{setting}</Typography>
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
