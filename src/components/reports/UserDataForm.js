import React from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Stack,
  MenuItem,
  TextField,
  Select,
} from '@mui/material';

const UserDataForm = ({
  paramsData,
  handleDataChange,
  handleChange,
  handleDataRoleChange,
  selectedVal,
}) => {
  return (
    <>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>
              Search With Role
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={selectedVal.value1}
              name='value1'
              onChange={handleChange}
              label='Search With Role'
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          {selectedVal?.value1 && (
            <FormControl fullWidth required>
              <InputLabel id='demo-simple-select-helper-label'>Role</InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={paramsData.role.id}
                onChange={handleDataRoleChange}
                name='id'
                label='Role'
              >
                <MenuItem value={3}>Registration Admin</MenuItem>
                <MenuItem value={5}>Registration Management</MenuItem>
                <MenuItem value={4}>Registration Reviewer</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>
              Search With Email
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={selectedVal.value2}
              name='value2'
              onChange={handleChange}
              label='Search With Email'
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          {selectedVal.value2 && (
            <TextField
              type='email'
              fullWidth
              onChange={handleDataChange}
              value={paramsData.email}
              name='role'
              label='Enter Email'
            />
          )}
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>
              Search With User Name
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={selectedVal.value3}
              name='value3'
              onChange={handleChange}
              label='Search With User Name'
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          {selectedVal.value3 && (
            <TextField
              fullWidth
              onChange={handleDataChange}
              value={paramsData.username}
              name='username'
              label='Enter User Name'
            />
          )}
        </Stack>
      </Grid>
    </>
  );
};

export default UserDataForm;
