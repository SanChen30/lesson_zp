# Ollama

- 闭源模型

OpenAI 5.1
Claude 代码生成
Gemini 3.0+
Deepseek
Qwen

- 开源模型

ollama 是一个用于运行和管理本地模型的工具。羊驼
Deepseek
Qwen

ollama 可以帮助我们部署本地开源模型

- 参数规模
  ollama 可以将开源模型部署到本地 硬件要求
  - 内存：至少 16GB 内存
  - 显存：至少 4GB 显存（如果使用 GPU）
  - 处理器：支持 Intel 或 AMD 处理器

选择一个开源模型，云端部署，需要配服务器和算力资源

- 面向企业的一些AI服务安全问题

 - 将设计稿给LLM，生成前端代码
 - cursor，整个代码都上传

- 如何解决AI安全问题？

1. 使用自家AI产品或模型
2. 自己部署大模型，将开源模型部署在自己的电脑里


## ollama

ollama 是一个本地部署大模型的工具

```shell
# 查看ollama版本
- ollama --version  
# 拉取qwen2.5:0.5b模型
- ollama pull qwen2.5:0.5b 
# 查看已拉取的模型
- ollama list 
# 运行qwen2.5:0.5b模型
- ollama run qwen2.5:0.5b 

- ollama pull dengcao/Qwen3-Embedding-8B:Q4_K_M
```
127.0.0.1:11434 是ollama 开源大模型API服务的默认地址

## ollama-chat

**pnpm i axios**

