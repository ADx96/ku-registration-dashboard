import { Container, Stack, Card, Typography } from '@mui/material';
import React from 'react';
import DataExportForm from './DataExportForm';
import CustomTabs from 'src/components/tabs';
import UserDataExport from './UserDataExport';

const Reports = () => {
  return (
    <Container>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        mb={5}
      >
        <Typography variant='h4' gutterBottom>
          طلبات التسجيل
        </Typography>
      </Stack>

      <Card>
        <CustomTabs
          userComponent={<UserDataExport />}
          registrationComponent={<DataExportForm />}
        />
      </Card>
    </Container>
  );
};

export default Reports;
