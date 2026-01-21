import axios from 'axios'
import { useUserStore } from '@/store/useUserStore';
// 接口地址都以 /api 开头
// axios.defaults.baseURL = 'http://localhost:5173/api'
axios.defaults.baseURL = 'http://localhost:3000/api'

axios.interceptors.request.use(config => {
    // console.log('---------', config);
    const token = useUserStore.getState().token;
    // console.log(token, '-----');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})
// 拦截器
// axios api 请求大管家，关于请求的一切都会给我们
// data 只是其中的一项
axios.interceptors.response.use(res => {
    // console.log('---------', res);
    if (res.status != 200) {
        console.log('出错了');
        return;
    }
    return res.data;
})

export default axios 