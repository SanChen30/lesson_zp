# react 闭包陷阱

- 闭包形成的条件

- 函数组件嵌套了定时器、时间处理函数等
- useEffect 依赖项数组为空 或 useCallback 闭包，词法作用域 产生闭包陷阱