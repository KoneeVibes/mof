import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const RouteProtector = () => {
    const cookies = new Cookies();
    const { USER } = cookies.getAll();
    return (
        USER ? <Outlet /> : <Navigate to='/' />
    )
}
