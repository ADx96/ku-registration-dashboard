import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
//
import UserPage from '../pages/UserPage';
import LoginPage from '../pages/LoginPage';
import Page404 from '../pages/Page404';
import DashboardAppPage from '../pages/DashboardAppPage';
import RegistrationPage from '../pages/RegistrationPage';
import ReportsPage from '../pages/ReportsPage';
import ProtectedRoute from './ProtectedRoute';
import PrivateRoute from './PrivateRoute';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to='/dashboard/app' />, index: true },
        {
          path: 'app',
          element: <ProtectedRoute children={<DashboardAppPage />} />,
        },
        { path: 'user', element: <ProtectedRoute children={<UserPage />} /> },
        {
          path: 'registrations',
          element: <ProtectedRoute children={<RegistrationPage />} />,
        },
        {
          path: 'reports',
          element: <ProtectedRoute children={<ReportsPage />} />,
        },
      ],
    },
    {
      path: '/',
      element: <PrivateRoute children={<LoginPage />} />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to='/404' /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to='/404' replace />,
    },
  ]);

  return routes;
}
