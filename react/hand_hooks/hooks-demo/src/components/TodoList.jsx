import TodoItem from './TodoItem.jsx';

export default function TodoList({todos, onDelete, onToggle}) {
    return (
        <ul className="todo-list">
            {
                todos.map(todo => (
                    <TodoItem 
                        key={todo.id}
                        todo={todo}
                        onDelete={onDelete}
                        onToggle={onToggle}
                    />
                ))
            }
        </ul>
    )
}