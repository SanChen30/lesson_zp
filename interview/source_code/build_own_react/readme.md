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

## 第三个阶段

### 递归render的性能问题

- VDOM 树比较巨大，电商详情页的复杂组件树结构
- 一旦开始，不能中断，render 完成为止。
- JS 单线程，一直占据
    用户交互、动画、滚动条（更优先的任务） 卡顿、掉帧

### Fiber 工作机制

VDOM -> Fiber Tree -> render

- 在浏览器不忙的时候
    中断、调度
    fiber 节点是 element render 的工作单元 work unit
    下一个 work unit 指针

## 消息队列 和 事件循环
### Event Loop

事件循环机制

1. 每个页面都有一个渲染进程，启动一个主线程，负责的任务特别多，而且还是单线程
   V8 JS引擎 和 渲染引擎（进程内部），多进程的通信（网络进程...）消息的方式

2. 多少事要做
- 处理 DOM， 解析 HTML， 生成 DOM 树
- 计算样式 合并 css 规则与元素默认样式，确定每个 DOM 节点最终的可视化样式属性值，构建 CSSOM 树
- DOM Tree 和 CSSOM Tree 结合生成渲染树 render Tree
- 处理布局，盒模型、BFC(弹性、浮动、定位)，布局树 Layout Tree 计算 DOM 节点在屏幕的精确位置，尺寸等几何布局信息
- 合并图层
- 渲染引擎 绘制
- JS 执行 开始于一个`script`标签
    <script src="" type="module">
    </script>
    同步代码（尽快允许结束），异步代码（耗时的，未来的，事件的Promise async await setTimeout setInterval addEventListener，...）

    - 消息机制
    - Event Loop 
      - 第一个宏任务 script
      - 同步代码全部执行完，碰到异步任务就放入宏任务（setTimeout... 队列，每次只会取一个宏任务执行）或微任务队列（promise... 先进先出 一次清空所有的微任务）
- Event Loop（事件循环）
    - 先清空所有微任务队列（全部执行完）
    - 再从宏任务队列中取出一个宏任务执行；    
    - 然后可能进行 UI 渲染；
    - 重复上述过程。

## 程序运行模型
- 主（单）线程模型
  顺序执行的，执行完，线程会自动退出
  简单，高效，阻塞（异步来解决）
- 在主线程过程中处理新的任务（优先）
  I/O 读写文件，点击事件，键盘事件，就要采用事件循环机制
  单线程机制下，要去响应众多任务，而设计出来的执行机制

```c++
//GetInput
//等待用户从键盘输入一个数字，并返回该输入的数字
int GetInput(){
    int input_number = 0;
    cout<<"请输入一个数:"; // 会让主线程一直阻塞在输入等待状态
    cin>>input_number;
    return input_number;
}

//主线程(Main Thread)
void MainThread(){
     for(;;){
          int first_num = GetInput()；
          int second_num = GetInput()；
          result_num = first_num + second_num;
          print("最终计算的值为:%d",result_num)；
      }
}
```

相对于之前的单线程，有两个改变
- 循环机制，一直检测
- 引入了事件

Event + Loop = EventLoop 线程是活的

- 处理其他线程发过来的任务
  网络进程 消息机制 + Event Loop(JS 执行机制)

渲染主线程会频繁接收到来自于 IO 线程的一些任务，接收到这些任务之后，渲染进程就需要着手处理，比如接收到资源加载完成的消息后，渲染进程就要着手进行 DOM 解析了；接收到鼠标点击的消息后，渲染主线程就要开始执行相应的 JavaScript 脚本来处理该点击事件。

优先级别 队列搞定
宏任务队列 一次只执行一个
微任务队列 一次全清空


- Event Loop 机制？
执行流程：
执行一个宏任务（如全局 script）；
执行过程中产生的微任务入队；
宏任务执行完 → 清空所有微任务队列；
可能进行 UI 渲染；
从宏任务队列取下一个宏任务，重复。
⚠️ 关键强调：微任务总是在当前宏任务结束后立即全部执行，而宏任务是一次只执行一个。

