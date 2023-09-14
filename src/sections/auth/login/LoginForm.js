import { useState, useEffect } from 'react';
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from 'src/components/iconify';
import { useLogin } from 'src/hooks/useLogin';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { mutation } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        setMessage('');
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);

  const [user, setUser] = useState({
    identifier: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await mutation.mutateAsync(user);

      if (data.message) {
        setShowAlert(true);
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      {showAlert && (
        <Stack sx={{ width: '100%' }} marginBottom={'30px'} spacing={4}>
          <Alert severity='error'>{message}</Alert>
        </Stack>
      )}
      <form onSubmit={handleLogin}>
        <Stack spacing={3}>
          <TextField
            required
            onChange={handleChange}
            name='identifier'
            label='Email address'
          />

          <TextField
            name='password'
            required
            onChange={handleChange}
            label='Password'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end'
                  >
                    <Iconify
                      icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={<Checkbox checked={false} name='remember' />}
            label='تذكرني'
          />
        </Stack>

        <LoadingButton fullWidth size='large' type='submit' variant='contained'>
          تسجيل الدخول
        </LoadingButton>
      </form>
    </>
  );
}
