# Async/Await

1. Async 异步

Ajax: Async JavaScript and xml ，异步的JavaScript和XML

2. promise

es6 提供的异步解决方案，解决了回调地狱的问题。

3. 为什么还需要 async/await 新的方案？

es8 提供的异步解决方案，主要是针对 .then() 方法的链式调用，提供了更简洁的语法。


## 关于fetch的.then() 方法

名称	        是什么	                                        类型
res	           HTTP 响应对象	                                Response
res.json()	   读取并解析 JSON 的方法，返回 Promise	               Promise<any>
data	       res.json() 成功后解析出的 JavaScript 数据	      Object / Array / string / number 等

### res 是什么？
res 是 fetch() 返回的 Promise 被 resolve 后传入的参数，它的类型是 Response 对象。

fetch(url) 发起一个 HTTP 请求。
当服务器返回响应头（headers）（注意：不一定是整个响应体都下载完），fetch() 的 Promise 就会 resolve，并传入一个 Response 实例。
这个 res 对象包含了：
状态码（res.status，如 200、404）
状态文本（res.statusText）
响应头（res.headers）
响应体（以流的形式存在，需要通过方法读取）

注意：res 不是最终的数据（比如 JSON 对象），它只是一个“响应容器”。

### res.json() 是什么？
res.json() 是 Response 对象的一个方法，用于读取响应体并将其解析为 JSON 对象。

它返回一个 Promise，该 Promise 在读取并解析完响应体后 resolve 为一个 JavaScript 对象（或数组等）。
内部会自动调用 JSON.parse() 解析响应体文本。

### data 是什么？
data 不是 res.json()，而是 res.json() 返回的 Promise 被 resolve 后的结果，也就是服务器返回的 JSON 数据被解析成的 JavaScript 对象（或数组等）。


## 关于async/await
在 JavaScript 中，await 是用于处理 异步操作的关键字，它必须与 async 一起使用。它的主要作用是暂停当前函数的执行，直到一个 Promise 被 resolve（成功）或 reject（失败），然后继续执行后续代码。

* await 只能在 async 函数内部使用。
* 它后面通常跟一个 Promise 对象。如果不是 Promise，JavaScript 会将其包装成一个 resolved 的 Promise。

1. 基本概念
async：用于声明一个函数是异步的。该函数会自动返回一个 Promise，即使 return 一个普通值。
await：只能在 async 函数内部使用，用于“等待”一个 Promise 完成（resolved 或 rejected），并获取其结果。

1. 基本语法

```javascript
async function fetchData() {
const response = await fetch('https://api.example.com/data');
const data = await response.json();
return data;
}
```
等价于使用 .then() 的写法：

```javascript
function fetchData() {
return fetch('https://api.example.com/data')
.then(response => response.json());
}
```

