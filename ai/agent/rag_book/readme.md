# RAG 电子书

- 一本电子书，如何做 RAG

- RAG 的流程
  1. 知识库
  2. @langchain/community 
        来自社区提供的各种 loader
  3. Splitter
  4. Document
        pageContent
        metadata
  5. Embedding Model
  6. Milvus

- pnpm i dotenv epub2 html-to-text @langchain/openai @langchain/community @langchain/textsplitters @zilliz/milvus2-sdk-node

## 开发流程
- ensureBookCollection 确保集合存在
    - 判断集合是否存在 hasCollection
    - 创建集合 createCollection
        schema
    - 创建索引
    - 加载集合 loadCollection
  