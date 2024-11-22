import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const RouteProtector = () => {
    const cookies = new Cookies();
    const { TOKEN } = cookies.getAll();
    return (
        TOKEN ? <Outlet /> : <Navigate to='/' />
    )
}
