// pnpm i react-router-dom
import {
    Suspense,
    lazy,
} from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Loading from '@/components/Loading';
import MainLayout from '@/layouts/MainLayout.tsx';

const Home = lazy(() => import('@/pages/home.tsx'));
const Mine = lazy(() => import('@/pages/mine.tsx'));
const Login = lazy(() => import('@/pages/login.tsx'));
const Order = lazy(() => import('@/pages/order.tsx'));
const Chat = lazy(() => import('@/pages/chat.tsx'));

export default function RouterConfig({ children }: { children?: React.ReactNode }) {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<MainLayout />}>
                        <Route path="" element={<Home />} />
                        <Route path="mine" element={<Mine />} />
                        <Route path="order" element={<Order />} />
                        <Route path="chat" element={<Chat />} />
                    </Route>
                </Routes>
            </Suspense>
            {children}
        </BrowserRouter>
    )
}