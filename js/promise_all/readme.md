# Promise.all

1. Promise 是 ES6 引入的异步编程解决方案

实例的.__proto__ 指向 Promise.prototype，原型对象

js 面向对象不是血缘关系，而是原型关系

原型对象 Promise.prototype 有 constructor 属性，指向构造函数 Promise，会动态改变，需要手动恢复

类似 火车（实例），火车头（constructor），车身（原型对象）之间的关系，可以分得开，车身可以换车头