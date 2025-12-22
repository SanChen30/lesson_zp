import Greeting from './components/Greeting.jsx'
import Model from './components/Model.jsx'
import Card from './components/Card.jsx'

const MyHeader = () => {
  return (
    <h2 style={{margin: 0, color: 'lightblue'}}> 自定义标题 </h2>
  )
}

const MyFooter = () => {
  return (
    <div style={{textAlign: 'right'}}>
      <button onClick={() => alert('关闭弹窗')} style={{padding: '0.5rem 1rem'}}>关闭弹窗</button>
    </div>
  )
}
function App() {
  return (
    <div>
      {/* 自定义组件 props 是一个对象，包含了所有的属性，name、message 是 props 的属性 */}
      {/* <Greeting name="张三" message="欢迎加入字节" showIcon />
      <Greeting name="李四" showIcon />
      <Greeting />
      <Greeting name={123} /> */}


      {/* <Model
        HeaderComponent={MyHeader}
        FooterComponent={MyFooter}
      >
        <p>这是一个弹窗</p>
        <p>你可以在这里显示任何JSX</p>
      </Model> */}


        {/* class是js的关键字，jsx 本质上还是在写 js，所以这里用 className 来代替 */}
      <Card className="user-card">
        <h2>张三</h2>
        <p>高级前端工程师</p>
        <button>查看详情</button>
      </Card>
    </div>
  )
}

export default App;