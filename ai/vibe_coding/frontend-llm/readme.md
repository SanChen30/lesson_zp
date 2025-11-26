# 前端调用大模型

1. llm 可以以前端 http 请求的方式调用

2. trae 去介入开发工程化

3. 项目初始化

- 创建一个通用的原生 HTML/CSS/JS 项目
- vite 全栈脚手架搭建
  - 帮我初始化vite配置

1. 关于 type="module"

type="module" 是 HTML 中 script 标签的一个属性，用于告诉浏览器：这个脚本是一个 JavaScript 模块（ES Module）。

1) 启用 ES6 模块语法
   
使用 type="module" 后，你可以在该脚本中使用 import 和 export 语句来组织代码，实现模块化开发。

2) 默认延迟执行（defer）
   
模块脚本会像加了 defer 属性一样，在文档解析完成后、DOMContentLoaded 事件触发前执行，不会阻塞 HTML 渲染。

3) 严格模式自动启用
   
所有模块代码默认运行在 严格模式（strict mode） 下，无需手动写 'use strict'。

4) 作用域隔离
   
模块中的顶级变量、函数不会自动成为全局变量（即不会挂载到 window 对象上），避免污染全局命名空间。

5) MIME 类型要求
   
服务器必须以正确的 MIME 类型（如 application/javascript 或 text/javascript）提供 .js 文件，否则浏览器会拒绝加载模块。

6) 仅允许 CORS 跨域请求
   
如果从其他域名加载模块（如 CDN），服务器必须设置合适的 CORS 响应头（如 Access-Control-Allow-Origin），否则会被浏览器拦截。


## fetch 复杂请求

1. llm调用可以通过http请求的方式调用，也可以通过fetch API调用。

2. 请求分为：
   1) 请求行：Method(POST)，url(api.deepseek.com/chat/completions)，HTTP/1.1(版本号)
   2) 请求头：
      - Content-Type: application/json
      - Authorization: Bearer ${apiKey}  //token令牌的固定前缀：Bearer 空格
   3) 请求体(POST独有)
      以文本的形式，二进制发送，不可以直接发送JSON对象
      所以需要 JSON.stringify() 方法
      - 格式：JSON 字符串
      - 内容：
        ```json
        {
          "model": "deepseek-3.5",
          "messages": [
            {
              "role": "user",
              "content": "你好"
            }
          ]
        }
        ```

```js 
fetch(url, {
   method:,
   headers:,
   body:
   })
```

3. fetch 是 promise 实例

使用 **await** 关键字等待 fetch 完成，取代传统的 .then() 回调。

```js
const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: 'deepseek-3.5',
    messages: [{ role: 'user', content: '你好' }]
  })
});
``` 

await 异步变同步比 .then() 更简洁更方便，更符合同步编程的习惯。

在 JavaScript 中，await 是用于处理 异步操作 的关键字，它必须与 async 一起使用。它的主要作用是 暂停当前函数的执行，直到一个 Promise 被 resolve（成功）或 reject（失败），然后继续执行后续代码。

```js
async function myFunction() {
  const result = await somePromise();
  console.log(result);
}
```

* await 只能在 async 函数内部使用。

* 它后面通常跟一个 Promise 对象。如果不是 Promise，JavaScript 会将其包装成一个 resolved 的 Promise。

4. apikey 放到 .env 中，后端行为

前端怎么做呢？

变成一个全栈项目，使用 vite （全栈项目脚手架），环境变量配置。 

