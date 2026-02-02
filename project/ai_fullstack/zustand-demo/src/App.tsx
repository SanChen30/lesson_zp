import { useCounterStore } from './store/counter'
import { useTodoStore } from './store/todo'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const { count, increment, decrement, reset } = useCounterStore();
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();
  const handleAdd = () => {
    if (inputValue.trim() === '') return;
    addTodo(inputValue.trim());
    setInputValue('');
  }
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={increment}>
          count is {count}
        </button>
        <button onClick={decrement}>
          count is {count}
        </button>
        <button onClick={reset}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <section>
        <h2>Todos {todos.length}</h2>
        <div>
          <input
            type="text"
            placeholder="Add a new Todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e0 => e0.key === 'Enter' && handleAdd())}
          />
          <button onClick={handleAdd}>Add</button>
        </div>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
              <button onClick={() => removeTodo(todo.id)}>删除</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default App
