import { useState, useEffect } from 'react'
import './styles/app.styl'
import TodoList from './components/TodoList.jsx'
import TodoInput from './components/TodoInput.jsx'
import TodoStarts from './components/TodoStarts.jsx'

function App() {
  // 子组件共享的数据状态
  const [todos, setTodos] = useState(() => {
    // 高级用法
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  // 子组件修改数据的方法
  const addTodo = (text) => {
    setTodos([...todos,{
      id: Date.now(),
      text,
      completed: false
    }])
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {
      ...todo,
      completed: !todo.completed
    } : todo))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  return (
    <div className="todo-app">
      <h1>My Todo List</h1>
      {/* 自定义事件 */}
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
      <TodoStarts total={todos.length} active={activeCount} completed={completedCount} onClearCompleted={clearCompleted}/>
    </div>
  )
}

export default App;