import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 状态存储的规矩和修改的方式，专业管理状态
// 重要的数据状态

interface CounterState {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

export const useCounterStore = create<CounterState>()(
    persist(
        (set) => (
            // 列出状态
            // 修改状态 
            {
                count: 0,
                increment: () => set((state) => ({ count: state.count + 1 })),
                decrement: () => set((state) => ({ count: state.count - 1 })),
                reset: () => set({ count: 0 }),
            }
        ),
        {
            name: 'counter',
        }
    )
)