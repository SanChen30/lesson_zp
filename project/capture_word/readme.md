# 拍照记单词

## AI时代
- vibe coding
  代码和项目开发变得快速且靠谱

- opc
  one person company 一人公司
    创意、规划、商业、共情
    AI产品经理

## 单词类APP
- 市场调研
- 百词斩
  细分领域 背单词
  单词和形象的图片结合
  awkward 尴尬的
  giraffe 长颈鹿
- 扇贝
  智能间隔重复算法
  精准规划复习时间，确保单词在即将遗忘时被强化，长期记忆

## 大模型
- 互联网所有的产品值得用AI重新做一遍
  - AIGC 
  - Agent
- 拍照记单词
  - 多邻国
  - 产品点？
  - 需求 
      开发需求
  - 场景
      跨国生活、旅游、点餐，不是专业性学习，而是日常使用
  - 痛点
      足够痛，强需求

## 产品原型
- 上传图片/拍照
- 调用 kimi 接口，解析图片，得到单词和例句
- 点击播放按钮
- 最核心功能的表达，怎么交互的，有哪些页面

## 设计稿

## 技术调研

### 大模型
- 多模态模型 kimi-shot
  moonshot-v1-8k-vision-preview
- tts 文本转语音 text to speech

### 技术栈
- 前端 vue3 + ts
- 后端 nestjs

## 开发

### 产品亮点

- 无障碍访问
  label for + input#id
  帮助使用读屏器的盲人使用
  input[type="file"] 比较难控制样式
  display: none，for id 样式控制