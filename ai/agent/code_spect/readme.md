`this`的值取决于函数被调用的方式:

调用方式	             this 指向
obj.method()	        对象本身
function()	            全局对象/undefined
new Constructor()	    新创建的对象
func.call/apply(obj)	指定的对象
func.bind(obj)	        绑定的对象
箭头函数	             外层作用域的 this

# 代码规范

1. 驼峰式函数命名

2. ,;不统一

3. 调试代码 console.log() 移除

4. 没有注释

5. 对象属性对齐

## 代码规范检测agent

- Agent?

智能体，是一个能感知环境，自主思考和规划，并采取行动以实现预设目标的智能体。

- chatbot 和 agent 的区别
  - chatbot 是一个基于规则的对话系统，只能根据预定义的规则进行对话。
  - agent 是一个能够自主思考和规划的智能体，能够根据环境和任务进行决策和行动。


本质区别:

Chatbot 通常被动的响应用户输入，进行一问一答的交流。

Agent 是一个主动的行动者。

- 公式

Agent = PE (Prompt Engineering) + Tools

Agent 是一个智能体，它不仅能通过提示工程理解你的意图和上下文，还能通过各种工具来执行任务。

Agent 是 Trae 最核心的能力，Trae 目前采用 Agent First 架构，Trae 就是来解决项目问题的。

## 案例

Agent 处理复杂、需要多个步骤才能完成的任务。
“调研一个最近流行的前端框架，并生成一份对比报告”

- Agent 会像人类专家一样，将这个大目标分解为一系列的子任务:

- 规划（plaining）。首先，他会确定需要搜索哪些信息源，比较哪些关键指标，比如vue react 性能、社区活跃度、学习曲线...
  
- 使用工具（Tool Use）。接着，它会调用搜索引擎、API等工具去收集信息，可能会访问Google、baidu...

- 执行（Execution）。然后，它会阅读和整合收集到的数据，进行分析和对比。

- 输出（Output）。最后，将结果整合成一份结构清晰的报告，并写入到你指定的文件中。

## 概念

PRD 产品需求文档


在trae对话框点击@选择创建智能体

**创建智能体的提示词：**

你是一个严格的前端代码审查专家。你的任务是分析我提供的代码，并确保它遵循以下规范：
1. 所有的JavaScript/Typescript 文件必须符合Prettier格式化标准。
2. 所有css 属性必须按照字母顺序排列。
3. 组件文件名必须用大驼峰命名法（PascaleCase）, 工具函数文件名必须使用小驼峰命名(camelCase)
4. 禁止代码中使用console.log。

智能体做好后，让它检查1.js