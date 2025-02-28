import { ThemeProvider } from '@emotion/react';
import './App.css';
import { createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes, StaticRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Playground from './pages/Playground';
import Tasks from './pages/Tasks';
import Class from './pages/Class';
import Statistics from './pages/Statistics';
import useDarkmodeStore from './stores/useDarkmodeStore';
import Home from './pages/Home';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <BrowserRouter basename="/">{children}</BrowserRouter>;
}

function App() {
  const { isDarkmode } = useDarkmodeStore();
  return (
    <>
      <ThemeProvider theme={isDarkmode ? darkTheme : defaultTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/class" element={<Class />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
