import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import UserDataForm from './UserDataForm';
import { removeEmptyKeys } from 'src/helpers/helpers';
import userApi from 'src/api/usersApi';
import ExportButton from './ExportButton';

const UserDataExport = () => {
  const [newData, setNewData] = useState([]);

  const [selected, setSelected] = useState({
    value1: false,
    value2: false,
    value3: false,
  });

  const [paramsData, setParams] = useState({
    email: '',
    username: '',
    role: {
      id: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;

    setParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDataRoleChange = (e) => {
    const { name, value } = e.target;

    setParams((prevState) => ({
      ...prevState,
      role: { ...prevState.address, [name]: value },
    }));
  };

  const newParams = {
    filters: {
      email: { $contains: paramsData.email },
      username: { $eq: paramsData.username },
      role: {
        id: { $eq: paramsData.role.id },
      },
    },
  };

  const handleGetData = async () => {
    const filterParams = removeEmptyKeys(newParams);
    const { getItems } = userApi;
    const data = await getItems(filterParams);
    if (data) {
      const mappedData = data.data.map((data) => {
        const { email, username, confirmed, role } = data.attributes;
        const roleName = role.data.attributes.name;
        return {
          roleName,
          email,
          username,
          confirmed,
        };
      });
      setNewData(mappedData);
    }
  };
  return (
    <Grid container spacing={3} paddingX={'30px'}>
      <Grid item xs={12}>
        <Typography textAlign={'center'} variant='h4'>
          Users Report
        </Typography>
      </Grid>
      <UserDataForm
        handleDataRoleChange={handleDataRoleChange}
        handleChange={handleChange}
        selectedVal={selected}
        handleDataChange={handleDataChange}
        paramsData={paramsData}
      />
      <Grid textAlign={'center'} item xs={12}>
        <ExportButton handleGetData={handleGetData} newData={newData} />
      </Grid>
    </Grid>
  );
};

export default UserDataExport;
