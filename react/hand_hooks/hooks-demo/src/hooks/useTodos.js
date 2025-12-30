// 封装响应式的 todos 业务
import {
    useState,
    useEffect,
} from 'react';

const STORAGE_KEY = 'todos'; // 好维护

function loadFromStorage() {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
}

function saveToStorage(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export const useTodos = () => {
    // useState 可以接受函数计算，同步
    const [todos, setTodos] = useState(loadFromStorage);

    useEffect(() => {
        saveToStorage(todos);
    }, [todos])

    const addTodo = (text) => {
        setTodos([
            ...todos,
            {
                id: Date.now(),
                text,
                completed: false,
            }
        ]);
    }

    const toggleTodo = (id) => {
        setTodos(
            todos.map(todo => (
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ))
        )
    }

    const deleteTodo = (id) => {
        setTodos(
            todos.filter(todo => todo.id !== id)
        )
    }
    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo
    }
}