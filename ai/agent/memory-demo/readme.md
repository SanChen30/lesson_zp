# Agent 记忆模块

- RAG 太重要了
    - 最低的成本（embedding）丰富LLM的精准（cosine）上下文
    - 大模型的微调（finetue）也可以提升LLM的能力，但是花费巨大，巨复杂
    成本比较高

- LLM 的扩展
    llm + tool(干活) + RAG（知识库） + Memory（记忆） 

- memory 是基石
    messages 数组 最基础的 memory
    tool ? 基于Memory
    rag ? Prompt 增强，我们之前的对话，能力的积累，修改 Prompt
    SSD

- 和 llm 的对话，是无状态的 Stateless
    - Stateless 让 llm 简单，消费算力、电力、高并发的基础设施
        - 只需要基于请求，AIGC生成，返回生成内容
    - http 也是这样的
        - 万物互联
        - 虽然 http 头带上了 Cookie，Authorization，但 http 还是无状态的
    - 带上了 memory
        - messages 数组
- modelWithTools
    messages 数组放入了 SysteemMessage，告诉他的角色、功能，
    然后放入 HumanMessage 用户的问题（干什么）
    基于智能循环判断 tool_calls
    将 Tool 的返回结果，ToolMessage 再加入 message
    利用了 Memory 把多轮对话的复杂任务，无状态的大模型也能搞定

- 单纯的 messages 数组很简单，但是有问题
    - context 越来越长，token 消耗越来越多，触犯到上下文窗口大小限制
  
- 解决方案
- 截断 总结 检索
    - 截断，slice(-n)，留最近的几条，最近最关心的对话还在 滑动窗口 LRU 
    - 将要截断的 messages 总结一下，summarize 总结 compact 压缩
    当前的多轮对话中 Memory 机制够用
    - 检索 （持久化存储、数据库、文件）你的下一次提问 会 rag 检索 嵌入模型
    cursor 等 超越当前对话，将之前的对话存储、能让 rag 利用的场景，AI Agent 越来越懂我们

    清空 messages
    新的任务，节省 token

    - cursor 通过 messages 计算 token 开销
        40% 0%
    - 自动触发总结压缩
    - 手动触发
        /compact
        /clear
    又能 vibe coding 又能省 token 的 ai 工程师

    