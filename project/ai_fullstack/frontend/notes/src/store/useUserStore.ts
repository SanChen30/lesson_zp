// localstorage 存储用户信息
import { create } from 'zustand'; // 创建 store 实例
import { persist } from 'zustand/middleware';  // 持久化存储
import {
    deLogin
} from '@/api/user'; // 登录接口
import type { User, Credentail } from '@/types/index';

interface UserState {
    token: string | "";
    user: User | null;
    isLogin: boolean;
    login: (credentails: Credentail) => Promise<void>;
}

// 高阶函数 柯里化
export const useUserStore = create<UserState>()(
    persist((set) => ({
        token: "",
        user: null,
        isLogin: false,
        login: async ({name, password}) => {
            const res = await deLogin({name, password});
            console.log(res, '-----');
            // const { token, user } = res.user;
            set({
                user: res.user,
                token: res.token,
                isLogin: true,
            })
        }
    }), {
        name: 'user-store',
        partialize: (state) => ({
            token: state.token,
            user: state.user,
            isLogin: state.isLogin
        })
    })
)
