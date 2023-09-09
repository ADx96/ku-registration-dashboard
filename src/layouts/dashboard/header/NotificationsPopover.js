import PropTypes from 'prop-types';

import { useState } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  CircularProgress,
} from '@mui/material';
// utils

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { useGetRegistrations } from 'src/hooks/useRegistrationData';
import { useNavigate } from 'react-router-dom';
import { fDateTime } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const navigate = useNavigate();
  const params = {
    pagination: {
      limit: 5,
      sort: 'createdAt:desc',
    },
  };
  const { data, isLoading } = useGetRegistrations(params);
  const newData = data?.data;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleShowAll = () => {
    navigate('dashboard/registrations');
  };

  return (
    <>
      <IconButton
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={isLoading ? 0 : newData.length} color='error'>
          <Iconify icon='eva:bell-fill' />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='subtitle1'>الاشعارات</Typography>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                طلب جديد {newData.length} لديك
              </Typography>
            )}
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
            <List
              disablePadding
              subheader={
                <ListSubheader
                  disableSticky
                  sx={{ py: 1, px: 2.5, typography: 'overline' }}
                >
                  الطلبات الجديد
                </ListSubheader>
              }
            >
              {newData.slice(0, 2).map((data) => (
                <NotificationItem key={data.id} data={data.attributes} />
              ))}
            </List>

            <List
              disablePadding
              subheader={
                <ListSubheader
                  disableSticky
                  sx={{ py: 1, px: 2.5, typography: 'overline' }}
                >
                  الطلبات المقبله
                </ListSubheader>
              }
            >
              {newData.slice(2, 5).map((data) => (
                <NotificationItem key={data.id} data={data.attributes} />
              ))}
            </List>
          </Scrollbar>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button onClick={handleShowAll} fullWidth disableRipple>
            جميع الطلبات
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ data }) {
  const { avatar, title } = renderContent(data);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(data?.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant='caption'
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify
              icon='eva:clock-outline'
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {fDateTime(data?.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(data) {
  const title = (
    <Typography variant='subtitle2'>
      {data?.name}
      <Typography
        component='span'
        variant='body2'
        sx={{ color: 'text.secondary' }}
      >
        &nbsp; {`#${data?.orderNumber}`}
      </Typography>
    </Typography>
  );

  return {
    avatar: data?.avatar ? <img alt={data?.title} src={data?.avatar} /> : null,
    title,
  };
}
