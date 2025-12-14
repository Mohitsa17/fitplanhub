import { Navigate } from 'react-router-dom';

const RoleRoute = ({ children, allowedRole }) => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    let user = null;

    try {
        user = JSON.parse(userStr);
    } catch (e) {
        console.error('Error parsing user from localStorage', e);
    }

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== allowedRole) {
        // Redirect to appropriate home page based on actual role
        if (user.role === 'trainer') {
            return <Navigate to="/trainer/dashboard" replace />;
        } else {
            return <Navigate to="/feed" replace />;
        }
    }

    return children;
};

export default RoleRoute;
