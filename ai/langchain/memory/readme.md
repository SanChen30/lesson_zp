# LLM 记忆

- LLM api 调用和 http 请求一样，都是无状态的

那么，怎么让 LLM 有记忆？

维护一个对话历史记录，每次调用 LLM 时，都将历史记录作为输入，LLM 会根据历史记录生成回复。

messages = [
    {
        role: 'user',
        content: '你好，我是三宸'
    },
    {
        role: 'assistant',
        content: '-------'
    },
    {
        role: 'user',
        content: '你知道我是谁吗？'
    }
]

## 多轮会话

- LLM 调用是无状态的
- 多轮会话。维护一个对话历史记录messages，每次调用 LLM 时，都会把历史记录带上。

会带来两个问题：

- 维护对话
- 滚雪球一样，token 开销大


## memory AI应用模块 

langchain 提供了这个模块