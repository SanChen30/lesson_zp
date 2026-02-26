import axios from 'axios'
import { useUserStore } from '@/store/useUserStore';
// 接口地址都以 /api 开头
// axios.defaults.baseURL = 'http://localhost:5173/api'
// axios.defaults.baseURL = 'http://localhost:3000/api'
const instance = axios.create({
    // baseURL: 'http://localhost:5173/api'
    baseURL: 'http://localhost:3000/api'
})

instance.interceptors.request.use(config => {
    // console.log('---------', config);
    const accessToken = useUserStore.getState().accessToken;
    // console.log(token, '-----');
    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
})
// 拦截器
// axios api 请求大管家，关于请求的一切都会给我们
// data 只是其中的一项
// 成功的响应
// 失败的响应

// 标记是否正在刷新 token
// refresh token + redo requests
let isRefreshing = false;
// 请求队列，用于存储需要重试的请求，第一个需要鉴权的请求失败后，后面也需要鉴权的请求不再发送
// 保存下来，等 refresh 完成后，再去发送，无缝的将之前的所有失败的请求，再请求，带上新 token 成功
let requestsQueue: any[] = [];
instance.interceptors.response.use(res => {
    // console.log('---------', res);
    return res.data;
}, async(err) => {
    console.log(err);
    // 刷新 token
    // 请求对象配置信息 config
    const { config, response } = err;
    // _retry 刻意标记 是否是重试的请求，默认undefined，避免 retry 死循环
    if(response?.status === 401 && !config._retry) {
        // 如果在刷新中，把后续请求放到队列中
        if(isRefreshing) {
            // 异步，未来 token refresh 后，再resolve
            return new Promise((resolve) => {
                requestsQueue.push((token: string) => {
                    config.headers.Authorization = `Bearer ${token}`;
                    resolve(instance(config));
                })
            })
        }
        config._retry = true; // retry 开关
        isRefreshing = true;

        try {
            // refresh
            const { refreshToken } = useUserStore.getState();
            if(refreshToken) {
                // 无感刷新token
                const res = await instance.post('/auth/refresh', {
                    refreshToken: refreshToken
                })
                // console.log(res, "?????");
                useUserStore.setState({
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    isLogin: true
                });

                requestsQueue.forEach((callback) => callback(res.accessToken));
                requestsQueue = [];

                // 当前请求
                config.headers.Authorization = `Bearer ${res.accessToken}`;
                return instance(config);
            }
        } catch (err) {
            useUserStore.getState().logout();
            window.location.href = '/login';
            return Promise.reject(err);
        } finally {
            isRefreshing = false;
        }
    }
    return Promise.reject(err);
})

export default instance;