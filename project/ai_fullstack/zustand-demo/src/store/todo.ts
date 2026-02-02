import { create } from 'zustand';
import type { Todo } from '../types/index.ts';
import { persist } from 'zustand/middleware';

export interface TodoState {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}

export const useTodoStore = create<TodoState>()(
    persist(
        (set, get) => ({
            todos: [],
            addTodo: (text: string) => set((state) => ({
                todos: [...state.todos, {
                    id: Date.now(),
                    text: text.trim(),
                    completed: false
                }]
            })),
            toggleTodo: (id: number) => set((state) => ({
                todos: state.todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
            })),
            removeTodo: (id: number) => set((state) => ({
                todos: state.todos.filter(todo => todo.id !== id)
            }))
        }),
        {
            name: 'todos'
        }
    )
)