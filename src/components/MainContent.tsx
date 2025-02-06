import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { orange, red } from "@mui/material/colors";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import NavBar from "./NavBar";
import { useCallback, useState } from "react";

const fakeData = {
  forLoop: orange,
  ifStatement: red,
};

export default function MainContent() {
  const [value, setValue] = useState("print(Hello World!)");
  const onChange = useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);
  return (
    <>
      <NavBar />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
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
                  padding: 0.25,
                }}
              >
                for-løkke
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  marginLeft: 2,
                  backgroundColor: fakeData.ifStatement[400],
                  borderRadius: 2,
                  padding: 0.25,
                }}
              >
                if-setning
              </Typography>
            </Toolbar>
            <Typography sx={{ marginBottom: 2 }}>
              Oppgavetekst til opppgave 1
            </Typography>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              p: 3,
              textAlign: "left",
            }}
          >
            <Typography
              sx={{
                marginBottom: 2,
                border: "1px solid #3f3f3f",
              }}
            >
              <CodeMirror
                value={value}
                height="300px"
                width="600px"
                extensions={[python()]}
                onChange={onChange}
              />
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
