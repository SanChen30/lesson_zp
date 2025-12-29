import {
  useState,
  useRef
} from 'react';

export default function App() {
  // 受控组件 组件里有被状态控制的表单元素
  // 单向数据流 单项绑定
  // 状态绑定输入框 输入框被状态控制了
  // 状态控制 输入框的值被 value 控制，只有加了 onChange 事件，才会改变 value 的值
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const doLogin = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  }
  return (
    <form onSubmit={doLogin}>
      {value}
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <div></div>
      <input type="text" ref={inputRef} />
      <button type="submit">登录</button>
    </form>
  )
}