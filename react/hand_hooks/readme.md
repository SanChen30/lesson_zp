# hooks

- 是一种函数编程思想

以 use 开头的函数，都是hooks函数，封装组件的状态和生命周期，呼之即来，用起来很方便

- react 内置的 hooks 函数有哪些？
  - useState
  - useEffect
  - useContext
  - useRef

- 自定义的 hooks


## 案例

mousemove 事件 响应式的显示鼠标的位置。

- 实现
  - 定义一个 state 来存储鼠标的位置
  - 监听 mousemove 事件
  - 在事件处理函数中，更新 state 中的鼠标位置
  - 在组件中渲染 state 中的鼠标位置


- 内存泄漏

组件卸载时，需要清除事件监听、定时器，否则会导致内存泄漏
不会因为函数组件卸载自动销毁事件监听、定时器