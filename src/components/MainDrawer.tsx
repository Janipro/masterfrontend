import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { green, orange, red } from "@mui/material/colors";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const drawerWidth = 200;

const fakeData = {
  forLoop: orange,
  ifStatement: red,
};

export default function MainDrawer() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            EduCode
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem key={"Dashboard"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Oppgaver" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {["Oppgave 1", "Oppgave 2", "Oppgave 3"].map((text, index) => (
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    {index <= 1 ? (
                      <CheckCircleIcon sx={{ color: green[400] }} />
                    ) : (
                      <CheckCircleOutlineIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
      <Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            border: "1px solid black",
            borderRadius: 2,
          }}
        >
          <Toolbar>
            <Typography variant="h5" noWrap component="div">
              Oppgave 1
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                marginLeft: 2,
                backgroundColor: fakeData.forLoop[400],
                borderRadius: 2,
              }}
            >
              for-loop
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                marginLeft: 2,
                backgroundColor: fakeData.ifStatement[400],
                borderRadius: 2,
              }}
            >
              if-statement
            </Typography>
          </Toolbar>
          <Typography sx={{ marginBottom: 2 }}>
            Oppgavetekst til opppgave 1
          </Typography>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Typography
            sx={{ marginBottom: 2, border: "1px solid black", borderRadius: 2 }}
          >
            TODO: Add Editor component
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
