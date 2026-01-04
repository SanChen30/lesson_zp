# useMemo & useCallback

- react 性能优化

- includes 方法，""也为 true

- count 的改变也会触发 filterList 的重新计算

- 解决：使用 useMemo 缓存 filterList 计算结果，第一个参数是函数封装计算的过程，第二个参数是依赖项数组

    - 组件中有计算属性的需求，vue 给了 computed 方法，react 给了 useMemo 方法直接做
    - 有些计算是比较昂贵的
    - 依赖项改变时，才会重新计算 filterList

## useCallback

- 子组件 它依赖的 props 没有发生改变时，子组件就不需要重新渲染

- react 数据流管理思想，父组件负责持有数据和管理数据，子组件负责展示数据

- memo

  - 什么是高阶组件？
  - 高阶组件是一个函数，接收一个组件作为参数，并返回一个新的组件。

  - 优化函数组件的性能，避免不必要的重新渲染（通过props）

  - 传递的函数每次都会重新生成，需要缓存


- useCallback

    - 缓存传递的子组件会调用的回调函数
    - 给依赖项数组，当依赖项改变时，才会重新生成函数


工具	                    作用	                                  典型用途
React.memo	            缓存组件	                       阻止子组件因相同 props 重渲染
useCallback	            缓存函数	                    稳定回调函数引用，配合 React.memo
useMemo	                缓存值（对象、数组、计算结果）	      优化昂贵计算，稳定引用
它们共同服务于一个目标：减少不必要的渲染和计算，提升性能。