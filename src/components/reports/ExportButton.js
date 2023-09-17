import { Button } from '@mui/material';
import React from 'react';
import { CSVLink } from 'react-csv';

const ExportButton = ({ handleGetData, newData }) => {
  return (
    <CSVLink data={newData}>
      <Button onClick={handleGetData} variant='contained' size='medium'>
        تحميل الملف
      </Button>
    </CSVLink>
  );
};

export default ExportButton;
