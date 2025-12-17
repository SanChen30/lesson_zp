// router 模块 定义路由

import {
    createRouter, // 创建路由实例
    createWebHashHistory // 创建哈希路由模式
} from 'vue-router'

import Home from '../views/Home.vue';
import About from '../views/About.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
];

// 实例化路由，负责前端路由
const router = createRouter({
    // 访问历史 hash 路由 #/about
    history: createWebHashHistory(), 
    // 路由配置数组
    routes: routes 
})

export default router; // 导出路由实例