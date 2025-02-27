import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { NAV_COLORS } from '../types/navColors';

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

export default function Register() {
  const [firstnameError, setFirstnameError] = React.useState(false);
  const [firstnameErrorMessage, setFirstnameErrorMessage] = React.useState('');
  const [lastnameError, setLastnameError] = React.useState(false);
  const [lastnameErrorMessage, setLastnameErrorMessage] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      email: data.get('email'),
      password: data.get('password'),
    });
    navigate('/');
  };

  const validateInputs = () => {
    const firstname = document.getElementById('firstname') as HTMLInputElement;
    const lastname = document.getElementById('lastname') as HTMLInputElement;
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

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Passord må være minst 6 karakterer langt.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!firstname.value) {
      setFirstnameError(true);
      setFirstnameErrorMessage('Vennligt fyll inn fornavn');
      isValid = false;
    } else {
      setFirstnameError(false);
      setFirstnameErrorMessage('');
    }

    if (!lastname.value) {
      setLastnameError(true);
      setLastnameErrorMessage('Vennligt fyll inn fornavn');
      isValid = false;
    } else {
      setLastnameError(false);
      setLastnameErrorMessage('');
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
                userSelect: 'none',
                msUserSelect: 'none',
                MozUserSelect: 'none',
                WebkitUserSelect: 'none',
              }}
            ></img>
            <Typography color={NAV_COLORS.text} typography="h6" fontWeight="medium" marginLeft={0.25}>
              EduCode
            </Typography>
          </Stack>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <TextField
                error={firstnameError}
                helperText={firstnameErrorMessage}
                id="firstname"
                type="firstname"
                name="firstname"
                placeholder="Fornavn"
                autoComplete="firstname"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={firstnameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <TextField
                error={lastnameError}
                helperText={lastnameErrorMessage}
                id="lastname"
                type="lastname"
                name="lastname"
                placeholder="Etternavn"
                autoComplete="lastname"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={lastnameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <TextField
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
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <TextField
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
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
              Registrer
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Har du allerede bruker?
              <Link href="/login" variant="body2" sx={{ alignSelf: 'center', ml: 1 }}>
                Logg inn
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </Box>
  );
}
