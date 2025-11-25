# getJSON

- ajax 与 fetch 相比

1. fetch 简单易用，基于 promise 实现，（.then），无需回调函数
2. ajax 基于回调函数实现，需要判断状态码，处理异常，代码复杂

- 如何**封装**一个 getJSON 函数，使用 ajax

支持 promise

1. get 请求方法
2. 返回 JSON
3. ajax 如何实现 thenable

## Promise

- Promise 类，为异步变同步而（流程控制）实例化，成为了事实标准
- 接收一个函数，函数有两个参数，resolve，reject，它们也是函数
- then，catch 两个方法
  - promise 实例，最初状态为 pending 等待
  - resolve() 成功，状态变为 fullfilled，然后 then 执行
  - reject() 失败，状态变为 rejected，然后 catch 执行

## 引用式拷贝

1. JS 变量内存分为栈内存和堆内存

JS 编译阶段 执行阶段

变量提升，为这些变量分配空间

2) 栈内存 简单数据类型 存储在栈内存中，占用空间小，值直接存储在变量中
3) 堆内存 复杂数据类型 存储在堆内存中，占用空间大，值存储在堆内存中，栈内存中存储的是指向堆内存的地址