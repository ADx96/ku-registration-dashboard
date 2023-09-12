// component
import SvgColor from '../../../components/svg-color';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import ListAltIcon from '@mui/icons-material/ListAlt';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <DashboardIcon />,
    access: [
      'registrationAdmin',
      'registrationManagement',
      'registrationReviewer',
    ],
  },
  {
    title: 'registrations',
    path: '/dashboard/registrations',
    icon: <ListAltIcon />,
    access: [
      'registrationAdmin',
      'registrationManagement',
      'registrationReviewer',
    ],
  },
  {
    title: 'reports',
    path: '/dashboard/reports',
    icon: <ArticleIcon />,
    access: ['registrationAdmin'],
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
    access: ['registrationAdmin'],
  },
];

export default navConfig;
