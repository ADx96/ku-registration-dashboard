// @mui
import PropTypes from 'prop-types';
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
} from '@mui/material';
// utils
import { fDateTime } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppNewsUpdate({ title, subheader, list, ...other }) {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/dashboard/registrations');
  };
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          onClick={handleNavigation}
          size='small'
          color='inherit'
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          مشاهدة الكل
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

function NewsItem({ news }) {
  const { image, name, orderNumber, UniId, email, createdAt, mobile } = news;

  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      <Box
        component='img'
        alt={name}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color='inherit' variant='subtitle2' underline='hover' noWrap>
          {name}
        </Link>

        <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
          {email}
        </Typography>
      </Box>

      <Typography
        variant='caption'
        sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}
      >
        {UniId}
      </Typography>
      <Typography
        variant='caption'
        sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}
      >
        {mobile}
      </Typography>

      <Typography
        variant='caption'
        sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}
      >
        {`#${orderNumber}`}
      </Typography>
      <Typography
        variant='caption'
        sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}
      >
        {fDateTime(createdAt)}
      </Typography>
    </Stack>
  );
}
