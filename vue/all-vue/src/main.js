import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入路由模块
import router from './router';

// 现代前端应用
// 组件化、响应式...
// 和 DOM 编程 say bye
createApp(App)
// 启用路由模块
.use(router) 
// 挂载在 id 为 app 的元素上
.mount('#app')
