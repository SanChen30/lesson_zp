# React Hooks

以 use 开头的函数，都是 React 提供的 Hooks 函数，用于在函数组件中使用状态和其他 React 功能。
- react api 最新的语法，文档：https://react.dev/reference/react
- 函数 react 风格比较原生 JS

## react 内置的

- useState

  - 初始化时传入一个纯函数
    如果我想在初始化的时候异步请求数据怎么办？ 用 useEffect 来处理
  - setState 时，也可以传入一个函数，这个函数的参数是上一次的state

- useEffect

effect 副作用

    - 对立面是纯函数
      组件来说输入函数，输出jsx
      useEffect 异步请求数据，并修改状态
    - 请求数据 副作用
    - 第二个参数 依赖项数组
      依赖项数组为空，副作用函数只在挂载时执行一次
      依赖项数组有值，副作用函数会在依赖项变化时执行
      不给依赖项数组，副作用函数会在每次渲染时执行
      return 函数，闭包，在下一次执行effect前调用或组件卸载时调用
    - 三种情况
      - onMounted 挂载时执行
      - onUpdated 更新时执行
      - onUnmounted 卸载时执行

## 自定义的