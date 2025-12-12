// .jsx 是 React 文件的后缀
// UI 用户界面工程师，前后端分离
// Vue 三部分，功能分离
// React 一上来就是组件
// js 没有 class，用函数实现类，同样的 React 用函数组件来实现组件化
// 根组件

function JuejinHeader() {
  return (
    <div>
      <header>
        <h1>JueJin首页</h1>
      </header>
    </div>
  )
}

const Articles = () => {
  return (
    <div>
      Articles
    </div>
  )
}

const Checkin = () => {
  return (
    <div>
      Checkin
    </div>
  )
}

const TopArticles = () => {
  return (
    <div>
      TopArticles
    </div>
  )
}

function App() {
  // xml in js, 这就是 jsx
  // 返回 jsx 的函数就是组件
  // 组件是 React 开发的基本单位
  // HTML 有标签，CSS 有规则rules，JS 有逻辑，建筑里的砖头和沙子，传统前端的开发单位
  // React 一下让我们成为包工头，先分工，组件化，组件组合起来组成网页
  // facebook
  // 子组件们
  return (
    <div>
      {/* <h1>Hello <b>React!</b> </h1> */}
      {/* 头部组件 */}
      <JuejinHeader />
      <main>
        {/* 组件也和HTML标签一样声明，自定义组件 */}
        {/* 组件化让我们像搭积木一样组合成页面 */}
        <Articles />
        <aside>
          <Checkin />
          <TopArticles />
        </aside>
      </main>
    </div>
  )
}

export default App