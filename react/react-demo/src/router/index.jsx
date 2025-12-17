import { 
    Routes, // 前端的路由总管
    Route, // 具体路由实例
} from 'react-router-dom';

import Home from '../pages/Home.jsx'; // 首页
import About from '../pages/About.jsx'; // 关于页

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    )
}