import { ThemeProvider } from '@emotion/react';
import './App.css';
import { createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes, StaticRouter } from 'react-router-dom';
import Login from './pages/Login';
import Playground from './pages/Playground';
import Tasks from './pages/Tasks';
import Class from './pages/Class';
import Statistics from './pages/Statistics';
import useDarkmodeStore from './stores/useDarkmodeStore';
import Home from './pages/Home';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import Classes from './pages/Classes';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0F0F0F',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          '--Paper-overlay': 'none !important',
          paddingRight: '0px',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 504,
      md: 859,
      lg: 1383,
      xl: 1536,
    },
  },
});

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 504,
      md: 854,
      lg: 1383,
      xl: 1536,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          paddingRight: '0px',
        },
      },
    },
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
  const loggedIn = localStorage.getItem('id');
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={isDarkmode ? darkTheme : defaultTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={loggedIn ? <Home /> : <Login />} />
            {/*<Route path="/register" element={<Register />} />*/}
            <Route path="/playground" element={loggedIn ? <Playground /> : <Login />} />
            <Route path="/tasks" element={loggedIn ? <Tasks /> : <Login />} />
            <Route path="/class/:id" element={loggedIn ? <Class /> : <Login />} />
            <Route path="/classes" element={loggedIn ? <Classes /> : <Login />} />
            <Route path="/statistics" element={loggedIn ? <Statistics /> : <Login />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
