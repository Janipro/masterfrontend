import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InsightsIcon from '@mui/icons-material/Insights';
/*import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { green } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';*/
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolIcon from '@mui/icons-material/School';
import CloseIcon from '@mui/icons-material/Close';
/*import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';*/
import CodeIcon from '@mui/icons-material/Code';
import { useState } from 'react';
/*import Collapse from '@mui/material/Collapse';*/
import { Divider, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { NAV_COLORS } from '../types/navColors';
import MenuIcon from '@mui/icons-material/Menu';
import useDarkmodeStore from '../stores/useDarkmodeStore';

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [openAssignments, setOpenAssignments] = useState(false);
  const { isDarkmode } = useDarkmodeStore();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleClick = () => {
    setOpenAssignments(!openAssignments);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: isDarkmode ? NAV_COLORS.background_dark : NAV_COLORS.background,
        height: '100%',
        color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text,
      }}
    >
      <List>
        <Typography typography="h5" fontWeight="medium">
          <ListItem key={'Meny'} disablePadding>
            <ListItemButton onClick={toggleDrawer(false)}>
              <ListItemText primary={'Meny'} disableTypography />
              <CloseIcon />
            </ListItemButton>
          </ListItem>
        </Typography>
        <Divider />
        <Typography textTransform="none" typography="h6" fontWeight="medium">
          <Link to="/" style={{ color: 'inherit' }}>
            <ListItem key={'Dashboard'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon sx={{ color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text }} />
                </ListItemIcon>
                <ListItemText primary={'Oversikt'} disableTypography />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/tasks" style={{ color: 'inherit' }}>
            <ListItem key={'Tasks'} disablePadding>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <AssignmentIcon sx={{ color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text }} />
                </ListItemIcon>
                <ListItemText primary="Oppgaver" disableTypography />
                {/*openAssignments ? <ExpandLess /> : <ExpandMore />*/}
              </ListItemButton>
            </ListItem>
          </Link>
          {/*<Collapse in={openAssignments} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {['Oppgave 1', 'Oppgave 2', 'Oppgave 3'].map((text, index) => (
              <ListItemButton sx={{ pl: 4 }} key={index}>
                <ListItemIcon>
                  {index <= 1 ? <CheckCircleIcon sx={{ color: green[400] }} /> : <CheckCircleOutlineIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>*/}
          <Link to="/class" style={{ color: 'inherit' }}>
            <ListItem key={'Class'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SchoolIcon sx={{ color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text }} />
                </ListItemIcon>
                <ListItemText primary={'Mine fag'} disableTypography />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/statistics" style={{ color: 'inherit' }}>
            <ListItem key={'Statistics'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InsightsIcon sx={{ color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text }} />
                </ListItemIcon>
                <ListItemText primary={'Statistikk'} disableTypography />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/playground" style={{ color: 'inherit' }}>
            <ListItem key={'Playground'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CodeIcon sx={{ color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text }} />
                </ListItemIcon>
                <ListItemText primary={'Editor'} disableTypography />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider sx={{ position: 'fixed', bottom: 55, width: 250 }} />
          <ListItem key={'Settings'} disablePadding sx={{ position: 'fixed', bottom: 0, width: 250 }}>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon sx={{ color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text }} />
              </ListItemIcon>
              <ListItemText primary={'Innstillinger'} disableTypography />
            </ListItemButton>
          </ListItem>
        </Typography>
      </List>
    </Box>
  );

  return (
    <Box>
      <IconButton onClick={toggleDrawer(true)} sx={{ color: isDarkmode ? NAV_COLORS.text_dark : NAV_COLORS.text }}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
