import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { green } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CodeIcon from '@mui/icons-material/Code';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PopUp() {
  const [open, setOpen] = useState(false);
  const [openAssignments, setOpenAssignments] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleClick = () => {
    setOpenAssignments(!openAssignments);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(true)}>
      <List>
        <Link to="/" style={{ color: 'inherit' }}>
          <ListItem key={'Dashboard'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Oversikt'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Oppgaver" />
          {openAssignments ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAssignments} timeout="auto" unmountOnExit>
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
        </Collapse>
        <Link to="/editor" style={{ color: 'inherit' }}>
          <ListItem key={'Editor'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary={'Editor'} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} sx={{ color: '#3f3f3f' }}>
        <Typography sx={{ textTransform: 'none' }}>Meny</Typography>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
