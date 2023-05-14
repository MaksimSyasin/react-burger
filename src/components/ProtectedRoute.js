import { Navigate } from 'react-router-dom';


export const ProtectedRouteElement = ({ element, isAuth, routeWithAuthrized, replaceRoute }) => {
    if (isAuth && routeWithAuthrized || !isAuth && !routeWithAuthrized) {
        return element;
    } else {
        return <Navigate to={replaceRoute} replace />
    }
} 

