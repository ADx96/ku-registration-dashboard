import { Grid, Typography, Container, Divider } from '@mui/material';
import React, { useState } from 'react';
import ExportButton from './ExportButton';
import PersonalDataForm from './PersonalDataForm';
import AddressDataForm from './AddressDataForm';
import SubjectDataForm from './SubjectDataForm';
import registrationApi from 'src/api/registrationApi';
import { getGovernor, removeEmptyKeys } from 'src/helpers/helpers';

const DataExportForm = () => {
  const [newData, setNewData] = useState([]);

  const [selected, setSelected] = useState({
    value1: false,
    value2: false,
    value3: false,
    value4: false,
  });

  const [selectedAddress, setSelectedAddress] = useState({
    value1: false,
    value2: false,
  });

  const [selectedSubject, setSelectedSubject] = useState({
    value1: false,
    value2: false,
    value3: false,
  });

  const [paramsData, setParams] = useState({
    name: '',
    UniId: '',
    orderNumber: '',
    status: '',
    address: {
      city: '',
      governor: '',
    },
    subject: {
      subjects: '',
      fall: '',
      semester: '',
    },
  });

  const handleDataChangeSubject = (e) => {
    const { name, value } = e.target;

    setParams((prevState) => ({
      ...prevState,
      subject: { ...prevState.subject, [name]: value },
    }));
  };
  const handleDataChangeAddress = (e) => {
    const { name, value } = e.target;

    setParams((prevState) => ({
      ...prevState,
      address: { ...prevState.address, [name]: value },
    }));
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;

    setParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setSelectedAddress({ ...selectedAddress, [name]: value });
  };
  const handleChangeSubject = (e) => {
    const { name, value } = e.target;
    setSelectedSubject({ ...selectedSubject, [name]: value });
  };

  const newParams = {
    filters: {
      name: { $contains: paramsData.name },
      UniId: paramsData.UniId && { $eq: paramsData.UniId },
      orderNumber: { $eq: paramsData.orderNumber },
      status: { $eq: paramsData.status },
      registrationAdress: {
        city: { $contains: paramsData.address.city },
        governor: { $eq: getGovernor(paramsData.address.governor) },
      },
      registrationSubject: {
        fall: { $eq: paramsData.subject.fall },
        semester: { $eq: paramsData.subject.semester },
        subjects: { $contains: paramsData.subject.subjects },
      },
    },
  };

  const handleGetData = async () => {
    const filterParams = removeEmptyKeys(newParams);
    const { getItems } = registrationApi;
    const data = await getItems(filterParams);
    if (data) {
      const mappedData = data.data.map((data) => {
        const {
          name,
          UniId,
          comments,
          createdAt,
          email,
          isReviewed,
          mobile,
          orderNumber,
          registrationAdress,
          registrationSubject,
          status,
        } = data.attributes;

        const { block, city, governor, street, house } =
          registrationAdress.data.attributes;

        const { credits, fall, finishedCredits, reason, semester } =
          registrationSubject.data.attributes;

        return {
          orderNumber,
          name,
          UniId,
          email,
          mobile,
          comments,
          createdAt,
          isReviewed,
          status,
          block,
          city,
          governor,
          street,
          house,
          credits,
          fall,
          finishedCredits,
          reason,
          semester,
        };
      });
      setNewData(mappedData);
    }
  };
  return (
    <Grid container spacing={3} paddingX={'30px'}>
      <Grid item xs={12}>
        <Typography textAlign={'center'} variant='h4'>
          Registrations Report
        </Typography>
      </Grid>
      <Container style={{ marginTop: '20px' }}>
        <Divider light>البيانات الشخصية</Divider>
      </Container>
      <PersonalDataForm
        handleDataChange={handleDataChange}
        paramsData={paramsData}
        handleChange={handleChange}
        selected={selected}
      />
      <Container style={{ marginTop: '20px' }}>
        <Divider light>العنوان</Divider>
      </Container>
      <AddressDataForm
        paramsData={paramsData}
        handleDataChangeAddress={handleDataChangeAddress}
        handleChangeAddress={handleChangeAddress}
        selectedAddress={selectedAddress}
      />

      <Container style={{ marginTop: '20px' }}>
        <Divider light>العنوان</Divider>
      </Container>
      <SubjectDataForm
        paramsData={paramsData}
        handleDataChangeSubject={handleDataChangeSubject}
        handleChangeSubject={handleChangeSubject}
        selectedSubject={selectedSubject}
      />
      <Grid item xs={12} md={3}>
        <ExportButton handleGetData={handleGetData} newData={newData} />
      </Grid>
    </Grid>
  );
};

export default DataExportForm;
