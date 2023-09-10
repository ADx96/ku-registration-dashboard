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
} from '@mui/material';
import Iconify from 'src/components/iconify';

import React, { useState } from 'react';

const UserForm = ({ setOpenDialog, openDialog }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    confirmed: true,
    blocked: '',
    role: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleClose = (e) => {
    setOpenDialog(false);
  };

  const handleSubmit = (e) => {
    setOpenDialog(false);
  };
  return (
    <Dialog onClose={handleClose} open={openDialog}>
      <form onChange={handleChange}>
        <DialogTitle>انشاء مستخدم</DialogTitle>
        <DialogContent>
          <Grid marginTop={'6px'} container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField required fullWidth name='username' label='User Name' />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name='password'
                required
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
                  label='Role'
                  onChange={handleChange}
                >
                  <MenuItem value={4}>Registration Admin</MenuItem>
                  <MenuItem value={5}>Registration Management</MenuItem>
                  <MenuItem value={6}>Registration Reviewer</MenuItem>
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
                  label='Activate'
                  onChange={handleChange}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
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
  );
};

export default UserForm;
