// 根组件
// jsx
// 组件树
// ? 函数 将 JSX + 逻辑 封装成了一个组件
// 组件是由 js/css/html 组合起来，完成一个相对独立的功能
// JSX 负责 UI
// use 使用，state 数据状态
import { useState, createElement } from 'react';
import './App.css';

function App() {
    // 组件的数据业务、交互等
    // JSx 还是在 JS 里面, class 是 JS 关键字，所以 class 属性名用 className 代替
    // const name = "vue";
    // 状态变量 name，初始值为 "vue"
    // setName 是更新 name 状态的函数
    const [name, setName] = useState("Vue");
    const [todos, setTodos] = useState([
        { id: 1, title: "学习 Vue", done: false },
        { id: 2, title: "学习 React", done: true },
        { id: 3, title: "学习 JSX", done: false },
    ]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    }

    // JSX 是 React 的语法糖，主要是简化模板开发，提升代码的可读性, element 就是 element2 的语法糖
    const element = <h2>JSX 是 React 中用于描述用户界面的语法拓展</h2>;
    const element2 = createElement('h2', null, '它看起来很像 HTML，但实际上是 JavaScript 的一种扩展语法');

    setTimeout(() => {
        setName("React");
    }, 3000)
    return (
        // 根元素只能有一个, 所以这里用了 Fragment 来包裹, 文档碎片节点
        <>
            {element}
            {element2}
            <h1>Hello <span className="title">{name}!</span></h1>
            {
                todos.length > 0 ? (
                    <ul>
                        { // 原生 JS, React 能不用新语法就不用
                            // xml in js
                            todos.map((todo) => (
                                <li key={todo.id}>
                                    {todo.title}
                                </li>
                            ))
                        }
                    </ul>
                ) : (<div>暂无待办事项</div>)
            }
            {isLoggedIn ? <div>已登录</div> : <div>未登录</div>}
            <button onClick={toggleLogin}>
                {isLoggedIn ? "退出登录" : "登录"}
            </button>
        </>
    )
}

export default App