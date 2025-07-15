import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (isAuthenticated && user?.role) {
        return <Navigate to={`/${user.role}/dashboard`} replace />;
    }

    return <Outlet />;
};


