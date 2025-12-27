import { createContext } from 'react';
import Page from './views/Page.jsx';

// 跨层级通信数据状态的容器

// 直接导出 UserContext 上下文对象，可以多次导出，用 import { UserContext } from './contexts/UserContext.jsx'; 导入
export const UserContext = createContext(null); // 第一步

// 但是导出组件只能一次
export default function App() {
    const user = {
        name:"Andrew"
    }; 
    return (
        // context 上下文提供给 Page 及其子组件，组件树共享
        // context 就是存储上下文的数据容器
        // Provider 组件是数据提供者
        // value 就是 context 上下文里面的值
        <UserContext.Provider value={user}>  // 第二步
            <Page />
        </UserContext.Provider>
    )
}