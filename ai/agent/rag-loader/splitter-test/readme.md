# Splitter 理解

- loader 加载的大Document @langchain/community
    pdf doc 不是一个类型

- RecursiveCharacterTextSplitter
    text

- splitter
    character 按语义切，天然的语义切割符，符合语义
    ["。", "？", "！", "，"]
    优先级 。最优先
    chunkSize 的接近 递归尝试 ？！，
    保持语义
    不得不切断时，overlap 牺牲一定的空间（cunkSize 的 10%）重复

    先 character 切，再考虑 chunkSize，最后 Overlap

- RAG 相关问题
    - 流程 retrieved-argument generate
    - loader
    - RecursiveCharacterTextSplitter 细节 三个参数 chunkSize、chunkOverlap、seperators
    - splitter 面向对象体系和关系 ./splitter.png
        父类 TextSplitter 切割的是文本，mp3,mp4 不适合
        一系列的子类：
            CharacterTextSplitter 按字符切割
            TokenTextSplitter 按token数量切割
            RecursiveTextSplitter 语义的完整性特别好
        - MarkdownTextSplitter 为什么属于 RecursiveCharacterTextSplitter 的子类？ # ## ### 递归

- CharacterTextSplitter 
    直接按Character seperator 切割
- RecursiveCharacterTextSplitter
    更人性化
    当尝试非首选符号时，语义就弱下来了，我们就用 overlap 来弥补一下