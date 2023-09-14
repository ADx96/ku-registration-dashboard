import React from 'react';

import {
  Card,
  Stack,
  Container,
  Typography,
  Grid,
  CircularProgress,
  ListItemText,
  Divider,
  List,
  ListItem,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetRegistration } from 'src/hooks/useRegistrationData';
import Label from '../label';
import { AppOrderTimeline } from 'src/sections/@dashboard/app';
const Details = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetRegistration(id);

  if (isLoading) {
    return <CircularProgress />;
  }

  const {
    name,
    mobile,
    email,
    UniId,
    orderNumber,
    createdAt,
    isReviewed,
    status,
    comments,
    registrationSubject,
    registrationAdress,
  } = data;

  const { block, city, governor, street, house } =
    registrationAdress.data.attributes;

  const {
    subjects,
    reason,
    finishedCredits,
    fall,
    credits,
    OtherReason,
    semester,
  } = registrationSubject.data.attributes;

  return (
    <Container>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        mb={5}
      >
        <Typography variant='h4' gutterBottom>
          بيانات التسجيل
        </Typography>
        <Typography variant='h4' gutterBottom>
          {`#${orderNumber}`}
        </Typography>
        <Typography variant='h4' gutterBottom>
          {name}
        </Typography>
      </Stack>

      <Card>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography textAlign={'center'} variant='h4'>
              البيانات
            </Typography>
            <Container style={{ marginTop: '20px' }}>
              <Divider light> البيانات الشخصية</Divider>
            </Container>
          </Grid>
          <Container style={{ marginTop: '20px' }}>
            <Divider light />
          </Container>

          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>الاسم الثلاثي</Typography>
            <Typography variant='p'>{name}</Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>النقال</Typography>
            <Typography variant='p'>{mobile}</Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>رقم الجامعي</Typography>
            <Typography variant='p'>{UniId}</Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>البريد</Typography>
            <Typography variant='p'>{email}</Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>حالة المراجعة</Typography>
            <Typography variant='p'>
              {isReviewed ? 'تمت المراجعة' : 'لم تتم المراجعة'}
            </Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>الحالة</Typography>
            <Label
              color={
                (status === 'rejected' && 'error') ||
                (status === 'accepted' && 'success') ||
                (status === 'underreview' && 'info') ||
                (status === 'reviewed' && 'warning') ||
                (status === 'pending' && 'warning')
              }
            >
              {status}
            </Label>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>تاريخ الطلب</Typography>
            <Typography variant='p'>{createdAt}</Typography>
          </Grid>
          <Container style={{ marginTop: '20px' }}>
            <Divider light>العنوان</Divider>
          </Container>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>المحافظة</Typography>
            <Typography variant='p'>{governor}</Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>المدينة</Typography>
            <Typography variant='p'>{city}</Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>قطعة</Typography>
            <Typography variant='p'>{block}</Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>الشارع</Typography>
            <Typography variant='p'>{street}</Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>المنزل</Typography>
            <Typography variant='p'>{house}</Typography>
          </Grid>
          <Container style={{ marginTop: '20px' }}>
            <Divider light> المقرر </Divider>
          </Container>

          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>الفصل</Typography>
            <Typography variant='p'>{semester}</Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'> الوحدات المجتازة</Typography>
            <Typography variant='p'>{finishedCredits}</Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>العام الدراسي</Typography>
            <Typography variant='p'>{fall}</Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>الوحداة المسجلة</Typography>
            <Typography variant='p'>{credits}</Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>السبب</Typography>
            <Typography variant='p'>{reason}</Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12} md={4}>
            <Typography variant='h5'>سبب آخر ان وجد</Typography>
            <Typography variant='p'>{OtherReason}</Typography>
          </Grid>
          <Grid textAlign={'center'} item xs={12}>
            <Typography variant='h5'> المواد المسجلة </Typography>
            <List>
              {subjects?.map((subject, index) => (
                <ListItem key={index} alignItems={'flex-start'}>
                  <ListItemText
                    style={{ textAlign: 'center' }}
                    primaryTypographyProps={{ fontSize: '25px' }}
                    secondaryTypographyProps={{ fontSize: '20px' }}
                    primary={subject.inputValue}
                    secondary={subject.inputValue2}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Container style={{ marginTop: '20px' }}>
            <Divider light />
          </Container>
          <Grid item xs={12} justifyContent={'center'} alignItems={'center'}>
            <Container>
              <Stack
                direction='column'
                alignItems='center'
                justifyContent='center'
                textAlign={'center'}
                s
                mb={5}
              >
                <AppOrderTimeline
                  style={{
                    alignItems: 'center',
                    width: '50%',
                    justifyContent: 'center',
                  }}
                  title='تعليقات المراجع'
                  list={comments.map(
                    (data, index) =>
                      ({
                        id: index,
                        title: data[index] || [],
                        type: `order${index + 1}`,
                        time: 'test',
                      } || null)
                  )}
                />
              </Stack>
            </Container>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Details;
