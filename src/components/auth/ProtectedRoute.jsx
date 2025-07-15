import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { roleRoutePrefixes } from '@/constants/routes';

export const ProtectedRoute = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const location = useLocation();
    const userRole = user?.role;
    const allowedPrefix = roleRoutePrefixes[userRole];

    if (!isAuthenticated) {
        return <Navigate to="/authentication/signin" replace state={{ from: location }} />;
    }

    if (!allowedPrefix || !location.pathname.startsWith(allowedPrefix)) {
        return <Navigate to={`/${userRole}/dashboard`} replace />;
    }

    return <Outlet />;
};


