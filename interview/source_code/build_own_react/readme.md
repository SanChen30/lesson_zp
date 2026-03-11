# React

MVVM 现代前端框架
组件化、响应式、JSX、虚拟 DOM、Fiber 机制...

- React 底层原理
    最好的方式是手写 Mini React
    React 框架名字，Didact，统一的命名空间

- 搭建源码开发项目

**pnpm i react-scripts**

- react-scripts 类似 vite

**npm run start**

- JSX
    JSX 是在 JavaScript 里面直接写 HTML 标签的语法糖。
    - 优势
    1. 直观且声明式
        vue 三段式
        react 函数，JSX 和数据逻辑在一起
        通过 JSX 直接看到最终输出的 DOM 结构
        ```
        let user = (<div>
            <h2>用户列表</h2>
            { users.map(user => <p key={user.id}> { user.name } </p>)}
        </div>)
        ```
        jsx -> render function -> vdom -> diff
             state、props、children

**pnpm i @babel/core @babel/preset-react @babel/cli -D**
        
**npx babel input.js**

- 源码分析第一阶段 The CreateElement Function
    - jsx 由 babel 转译成 React.createElement 
    - React.createElement 会接收到 type props children
        三个参数
    - createElement 函数会返回构成 VDOM 的 element 对象
    - 递归，叶子节点 就是 文本节点，文本节点为了统一处理（render）也会返回 VDOM
    得到 VDOM
    {
        type: 'TEXT_ELEMENT | NodeName | ComponentFunction' // 文本节点、普通节点、组件函数
        props: {
            ...props,
            children: []
        }
    }
    开发者只需关注数据业务，dom 的打理由 react 帮我们做了（重绘重排）

- 源码分析第二阶段 render
    - 接收 element, container
    - 创建节点 Node | TextNode
    - isProperty 判断 children 之外的 props，为 dom 添加属性
    - 递归 children，调用 render 函数
    - 挂载到 container 上