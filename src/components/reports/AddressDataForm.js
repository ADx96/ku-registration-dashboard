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

const AddressDataForm = ({
  paramsData,
  selectedAddress,
  handleChangeAddress,
  handleDataChangeAddress,
}) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>
              Search With City
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={selectedAddress.value1}
              onChange={handleChangeAddress}
              name='value1'
              label='Search With City'
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          {selectedAddress.value1 && (
            <TextField
              fullWidth
              value={paramsData.address.city}
              onChange={handleDataChangeAddress}
              name='city'
              label='Enter city'
            />
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>
              Search With Governor
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={selectedAddress.value2}
              name='value2'
              onChange={handleChangeAddress}
              label='Search With Governor'
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          {selectedAddress.value2 && (
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-helper-label'>
                Select Governor
              </InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={paramsData.address.governor}
                name='governor'
                onChange={handleDataChangeAddress}
                label=' Select governor'
              >
                <MenuItem value={1}>محافظة العاصمة</MenuItem>
                <MenuItem value={2}>محافظة حولي</MenuItem>
                <MenuItem value={3}>محافظة الأحمدي</MenuItem>
                <MenuItem value={4}>محافظة الجهراء</MenuItem>
                <MenuItem value={5}>محافظة الفروانية</MenuItem>
                <MenuItem value={6}>محافظة مبارك الكبير</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>
      </Grid>
    </>
  );
};

export default AddressDataForm;
