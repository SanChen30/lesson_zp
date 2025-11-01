# coze logo 生成

1. 选择合适的模型
   dalle-e-3

2. 编写 prompt
   prompt

3. bootstrap 3.3.0 样式库

4. .container 代表PC端的容器，宽度固定，居中显示

5. .form-group 代表表单组，每个表单元素都包裹在一个.form-group中
   
## HTML5 Form 表单

1. **document.forms** 是一个 集合（HTMLCollection），它包含了当前 HTML 文档中所有的 <form> 元素。你可以把它想象成一个类似数组的对象，里面按顺序存放了页面上每一个表单。可以通过索引或`name`属性来访问具体的表单元素。

```js
// 选择 name 为 loginForm 的表单元素
document.forms['loginForm']

// 选择 name 或 id 为 registerForm 的表单元素
// 优先匹配 name 属性，如果没有 name，则尝试 id
document.forms.registerForm
```
       
**`this["title"].value`**是JavaScript中获取表单元素值的一种方式。

1) `this`：在事件监听器函数中，`this`指向触发事件的表单元素（即form元素）

2) `["title"]`：这是使用方括号语法访问表单元素的属性。在HTML表单中，
   
   所有具有name属性的输入控件都会成为表单对象的属性，名称就是name属性的值。

   - 这里通过`this["title"]`获取表单中name="title"的输入元素

   - 这等同于使用点语法`this.title`，但方括号语法在某些情况下更灵活

3) `.value`：这是访问输入元素当前值的属性。对于input元素，value属性包含用户输入的文本内容。
        
4. 给必填字段添加`required`属性

5. 给每个表单元素添加`placeholder`属性，提示用户输入，提高表单的可读性

6. 给提交按钮添加`id`属性，方便后续的事件绑定

7. `label`的`for`属性要与`input`的`id`属性对应，这样点击label时，会自动聚焦到对应的输入框，为了盲人，大厂需要无障碍访问

8. 点击按钮触发提交事件，提交表单数据

9.  form 默认提交到 action 对应的 URL

10. event.preventDefault() 阻止表单默认提交

## apifox

## AIGC LLM 的本质
1. node openai completions

2. LLM 发起的**API**接口调用

1) POST 请求

apiKey 会加密