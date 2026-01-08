## css module

- css 层叠样式表

默认是没有作用域的

只有先后顺序和优先级

在类名前面加限定，选择器精确，.container .button  代替 .button。css 的一定的作用域能力


- react vue 如何给 css 带来 scope 的能力?

## css module

- react 里样式文件是和组件分开的
- module.css 后缀是 css module 的文件
- 可以将 css 作为 js 对象导入
- react 将 css 文件编译成 js 对象，并加上唯一的hash部分
- import styles from '.module.css'
- styles 就是 css in js 的对象
- jsx 里面用 {styles.类名} 来引用类名

- hash 唯一类名，组件样式，是唯一的，保护组件的安全
  - 不会污染全局，也不受外界的影响
- 多人协作的，开源共享的项目中特别要注意

- vue 使用简洁的scoped 来实现组件的样式隔离
  - scoped 组件作用域唯一的 hash id 组件及组件内部生效
  - 只生成一次，性能好，属性选择器来编译css
  - 可读性好，并没有改变类名