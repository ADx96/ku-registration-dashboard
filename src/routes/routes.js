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
import RegistrationDetailsPage from 'src/pages/RegistrationDetailsPage';

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
          element: (
            <ProtectedRoute
              allowedRoles={'any'}
              children={<DashboardAppPage />}
            />
          ),
        },
        {
          path: 'user',
          element: (
            <ProtectedRoute
              allowedRoles={'registrationAdmin'}
              children={<UserPage />}
            />
          ),
        },
        {
          path: 'registrations',
          element: (
            <ProtectedRoute
              allowedRoles={'any'}
              children={<RegistrationPage />}
            />
          ),
        },
        {
          path: 'registrations/:id',
          element: (
            <ProtectedRoute
              allowedRoles={'any'}
              children={<RegistrationDetailsPage />}
            />
          ),
        },
        {
          path: 'reports',
          element: (
            <ProtectedRoute
              allowedRoles={'registrationAdmin'}
              children={<ReportsPage />}
            />
          ),
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
