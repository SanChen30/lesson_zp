import { useState } from 'react';
import styled from 'styled-components'; // 样式组件

// 样式组件
const Button = styled.button`
background: ${props => props.primary ? 'blue' : 'white'};
color: ${props => props.primary ? 'white' : 'blue'};
border: 1px solid blue;
padding: 8px 16px;
border-radius: 4px;
`
console.log(Button); // 打印结果是一个函数，函数的参数是props，返回值是一个html元素，元素的样式是根据props来的。
function App() {
  return (
    <>
      <Button>默认按钮</Button>
      <Button primary>主要按钮</Button>
    </>
  )
}

export default App;
