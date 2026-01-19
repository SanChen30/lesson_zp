import {
    create // 创建 store 实例
} from 'zustand';
import type { User } from '@/types/index'

interface UserState {
    isLogin: boolean;
    user: User | null; // 联合类型
}

export const useUserStore = create<UserState>((set) => ({
    isLogin: false,
    user: null,
}))