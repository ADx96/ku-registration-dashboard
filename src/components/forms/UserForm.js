import {
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  DialogContent,
  FormControl,
  Select,
  InputLabel,
  DialogActions,
  Button,
  MenuItem,
  Stack,
  Alert,
} from '@mui/material';
import Iconify from 'src/components/iconify';

import React, { useEffect, useState } from 'react';
import useUsers from 'src/hooks/useUsers';

const UserForm = ({ setOpenDialog, openDialog }) => {
  const [alert, setShowAlert] = useState(false);
  const [error, setShowError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const { createMutation } = useUsers();
  const [user, setUser] = useState({
    username: '',
    email: '',
    confirmed: true,
    blocked: '',
    role: '',
    password: '',
  });

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleClose = (e) => {
    setOpenDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createMutation.mutateAsync(user);
      if (data) {
        setOpenDialog(false);
        setShowAlert(true);
        return;
      }
    } catch (e) {
      setShowError(true);

      console.error(e);
    }
  };
  return (
    <>
      <Dialog onClose={handleClose} open={openDialog}>
        <form onChange={handleChange}>
          <DialogTitle>انشاء مستخدم</DialogTitle>
          <DialogContent>
            <Grid marginTop={'6px'} container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  name='username'
                  label='User Name'
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name='password'
                  required
                  error={error && user.password.length < 6}
                  helperText={
                    error &&
                    user.password.length < 6 &&
                    'الرقم سري يجيب ان يكون اكثر من ٨ احرف'
                  }
                  fullWidth
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
                            icon={
                              showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  onChange={handleChange}
                  fullWidth
                  name='email'
                  label='Email address'
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id='demo-simple-select-helper-label'>
                    Role
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={user.role}
                    onChange={handleChange}
                    name='role'
                    label='Role'
                  >
                    <MenuItem value={3}>Registration Admin</MenuItem>
                    <MenuItem value={5}>Registration Management</MenuItem>
                    <MenuItem value={4}>Registration Reviewer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id='demo-simple-select-helper-label'>
                    Activate
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={user.blocked}
                    onChange={handleChange}
                    label='Activate'
                    name='blocked'
                  >
                    <MenuItem value={false}>Yes</MenuItem>
                    <MenuItem value={true}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button size='medium' variant='contained' onClick={handleClose}>
              الغاء
            </Button>
            <Button
              type='submit'
              size='medium'
              variant='contained'
              onClick={handleSubmit}
            >
              انشاء
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {alert && (
        <Stack sx={{ width: '100%' }} marginBottom={'30px'} spacing={4}>
          <Alert severity='success'>تمت الاضافة بنجاح</Alert>
        </Stack>
      )}
    </>
  );
};

export default UserForm;
