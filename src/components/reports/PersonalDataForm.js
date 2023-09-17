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

const PersonalDataForm = ({
  selected,
  handleChange,
  handleDataChange,
  paramsData,
}) => {
  return (
    <>
      <Grid item xs={12} md={3}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>
              Search With Name
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={selected.value1}
              onChange={handleChange}
              name='value1'
              label='Search With Name'
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          {selected.value1 && (
            <TextField
              fullWidth
              onChange={handleDataChange}
              value={paramsData.name}
              name='name'
              label='Enter Name'
            />
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={3}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>
              Search With University Id
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={selected.value2}
              onChange={handleChange}
              name='value2'
              label='Search With University Id'
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          {selected.value2 && (
            <TextField
              fullWidth
              onChange={handleDataChange}
              value={paramsData.UniId}
              name='UniId'
              label='Enter University Id'
            />
          )}
        </Stack>
      </Grid>
      <Grid item xs={12} md={3}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>
              Search With Order Number
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={selected.value3}
              name='value3'
              onChange={handleChange}
              label='Search With Order Number'
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          {selected.value3 && (
            <TextField
              fullWidth
              value={paramsData.orderNumber}
              onChange={handleDataChange}
              name='orderNumber'
              label='Enter Order Number'
            />
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={3}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>
              Search With Status
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={selected.value4}
              name='value4'
              onChange={handleChange}
              label='Search With Order Number'
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          {selected.value4 && (
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-helper-label'>
                Select Status
              </InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={paramsData.status}
                name='status'
                onChange={handleDataChange}
                label=' Select Status'
              >
                <MenuItem value={'accepted'}>accepted</MenuItem>
                <MenuItem value={'rejected'}>rejected</MenuItem>
                <MenuItem value={'pending'}>pending</MenuItem>
                <MenuItem value={'underreview'}>underreview</MenuItem>
                <MenuItem value={'reviewed'}>reviewed</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>
      </Grid>
    </>
  );
};

export default PersonalDataForm;
