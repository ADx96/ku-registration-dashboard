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

const SubjectDataForm = ({
  paramsData,
  selectedSubject,
  handleDataChangeSubject,
  handleChangeSubject,
}) => {
  const yearRange = `${new Date().getFullYear()} / ${
    new Date().getFullYear() + 1
  } `;
  return (
    <>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>
              Search With Subject
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={selectedSubject.value1}
              name='value1'
              onChange={handleChangeSubject}
              label='Search With Subject'
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          {selectedSubject.value1 && (
            <TextField
              fullWidth
              onChange={handleDataChangeSubject}
              value={paramsData.subjects}
              name='subjects'
              label='Enter Subject'
            />
          )}
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>
              Search With fall
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={selectedSubject.value2}
              name='value2'
              onChange={handleChangeSubject}
              label='Search With fall'
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          {selectedSubject.value2 && (
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-helper-label'>
                Select Fall
              </InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={paramsData.fall}
                name='fall'
                onChange={handleDataChangeSubject}
                label=' Select fall'
              >
                <MenuItem value={yearRange}>{yearRange}</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>
              Search With Semester
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={selectedSubject.value3}
              name='value3'
              onChange={handleChangeSubject}
              label='Search With Semester'
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          {selectedSubject.value3 && (
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-helper-label'>
                Select Semester
              </InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={paramsData.semester}
                name='semester'
                onChange={handleDataChangeSubject}
                label=' Select semester'
              >
                <MenuItem value={'الأول'}>الأول</MenuItem>
                <MenuItem value={'الثاني'}>الثاني </MenuItem>
                <MenuItem value={'الصيفي'}>الصيفي</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>
      </Grid>
    </>
  );
};

export default SubjectDataForm;
