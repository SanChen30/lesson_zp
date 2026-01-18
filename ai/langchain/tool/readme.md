# Tools 模块

- Tools 让大模型具有调用外部工具的能力（函数）不只是聊天

- 声明函数tools，大模型负责决定要不要调用这个工具，哪个工具

- `?.`可选链操作符

ES6 新增，代码的简洁和优雅

它的作用是安全地访问嵌套对象的属性，避免因中间某个值为 null 或 undefined 而报错。

如果 res.tool_calls 存在，并且它是一个非空数组（长度大于 0），就执行 if 块中的代码。

```js
// 不用可选链
if (res.tool_calls && res.tool_calls.length > 0) {}

if(res.tool_calls?.length) {}
```

打印 res.tool_calls[0] 的结果是：
{
  name: 'add',
  args: { a: 3, b: 5 },
  type: 'tool_call',
  id: 'call_00_jD8LMZ71QvrkHqlBHQOguJqE'
}
