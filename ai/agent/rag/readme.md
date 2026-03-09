# RAG

Retrieval-Augmented Generation，检索增强生成。

- llm 的知识来源于？
    训练的时候会给它数据集、
- llm 的幻觉？
    AIGC
    问了llm不知道的问题，它会认认真真的胡乱回答
- RAG 可以解决llm的幻觉
    - llm 会 thinking plaing
    - 检索增强
    - Augument Prompt 
    - 如果没有匹配到？不知道

## RAG

- Retriver 检索
    - 原始的 prompt embedding
    - 知识库 提前 embedding 好的
    - cosine 相似度计算
  
- 知识库
    - 专家知识库
    - 企业私有、安全知识库
    - 各种类型的文件，text pdf mp3 video
    - 大的文件切片，document 文档碎片
    - embedding 化

- Augmented 增强
    - 原始 Prompt 增加 检索出来的几段相关文档

- Generation 生成
    - llm 拿到增强的 prompt 完美解答
  

## 向量表达？

- 关键词的文本匹配不能实现语义搜索
    - 苹果可以是手机也可以是水果

- 向量 Vector [0.1, 0.2, ......]
  
    - 用数字表达一个存储的信息

    - 食用性 0 无 1 高
    - 硬度 0 液体 1 骨头

    水果 [0.9，0.3] 食用性极高，硬度偏低
    苹果 [0.9，0.5] 中等硬度
    香蕉 [0.9，0.1] 
    石头 [0.1，0.9] 

- 语义搜索的流程
    - 向量每个维度有独特的语义（食用性、硬度）
    - 可视化 空间
    - cosine 计算
- 