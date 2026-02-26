import { client } from './app.service.mjs';

// 不用字符匹配，keyword 转成向量表达，数字
// cosine 角度越大越相近，为1，相同，-1，相反
// client.completions.create(...) 用于非聊天格式的纯文本补全，已弃用，并建议迁移到 /v1/chat/completions
// client.chat.completions.create(...) 用于所有基于对话格式的请求，做问答、摘要、代码生成还是传统“补全”
// client.embeddings.create(...) 将文本转换为高维向量表示，用于语义搜索、聚类等
// Embeddings（嵌入向量）
const response = await client.embeddings.create({
    // embeding 专有model
    model: 'text-embedding-ada-002', // 模型名称
    input: '你好',
})

let embedding = response.data[0].embedding  // 一个浮点数列表，如 [0.012, -0.34, ..., 0.89]
console.log(embedding, embedding.length);