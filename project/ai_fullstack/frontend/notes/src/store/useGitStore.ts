import { create } from 'zustand';
import { fetchCommit } from '@/api/git';

interface GitState {
    loading: boolean;
    diff: string;
    commit: string;
    setLoading: (loading: boolean) => void;
    setDiff: (diff: string) =>  void;
    getCommit: (diff: string) => Promise<void>;
}

export const useGitStore = create<GitState>((set, get) => ({
    loading: false,
    diff: '',
    commit: '',
    setLoading: (loading: boolean) => set({ loading }),
    setDiff: (diff: string) => set({ diff }),
    getCommit: async(diff: string) => {
        const res = await fetchCommit(diff);
        console.log(res);
        set({ commit: res });
    }
}))