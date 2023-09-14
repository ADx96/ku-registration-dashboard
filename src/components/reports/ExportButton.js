import { Button } from '@mui/material';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import registrationApi from 'src/api/registrationApi';

function getGovernor(data) {
  if (!data) {
    return;
  }
  switch (data) {
    case 1:
      return 'محافظة العاصمة';
    case 2:
      return 'محافظة حولي';
    case 3:
      return 'محافظة الأحمدي';
    case 4:
      return 'محافظة الجهراء';
    case 5:
      return 'محافظة الفروانية';
    case 6:
      return 'محافظة مبارك الكبير';
    default:
      throw new Error('Unknown step');
  }
}

function removeEmptyKeys(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(removeEmptyKeys);
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    const cleanedValue = removeEmptyKeys(value);

    if (
      cleanedValue !== null &&
      cleanedValue !== undefined &&
      cleanedValue !== ''
    ) {
      acc[key] = cleanedValue;
    }

    return acc;
  }, {});
}

const ExportButton = ({ paramsData }) => {
  const [newData, setNewData] = useState([]);

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
    <CSVLink data={newData}>
      <Button onClick={handleGetData} variant='contained' size='medium'>
        Download me
      </Button>
    </CSVLink>
  );
};

export default ExportButton;
