import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
//import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
//import { NAV_COLORS } from '../types/navColors';
import { backendUrl } from '../config';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }
    const user = { email, password };
    try {
      //const response = await fetch('http://localhost:6001/login', { When running local backend
      const response = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
      });
      const result = await response.json();
      localStorage.setItem('id', result[0].user_id);
      localStorage.setItem('school_id', result[0].school_id);
      localStorage.setItem('class_id', result[0].class_id);
      localStorage.setItem('email', result[0].email);
      localStorage.setItem('full_name', result[0].firstname + ' ' + result[0].lastname);
      localStorage.setItem('is_admin', result[0].is_admin);
    } catch (error) {
      console.log('Could not login', error);
    }
    navigate(0);
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Vennligst bruk en gyldig e-post adresse.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 4) {
      setPasswordError(true);
      setPasswordErrorMessage('Passord må være minst 4 karakterer langt.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Box>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Stack direction="row" gap={1} justifyContent="center" mb={2}>
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
            />
            {/*
            <Typography color={NAV_COLORS.text} typography="h6" fontWeight="medium" marginLeft={0.25}>
              website name
            </Typography>
            */}
          </Stack>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <TextField
                value={email}
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="e-post"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <TextField
                value={password}
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" onClick={handleSubmit} sx={{ textTransform: 'none' }}>
              Logg inn
            </Button>
          </Box>
          {/**
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Har du ikke bruker?
              <Link href="/register" variant="body2" sx={{ alignSelf: 'center', ml: 1 }}>
                Registrer deg
              </Link>
            </Typography>
          </Box>**/}
        </Card>
      </SignInContainer>
    </Box>
  );
}
