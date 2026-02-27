import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ask } from '@/api/rag';

interface RagState {
    question: string;
    answer: string;
    setQuestion: (question: string) => void;
    setAnswer: (answer: string) => void;
    retrieve: () => Promise<void>;
}


export const useRagStore = create<RagState>()(
    persist(
        (set,get) => ({
            question: '',
            answer: '',
            setQuestion: (question) => set({ question }),
            setAnswer: (answer) => set({ answer }),
            retrieve: async () => {
                const { question } = get();
                const answer = await ask(question);
                set({ answer });
            }
        })
    ,{
        name: 'rag-store',
        partialize: state => ({
            answer: state.answer
        })
    })
)