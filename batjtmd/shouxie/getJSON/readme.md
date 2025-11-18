# getJSON

- ajax 与 fetch 相比

1. fetch 简单易用，基于 promise 实现，（then），无需回调函数
2. ajax 基于回调函数实现，需要判断状态码，处理异常，代码复杂


- 如何**封装**一个 getJSON 函数，使用 ajax

支持 promise

1. get 请求方法
2. 返回 JSON
3. ajax 如何实现 thenable