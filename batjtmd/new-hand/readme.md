# 手写new

1. new 实例运算符

实例化的过程

1) new 构造函数，没有血缘关系，原型式的面向对象
2) 从空对象开始
3) this 指向新创建的空对象，运行构造函数
4) 空对象的 __proto__ 指向构造函数的 prototype
5) 返回新创建的对象
   

Object.prototype.toString.call(obj)，获得 obj 的具体类型


## 类数组对象 Arguments

1. 函数运行时的参数对象，JS 函数的参数也是动态的

2. 有长度属性

3. 可以使用索引访问，for

4. 不能使用数组的方法，reduce、map、join 等

怎么变成真数组？

1. 数组的 slice 方法

效果就是：遍历 arguments 对象的索引属性（从 0 到 length - 1），并把这些值放进一个新数组中返回。
   
```js
args = [].slice.call(arguments);
// 等价于
args = Array.prototype.slice.call(arguments)
```

1. 扩展运算符 ...

```js
args = [...arguments]
```

3. Array.from 方法

```js
args = Array.from(arguments)
```
