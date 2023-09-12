import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography, CircularProgress } from '@mui/material';
// components
import {
  AppNewsUpdate,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';
import {
  useGetRegistrations,
  useGetRegistrationsCount,
} from 'src/hooks/useRegistrationData';
import { useGetUserData } from 'src/hooks/useLogin';

// ----------------------------------------------------------------------

const params = {
  pagination: {
    limit: 5,
    sort: 'createdAt:desc',
  },
};

const successParams = {
  filters: {
    status: {
      $eq: 'success',
    },
  },
};

const rejectedParams = {
  filters: {
    status: {
      $eq: 'rejected',
    },
  },
};
const pendingParams = {
  filters: {
    status: {
      $eq: 'pending',
    },
  },
};
const underReviewParams = {
  filters: {
    status: {
      $eq: 'underreview',
    },
  },
};
export default function DashboardAppPage() {
  const { data, isLoading } = useGetRegistrations(params);

  const { data: userData, isLoading: isLoadingUser } = useGetUserData();

  const { data: successCountData, isLoading: isLoadingSuccessCount } =
    useGetRegistrationsCount(successParams, 'success');

  const { data: pendingCountData, isLoading: isLoadingPendingCount } =
    useGetRegistrationsCount(pendingParams, 'pending');

  const { data: underReviewCountData, isLoading: isLoadingUnderReviewCount } =
    useGetRegistrationsCount(underReviewParams, 'underreview');

  const { data: rejectedCountData, isLoading: isLoadingRejectedCount } =
    useGetRegistrationsCount(rejectedParams, 'rejected');

  const newData = data?.data;

  if (isLoadingUser || isLoading) {
    return <CircularProgress />;
  }

  const newUserData = userData.role.name;

  return (
    <>
      <Helmet>
        <title> لوحة تحكم التسجيل </title>
      </Helmet>

      <Container maxWidth='xl'>
        <Typography variant='h4' sx={{ mb: 5 }}>
          مرحبًا، اهلا بعودتك
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              total={
                isLoadingSuccessCount
                  ? 0
                  : successCountData.meta.pagination.total
              }
              color='success'
              title='الطلبات المقبولة'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              total={
                isLoadingPendingCount
                  ? 0
                  : pendingCountData.meta.pagination.total
              }
              title='الطبات الجديدة'
              color='info'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title='طلبات تحت النظر'
              total={
                isLoadingUnderReviewCount
                  ? 0
                  : underReviewCountData.meta.pagination.total
              }
              color='warning'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              total={
                isLoadingRejectedCount
                  ? 0
                  : rejectedCountData.meta.pagination.total
              }
              title='الطلبات المرفوضة'
              color='error'
            />
          </Grid>
          <Grid item xs={12} md={6} lg={10}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <AppNewsUpdate
                title='News Update'
                list={newData.map((data, index) => ({
                  id: data.id,
                  UniId: data.attributes.UniId,
                  orderNumber: data.attributes.orderNumber,
                  name: data.attributes.name,
                  email: data.attributes.email,
                  mobile: data.attributes.mobile,
                  image: `/assets/images/covers/cover_${index + 1}.jpg`,
                  createdAt: data.attributes.createdAt,
                }))}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppWebsiteVisits
              hidden={!newUserData === 'registrationAdmin'}
              title='Website Visits'
              subheader='(+43%) than last year'
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              hidden={!newUserData === 'registrationAdmin'}
              title='Conversion Rates'
              subheader='(+43%) than last year'
              chartData={[
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
