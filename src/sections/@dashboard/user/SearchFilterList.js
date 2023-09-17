import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import React, { useEffect, useState, useMemo } from 'react';
import { removeEmptyKeys } from 'src/helpers/helpers';
import { useGetRegistrations } from 'src/hooks/useRegistrationData';

const SearchFilterList = () => {
  const yearRange = `${new Date().getFullYear()} / ${
    new Date().getFullYear() + 1
  } `;

  const [values, setValues] = useState({
    status: '',
    semester: '',
    fall: '',
  });

  const [params, setParams] = useState('');
  useGetRegistrations(params);

  const newParams = useMemo(
    () => ({
      filters: {
        status: { $contains: values.status },
        registrationSubject: {
          fall: { $contains: values.fall },
          semester: { $contains: values.semester },
        },
      },
    }),
    [values.status, values.fall, values.semester]
  );

  useEffect(() => {
    const selectedValuesArray = Object.values(values);
    const hasValueSelected = selectedValuesArray.some((value) => value !== '');

    if (hasValueSelected) {
      const filterParams = removeEmptyKeys(newParams);
      setParams(filterParams);
    }
  }, [values, newParams]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  return (
    <Stack direction='row' width={'700px'} spacing={4}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-helper-label'>
          Select Status
        </InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={values.status}
          name='status'
          onChange={handleChange}
          label=' Select Status'
        >
          <MenuItem value={'accepted'}>accepted</MenuItem>
          <MenuItem value={'rejected'}>rejected</MenuItem>
          <MenuItem value={'pending'}>pending</MenuItem>
          <MenuItem value={'underreview'}>underreview</MenuItem>
          <MenuItem value={'reviewed'}>reviewed</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-helper-label'>
          Select semester
        </InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={values.semester}
          name='semester'
          onChange={handleChange}
          label=' Select Status'
        >
          <MenuItem value={'الأول'}>الأول</MenuItem>
          <MenuItem value={'الثاني'}>الثاني </MenuItem>
          <MenuItem value={'الصيفي'}>الصيفي</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-helper-label'>
          Select Fall
        </InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={values.fall}
          name='fall'
          onChange={handleChange}
          label=' Select Status'
        >
          <MenuItem value={yearRange}>{yearRange}</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SearchFilterList;
