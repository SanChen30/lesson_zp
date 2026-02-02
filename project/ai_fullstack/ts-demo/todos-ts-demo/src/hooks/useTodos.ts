import {
    useState,
    useEffect
} from 'react';
// 引入 Todo 接口，用于定义 todos 数组中的每个元素的类型
import type { Todo } from '../types/todos.ts';
import { getStorage, setStorage } from '../utils/storages.ts';

const STORAGE_KEY = 'todos'; // 便于维护

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>(getStorage<Todo[]>(STORAGE_KEY, []));
    // const [count, setCount] = useState<number>(0);

    useEffect(() => {
        setStorage<Todo[]>(STORAGE_KEY, todos);
    }, [todos]);

    const addTodo = (title: string) => {
        const newTodo: Todo = {
            id: Date.now(), // 时间戳
            title: title.trim(), // 去除首尾空格
            completed: false, // 新添加的 todo 默认为未完成
        }
        setTodos([...todos, newTodo]);
    }

    const toggleTodo = (id: number) => {
        const newTodos: Todo[] = todos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos); 
    }

    const removeTodo = (id: number) => {
        const newTodos: Todo[] = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    }
    return {
        todos,
        addTodo,
        toggleTodo,
        removeTodo,
    }
}