import { KeepAlive } from 'react-activation';
import Home from '@/pages/home.tsx';

const KeepAliveHome = () => {
    return (
        <KeepAlive name="home" saveScrollPosition="screen">
            <Home />
        </KeepAlive>
    )
}

export default KeepAliveHome;