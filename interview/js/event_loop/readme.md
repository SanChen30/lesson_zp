# Event Loop

- 渲染进程的主线程有太多工作要做
  
消息队列 + Event Loop (JS 执行机制)

- 一次工作中
    - JS 执行开始于 script 宏任务
    - V8 引擎 JS 单线程 同步代码 快速执行完，调用栈
    执行时间不能太长，优先级比较高的任务
    - 所有的耗时性任务等，异步的，不能被阻塞
    - 微任务队列（promise，mutation，时机 resolve 之后进入）
    - 非队列，页面的渲染（重绘重排 页面的卡顿），动画（掉帧），必要时做渲染（样式、布局、绘制），垃圾回收
    - 宏任务队列

每执行完一个宏任务 + 清空微任务后，可以 先检查是否该渲染、是否有更高优先级的输入；

- 同步代码
    同步代码 1
    Promise 构造函数
    Promise 构造函数内 resolve 后
    async 函数同步部分
    同步代码 2
- 宏任务队列
    定时器
- 微任务队列
    Promise.then 1
    await 后微任务
    queueMicrotask 微任务
    () => {
            console.log('MutationObserver 微任务');
        }