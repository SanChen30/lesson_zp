# 定时任务

明早九点，帮我把最新关于 open claw 的新闻，整理成一篇日报，发到我的邮箱。

- 日程安排的能力交给小龙虾
- 网络搜索 tool
- 写文章
- 发邮件

## 生成器

普通函数，一调用就从头跑到尾
生成器函数，跑一些遇到 yield 停下来，promise 解决后可以从暂停的地方继续跑
async await 的前身，也比较复杂

## RxJS
用数据流的方式来处理异步事件
- JS里常见的异步方式
    - callback 回调地域
    - Promise
    - generator/yield
    - event listener
    - async/await

以上是适合一次性的异步任务
有很多异步任务是连续发生的事件
    - SSE
    - 输入框输入
    - 鼠标移动
    - AI 流式

事件1 -> 事件2 -> 事件3 -> 事件4

像一条河流

## 流式输出
- nest.js + rxjs 实现服务器端sse接口
  - nest.js 以 @Sse 装饰器模式 /ai/chat/stream
  - 本质是 设置了 响应头 Content Type，Cache-Control，Connection，Transfer-Encoding
  - service 模块根据 langchaiin stream:true llm 流式响应
  - 使用 rxjs from api 讲 llm 流式响应转成一个Observable 对象
    - pipe map 转成前端需要的 data: chunk 格式
  - service 使用 langchain tool 定义了 queryUserTool 等 tool
  - llm 流式大模型响应 for await chunk of stream
  - chunk 不断 concat 合并
  - 判断 fullAIMessageChunk.tool_call_chunks
    - 如果是，不干
    - 如果不是，yield 输出
  - agentLoop
    - 如果要用到工具，执行 tool(args)
  - 结束