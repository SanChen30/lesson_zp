// 严格模式，代码会执行两次，一次是执行，一次是测试 review
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// vite 帮我们编译 stylus 为 css
import './index.styl' // 引入全局样式 用stylus
import App from './App.jsx' // 引入 App 组件

// 将 App 组件挂载到 root 元素上渲染 render
createRoot(document.getElementById('root')).render(
  // 函数组件的名字，类html标签，自定义组件
  <StrictMode>
    <App />
  </StrictMode>,
)
