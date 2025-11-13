# map 方法

- ES6 数组新增方法

- map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成，回调函数有三个参数：当前元素、当前索引、原数组

- MDN 文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map

- parseInt(string, radix) 解析一个字符串并返回指定基数的十进制整数，radix 是 2-36 之间的整数，表示被解析字符串的基数。
- 从 2 到 36 的整数，表示进制的基数。例如指定 16 表示被解析值是十六进制数。如果超出这个范围，将返回 NaN。假如指定 0 或未指定，基数将会根据字符串的值进行推算。注意，推算的结果不会永远是默认值 10！


# NaN

特殊的数字（typeof），表示不是一个数字

常用于无效的数学计算，NaN Infinity -Infinity

# JS 面向对象式编程

1. JS 是一个完全面向对象的编程语言

- `"hello".length`
- `520.1314.toFixed(2)`

对于传统的面向对象来说是不可理解的

2. JS 为了统一开发风格，全面向对象

```js
“hello”.length === new String("hello").length
```

为了让 JS 简单，傻瓜，JS底层帮我们封装了很多对象，我们只需要调用就可以了，这个叫做**包装类**

将简单数据类型`"hello"`包装为`String`对象，可以调用`String`对象的方法

```js
const strObj = new String("hello");
strObj.length;
strObj = null; //释放
```
