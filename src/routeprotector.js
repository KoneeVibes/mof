import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const RouteProtector = () => {
    const cookies = new Cookies();
    const location = useLocation();
    
    const { TOKEN } = cookies.getAll();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('token');

    return (
        TOKEN || query ? <Outlet /> : <Navigate to='/' />
    )
}
