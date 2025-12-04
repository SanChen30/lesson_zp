# JS 中 this 的设计

## 自由变量的查找

1. 编译阶段
2. 作用域链
3. Lexical Scope 词法作用域
   
## 如果要拿到 time.geekbang.com 怎么办？

1. this

在面向对象的方法内，应该可以通过 this 拿到对象的属性

但是早期没有 class，函数里面需要 this 来完成 OOP

2. js 做了一个不好的设计

this 由函数的调用方式决定

1) **普通函数运行**时，this 指向全局对象（浏览器中是 window，Node.js 中是 global）

this 是没有必要的， js 函数特别灵活

this 总是指的地方，没有必要指

直接让 js 指向全局

- var 声明的变量，会挂载到全局对象上

不好，容易造成全局变量的污染，污染 window 对象

- let 声明的变量，不会挂载在全局对象上

- 严格模式也规避了没有必要的 this 指向，直接 undefined，避免了指向全局对象的问题

在严格模式中：
函数被“裸调用” → this 为 undefined
如果一个函数不是作为对象的方法、不是用 call/apply/bind 显式绑定、也不是作为构造函数调用，那么它的 this 就是 undefined（而不是非严格模式下的全局对象）。

- JS 执行机制跟编译阶段挂钩，this 是一个例外，它由调用方式（执行阶段）决定

this 是指针，指向调用它的对象

谁调用这个方法，this 就指向谁

## 执行上下文 来看待 this

## this 指向的各种情况

1. 作为对象的方法被调用，obj.method()，this 指向 obj 对象
2. 作为普通函数被调用，this 指向全局对象（浏览器中是 window，Node.js 中是 global），严格模式下，this 是 undefined
3. call/apply/bind 方法显示绑定 this，this 指向绑定的对象
4. 作为构造函数调用，this 指向实例对象
5. 作为事件处理函数调用，this 指向事件绑定的元素
6. 箭头函数中的 this 不是由调用决定的，而是在定义时就“记住”了外层作用域的 this。它不指向“定义它的对象”，而是指向定义它时所在函数（或全局）上下文中的 this