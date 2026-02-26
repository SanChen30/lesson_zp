// localstorage 存储用户信息
import { create } from 'zustand'; // 创建 store 实例
import { persist } from 'zustand/middleware';  // 持久化存储
import {
    deLogin,
    getAiAvatar,
} from '@/api/user'; // 登录接口
import type { User, Credentail } from '@/types/index';

interface UserState {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    isLogin: boolean;
    login: (credentails: Credentail) => Promise<void>;
    logout: () => void;
    aiAvatar: () => Promise<void>;
}

// 高阶函数 柯里化
export const useUserStore = create<UserState>()(
    persist((set, get) => ({
        accessToken: null,
        refreshToken: null,
        user: null,
        isLogin: false,
        login: async ({name, password}) => {
            const res = await deLogin({name, password});
            console.log(res, '-----');
            // const { token, user } = res.user;
            // set({
            //     user: res.user,
            //     token: res.token,
            //     isLogin: true,
            // })
            const {
                accessToken,
                refreshToken,
                user
            } = res;
            // console.log(accessToken, refreshToken, user, '-----');
            set({
                user,
                accessToken,
                refreshToken,
                isLogin: true,
            })
        },
        logout: () => set({
            accessToken: null,
            refreshToken: null,
            user: null,
            isLogin: false,
        }),
        aiAvatar: async () => {
            const name = get().user?.name;
            if(!name) return;
            const avatar = await getAiAvatar(name);
            set({
                user: {
                    ...get().user,
                    avatar,
                }
            })
        }
    }), {
        name: 'user-store',
        partialize: (state) => ({
            accessToken: state.accessToken,
            refreshToken: state.refreshToken,
            user: state.user,
            isLogin: state.isLogin
        })
    })
)
