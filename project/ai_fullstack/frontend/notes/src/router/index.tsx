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
import { AliveScope } from 'react-activation';

const Home = lazy(() => import('@/components/KeepAliveHome'));
const Mine = lazy(() => import('@/pages/mine.tsx'));
const Login = lazy(() => import('@/pages/login.tsx'));
const Order = lazy(() => import('@/pages/order.tsx'));
const Chat = lazy(() => import('@/pages/chat.tsx'));
const PostLayout = lazy(() => import('@/layouts/PostLayout'));
const PostDetail = lazy(() => import('@/pages/post/index'));

export default function RouterConfig({ children }: { children?: React.ReactNode }) {
    return (
        <BrowserRouter>
        {/* 拥有了keep alive 功能 */}
            <AliveScope>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/login" element={<Login />} />

                        <Route path="/post" element={<PostLayout />}>
                            <Route path=":id" element={<PostDetail />} />
                        </Route>

                        {/* 布局组件 */}
                        <Route path="/" element={<MainLayout />}>
                            <Route path="" element={<Home />} />
                            <Route path="mine" element={<Mine />} />
                            <Route path="order" element={<Order />} />
                            <Route path="chat" element={<Chat />} />
                        </Route>
                    </Routes>
                </Suspense>
            </AliveScope>
            {children}
        </BrowserRouter>
    )
}