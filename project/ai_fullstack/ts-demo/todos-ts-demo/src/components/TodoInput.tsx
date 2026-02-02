import * as React from 'react';

interface Props {
    onAdd: (title: string) => void;
}

const TodoInput:React.FC<Props> = ({ onAdd }) => {
    const [title, setTitle] = React.useState<string>('');
    const handleAdd = () => {
        if(!title.trim()) return;
        onAdd(title);
        setTitle('');
    }

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <button onClick={handleAdd}>添加</button>
        </div>  
    )
}

export default TodoInput;