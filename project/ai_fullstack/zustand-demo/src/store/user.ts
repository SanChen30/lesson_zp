import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/index'

interface UserState {
    isLogin: boolean;
    login: (user: User) => void;
    logout: () => void;
    user: User | null;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            isLogin: false,
            login: (user) => set({ isLogin: true, user: user }),
            logout: () => set({ isLogin: false, user: null}),
            user: null,
        }),
        {
            name: 'user',
        }
    )
)