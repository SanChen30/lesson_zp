# AI 应用之冰球

## 前端应用 vue3

- 活动型的应用

冰球协会，上传宠物照片，生成冰球运动员的形象照片。有趣，分享到朋友圈

- vue 主要手机表单数据
- ai 能力 通过调用 coze 的工作流的 api 实现

## 数据业务

1. 上传文件的预览图

好的用户体验，图片可能很大，上传需要些时间，预览图可以让用户知道在干什么

数据状态（值和改变）

img :src="imgPreview"

给img的src属性绑定响应式的对象

Filereader -> readAsDataURL -> onload

google 推出了 base64 编码，可以将图片转换为字符串

:属性名	单向绑定任意属性/prop

v-model 用于「双向绑定表单数据」 → 关注 值（value）

ref 用于「直接操作 DOM 元素」 → 关注 元素本身（element）
浏览器禁止 JavaScript 设置 <input type="file"> 的 value
所以 v-model 无法实现“写入”，双向绑定失去意义
正确做法：
用 ref 拿到 DOM 元素 → 用于程序控制
用 @change 监听选择 → 读取文件内容

特性	          v-model（数字输入）	        ref（文件输入）
目的	           绑定输入的值	                操作 DOM 元素
能否读取值	     uniform_number.value	      通过 @change 事件
能否设置值	         直接赋值	               不能设 value，但可清空（dom.value = ''）
是否双向绑定	       是	                  否（单向：DOM → JS）
典型操作	        读/写数值	              点击、清空、获取 File 对象