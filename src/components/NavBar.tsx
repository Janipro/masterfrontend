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
import SchoolIcon from '@mui/icons-material/School';
import PopUpMenu from './PopUpMenu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { FormControlLabel, FormGroup, Stack, Switch } from '@mui/material';
import useTeacherStore from '../stores/useTeacherStore';

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
    <AppBar position="fixed" sx={{ backgroundColor: '#EDEBEB' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SchoolIcon
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              color: '#3f3f3f',
            }}
          />
          <PopUpMenu />
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
                    color: '#3f3f3f',
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
                sx={{ color: '#3F3F3F' }}
              />
            </FormGroup>
            <IconButton>
              <SettingsIcon />
            </IconButton>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                    <Link to="/signin" style={{ color: 'inherit' }}>
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
