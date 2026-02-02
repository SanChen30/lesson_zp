import type { Todo } from '../types/todos'
import TodoItem from './TodoItem';
import type { FC } from 'react';

// 组件参数接口 父子组件对接
// props 接口可以确保子组件的正确运行
interface Props {
    todos: Todo[];
    onToggle: (id: number) => void;
    onRemove: (id: number) => void;
}

const TodoList: FC<Props> = (
    { todos, onToggle, onRemove }
) => {
    return (
        <ul>
            { todos.map( todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={onToggle}
                  onRemove={onRemove}
                />
            ))}
        </ul>
    )
}

export default TodoList;