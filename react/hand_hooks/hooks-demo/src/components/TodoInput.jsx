import {useState} from 'react';


export default function TodoInput({onAddTodo}) {
    const [text, setText] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!text.trim()) return;
        onAddTodo(text.trim());
        setText("");
    }
    return (
        <form className="todo-input" onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
            <button type="submit">添加</button>
        </form>
    )
}