// http 请求库
import axios from 'axios';
// 比 fetch 好，模块化
// api 目录下管理所有的请求
const service = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 60000, // 60 秒超时
})

export const chat = (message) => {
    return service.post('/chat', {
        message
    })
}