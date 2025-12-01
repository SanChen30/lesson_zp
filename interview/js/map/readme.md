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

## 关于截取子串 slice()、substr() 和 substring() 方法的对比

1. String.prototype.slice(start, end)
语法：str.slice(start, end)
参数：
start：开始位置（包含），可以为负数（表示从末尾倒数）。
end：结束位置（不包含），可选；若省略，则提取到字符串末尾。
特点：
支持负索引（如 -1 表示最后一个字符）。
如果 start > end，返回空字符串。

✅ 推荐使用，语义清晰且支持负数。

```js
"hello".slice(1, 4); // "ell"
"hello".slice(-3); // "llo"
"hello".slice(2); // "llo"
```
2. String.prototype.substring(start, end)
语法：str.substring(start, end)
参数：
start：开始位置（包含），不能为负（负数会被视为 0）。
end：结束位置（不包含），可选。
特点：
不支持负索引：负数会被转换为 0。
如果 start > end，会自动交换两者位置。

⚠️ 行为有点“反直觉”，尤其对负数处理。

```js
"hello".substring(1, 4); // "ell"
"hello".substring(4, 1); // "ell"（自动交换）
"hello".substring(-3); // "hello"（-3 → 0）
```
3. String.prototype.substr(start, length)
语法：str.substr(start, length)
参数：
start：开始位置（包含），可为负数。
length：要提取的字符数量（不是结束位置！），可选。
特点：
第二个参数是长度，不是结束索引。
支持负的 start。
⚠️ 已废弃（deprecated）：虽然目前浏览器仍支持，但不建议在新代码中使用。

```js
"hello".substr(1, 3); // "ell"
"hello".substr(-3, 2); // "ll"
"hello".substr(2); // "llo"
```
📌 注意：MDN 明确指出 substr() 是遗留功能，未来可能被移除。

建议
优先使用 slice()：语义清晰、支持负数、行为一致。
避免使用 substr()，因其已被标记为废弃。
substring() 可用，但需注意其对负数和参数顺序的特殊处理。

