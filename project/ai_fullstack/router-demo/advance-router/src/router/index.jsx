import {
    lazy, // 懒加载
    Suspense //  Suspense 组件用于在加载组件时显示一个占位符，避免页面闪烁，用于包裹懒加载的组件
} from 'react';
import {
    Navigate,
    Routes, // 一组路由
    Route // 单个路由
} from 'react-router-dom';
import LoadingFallback from '../components/LoadingFallback/index2';

// import Home from './pages/Home';
const Home = lazy(() => import('../pages/Home')); // 链接直达about，不需home
// import About from './pages/About';
const About = lazy(() => import('../pages/About'));
const UserProfile = lazy(() => import('../pages/UserProfile'));

const Product = lazy(() => import('../pages/Product/index'));
const ProductDetail = lazy(() => import('../pages/Product/ProductDetail'));
const NewProduct = lazy(() => import('../pages/Product/NewProduct'));

const Login = lazy(() => import('../pages/Login'));

const Pay = lazy(() => import('../pages/Pay'));
const ProtectRoute = lazy(() => import('../components/ProtectRoute'));

const NotFound = lazy(() => import('../pages/NotFound'));

const NewPath = lazy(() => import('../pages/NewPath'));

export default function RouterConfig() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<About />}></Route>
                {/* 动态路由 
          http(s)://www.juejin.cn/user/123?keyword=123#/about
          协议://域名/path/:params?queryString
          */}
                <Route path='/user/:id' element={<UserProfile />}></Route>

                <Route path='/products' element={<Product />}>
                    <Route path=':productId' element={<ProductDetail />}></Route>
                    <Route path='new' element={<NewProduct />}></Route>
                </Route>

                <Route path='/login' element={<Login />}></Route>
                <Route path='/old-path' element={<Navigate replace to='/new-path' />}></Route>
                <Route path='/new-path' element={<NewPath />}></Route>
                {/* 鉴权的路由 */}
                <Route path='/pay' element={
                    <ProtectRoute>
                        <Pay />
                    </ProtectRoute>
                }></Route>

                <Route path='*' element={<NotFound />}></Route>
            </Routes>
        </Suspense>
    )
}