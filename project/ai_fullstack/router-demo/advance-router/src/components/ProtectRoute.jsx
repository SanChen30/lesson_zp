import { Navigate } from 'react-router-dom';

export default function ProtectRoute({ children }) {
    const isLogin = localStorage.getItem('isLogin') === 'true';
    if(!isLogin) {
        return <Navigate to='/login' />
    }
    return (
        <>
          {children}
        </>
    )
}