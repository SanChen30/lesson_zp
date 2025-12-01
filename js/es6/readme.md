# es6+

**2015**年作为分水岭，之前 js 有好的一方面（单线程，简单），不好的一方面（变量提升，没有class关键字）
为了变为企业级开发语言，别的语言有的它也要有，适合大型项目开发

## 解构

JavaScript 中的解构赋值（Destructuring Assignment）是一种从数组或对象中提取数据并赋值给变量的简洁语法。它使得从复杂的数据结构中获取值变得更加直观和方便。

一、数组解构

1. 基本用法
```js
const arr = [1, 2, 3];
const [a, b, c] = arr;
console.log(a, b, c); // 1 2 3
```

2. 跳过元素
```js
const [x, , z] = [10, 20, 30];
console.log(x, z); // 10 30
```

3. 默认值
```js
const [p = 5, q = 10] = [1];
console.log(p, q); // 1 10
```

4. 剩余参数（Rest）
```js
const [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(rest); // [2, 3, 4]
```

二、对象解构

1. 基本用法
```js
const user = { name: 'Alice', age: 25 };
const { name, age } = user;
console.log(name, age); // Alice 25
```

2. 重命名变量
```js
const { name: userName, age: userAge } = user;
console.log(userName, userAge); // Alice 25
```

3. 默认值
```js
const { name, gender = 'unknown' } = user;
console.log(gender); // unknown（因为 user 中没有 gender 属性）
```

4. 嵌套对象解构
```js
const data = {
user: {
id: 1,
profile: { email: 'alice@example.com' }
}
};

const { user: { id, profile: { email } } } = data;
console.log(id, email); // 1 'alice@example.com'
```

三、函数参数中的解构

1. 对象参数解构
```js
function greet({ name, greeting = 'Hello' }) {
console.log(${greeting}, ${name}!);
}

greet({ name: 'Bob' }); // Hello, Bob!
```

2. 数组参数解构 

```js
function sum([a, b]) {
return a + b;
}
console.log(sum([3, 4])); // 7
```

四、交换变量（无需临时变量）

```js
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1
```

五、注意事项
1. 解构时如果右侧是 null 或 undefined，会抛出错误（因为无法读取属性）。
```js
const { foo } = null; // TypeError
```
安全做法：提供默认值或先判断。

2. 对象解构的变量名必须与属性名一致（除非使用重命名）。
   
3. 解构赋值可以用于 let、const、var，甚至已有变量（但要注意语法歧义，可能需要加括号）：
```js
let a, b;
({ a, b } = { a: 1, b: 2 }); // 加括号避免解析为代码块
```

## 对象属性简写

```js 
const sex = 'boy'; // 常量
const obj = {
    // es6 的对象属性简写语法(Shorthand Property)
    sex
    // 等价于 sex: sex
}
```

## 模板字符串

`${}` 插值表达式，如果是表达式，会运行并返回返回值

## for of 循环

for of 循环简单，语义更好，可读性更好，性能也不会比计数循环差太多

计数循环 for 比较适合cpu，底层的cpu计数性能好，但过于机械死板，可读性差

for in 性能差，要规避

## bigint

新的简单数据类型

如果需要处理超过 Number.MAX_SAFE_INTEGER 的大整数，请使用 BigInt 类型：
```js
const big = 9007199254740991n + 1n; // 安全的大整数运算
```

1. 在 JavaScript 中，n 是 BigInt 字面量的后缀，用于表示一个 BigInt 类型的整数
例如：123n 表示一个 BigInt 类型的整数 123

2. BigInt 和 Number 不能直接混合运算：
```js
console.log(1n + 2); // ❌ TypeError: Cannot mix BigInt and other types
```

3. 不能用 Math 对象处理 BigInt：
```js
Math.sqrt(16n); // ❌ TypeError
```

4. BigInt 没有小数部分，只能表示整数：
```js
const x = 3.14n; // ❌ SyntaxError: Invalid or unexpected token
```

5. 转换方式：
```js
BigInt(123);      // 123n （从 number 转换，但不能是小数）
BigInt("123");    // 123n
Number(123n);     // 123 （转回 number，但大数可能溢出）
```

## 指数运算符 ** , es7, 2016

console.log(2 ** 10); // 1024

## 函数的默认参数
```js
function foo(x = 1, y = 1) {
    return x + y;
}
console.log(foo(3));
```

## 函数的参数

函数里有一个内置关键字 arguments，它是一个类数组对象，包含了函数调用时传递的所有参数
也可以使用解构的剩余参数`...args`来获取所有参数，它是一个数组

```js
function foo(...args) {
    console.log(args); // [ 1, 2, 3, 4 ] 
    console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4 }
}
foo(1, 2, 3, 4);
```

## 关于展开运算符和剩余参数（...）

**记忆口诀：“右边展开，左边收集”**

### 展开运算符（Spread）

1. 用于数组
   
```js
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // 展开 arr1
console.log(arr2); // [1, 2, 3, 4, 5]
// 数组合并
const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b]; // [1, 2, 3, 4]
```

2. 用于函数调用
```js
Math.max(...[1, 5, 3]); // 等价于 Math.max(1, 5, 3) → 5
```

3. 用于对象（ES2018+）
```js   
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // 浅拷贝 + 扩展
console.log(obj2); // { a: 1, b: 2, c: 3 }

// 对象合并
const user = { name: 'Alice' };
const info = { age: 25 };
const fullUser = { ...user, ...info }; // { name: 'Alice', age: 25 }
```

### 剩余参数（Rest）

1. 用于函数参数
```js
function sum(first, ...rest) {
console.log(first); // 第一个参数
console.log(rest); // 剩下的参数组成的数组
return rest.reduce((a, b) => a + b, first);
}

sum(1, 2, 3, 4);
// first = 1, rest = [2, 3, 4]
// 返回 10
```

2. 用于解构赋值
```js
const [first, ...others] = [1, 2, 3, 4];
console.log(first); // 1
console.log(others); // [2, 3, 4]

const { name, ...rest } = { name: 'Bob', age: 30, city: 'NYC' };
console.log(name); // 'Bob'
console.log(rest); // { age: 30, city: 'NYC' }
```

### 注意事项

1. 浅拷贝：嵌套结构不会被深度复制。
```js   
const obj = { a: { b: 1 } };
const copy = { ...obj };
copy.a.b = 2;
console.log(obj.a.b); // 2（原对象也被改了！）
```

2. 剩余参数必须是最后一个参数
```js
function foo(...rest, last) { } // ❌ SyntaxError
```

3. 对比 arguments vs ...rest

```js       
// 旧写法（不推荐）
function oldSum() {
const args = Array.from(arguments);
return args.reduce((a, b) => a + b, 0);
}

// 新写法（推荐）
const newSum = (...args) => args.reduce((a, b) => a + b, 0);
```