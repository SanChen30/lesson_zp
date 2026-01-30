import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
    // Link 点击跳转首页
    let navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 6000)
    }, [])
    return (
        <>
            NotFound, 6秒后跳转首页
        </>
    )
}

export default NotFound;