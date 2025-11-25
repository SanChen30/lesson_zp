# JS 怎么监听事件

<!-- 1. 事件是怎么发生的

1) 捕获阶段 capture

从 document 开始，逐级向下查找，直到目标元素。

child 节点添加了click 事件的监听，是目标元素。
parent 节点也添加了click 事件的监听，但是不会执行。

2) 目标阶段 event.target 

在目标元素上执行事件处理函数。

3) 冒泡阶段 bubble

从目标元素开始，逐级向上冒泡，执行所有添加的事件处理函数。

决定谁先执行，是根据事件处理函数的添加顺序，先添加的先执行。 -->

1. 事件是怎么发生的？

在 DOM 中，当一个事件（比如点击）被触发时，浏览器会按照三个阶段来处理这个事件：捕获阶段 → 目标阶段 → 冒泡阶段。

（1）捕获阶段（Capture Phase）
起点：从最外层的 document 开始。
过程：事件向下“穿透”，依次经过祖先元素（如 html → body → parent …），直到到达目标元素。
关键点：
如果某个祖先元素（比如 parent）在添加事件监听器时指定了使用捕获阶段（即 addEventListener('click', handler, true) 或 { capture: true }），那么它的回调函数会在这一阶段执行。
如果只是普通地添加监听（默认是冒泡阶段），那么在捕获阶段不会执行。
在你的例子中，虽然 parent 有 click 监听器，但因为是默认（冒泡模式），所以在捕获阶段不会触发。
✅ 所以你说“parent 节点也添加了 click 事件的监听，但是不会执行”——这是对的，前提是它没有开启捕获模式。

（2）目标阶段（Target Phase）
位置：事件到达实际被点击的元素（即 event.target）。
行为：无论监听器是用捕获还是冒泡方式添加的，只要绑定在目标元素上，都会在这个阶段执行。
顺序：按添加顺序执行。先加的先执行，后加的后执行。
✅ 例如，如果 child 上先后添加了两个 click 监听器，那么先注册的那个会先运行。

（3）冒泡阶段（Bubble Phase）
起点：从目标元素（child）开始。
过程：事件逐级向上传播，经过父元素（parent → body → html → document）。
关键点：
只有那些以默认方式（或显式指定 { capture: false }）添加的监听器才会在此阶段触发。
祖先元素（如 parent）如果有这样的监听器，就会被执行。
执行顺序同样遵循添加顺序：同一个元素上先添加的先执行；不同元素则按从内到外的结构顺序（child → parent → grandparent…）。
✅ 所以你说“从目标元素开始，逐级向上冒泡，执行所有添加的事件处理函数”——这是正确的，但要强调：仅限于冒泡模式注册的监听器。

补充说明：如何控制阶段？

使用 addEventListener 的第三个参数：

```js
element.addEventListener('click', handler, true); // 捕获阶段触发
element.addEventListener('click', handler, false); // 冒泡阶段触发（默认）
element.addEventListener('click', handler, { capture: true }); // 现代写法
```

总结流程示例（child 被点击）：

假设结构：document → parent → child
parent 添加了默认 click 监听（冒泡）
child 添加了默认 click 监听

事件流顺序：
1. 捕获阶段：document → parent → （到 child 前停止，因未开启捕获监听，无回调执行）
2. 目标阶段：执行 child 上的所有 click 监听器（按添加顺序）
3. 冒泡阶段：执行 parent 上的 click 监听器 → 继续向上传播（如 body 等）


## 事件机制

1. JS核心特征事件机制

2. JS事件是异步的

1) 先注册

.addEventListenter() 方法添加事件监听器时，事件处理函数会被注册到事件队列中。

DOM 0 DOM 2 只是不同阶段的事件处理机制。

dom 节点上 

DOM 0级事件，在HTML元素上直接添加事件处理函数，如 onclick="console.log('body click')"。模块化不好，不推荐

DOM 2级事件，.addEventListener('click', function(){
    console.log('click');
})

2) 触发时才会执行

addEventlistener(event_type,callback,useCapture)

useCapture 可选参数，默认false，冒泡阶段执行。如果设置为true，事件处理函数会在捕获阶段执行。

event.stopPropagation(); //停止冒泡，阻止事件继续向上传播。


事件监听不可以在集合上，一定得是单个dom节点上添加事件监听。

事件监听开销大，因为每个事件监听都会占用内存。因此可以使用事件委托，将事件监听添加到父元素上，通过事件冒泡机制，实现对子元素的事件监听。


## 事件委托

```html
<ul id="list">
<li>苹果</li>
<li>香蕉</li>
<li>橙子</li>
</ul>
```

### event 是什么？

event 是浏览器自动传入事件处理函数的事件对象（Event Object），它包含了与当前事件相关的所有信息。

在这个例子中，event 是一个 MouseEvent 对象（因为是 click 事件），它有很多属性和方法，其中最关键的是：

**event.target**
表示实际触发事件的元素（即用户真正点击的那个 DOM 元素）。
不管事件监听器绑定在哪个祖先元素上，event.target 始终指向最内层被点击的元素。

监听器绑定在 <ul id="list"> 上；
但当你点击某个 <li> 时，由于事件冒泡，click 事件会从 <li> 冒泡到 <ul>，从而触发监听器；
此时 event.target 就是那个被点击的 <li> 元素；
所以 event.target.innerHTML 就是 "苹果"、"香蕉" 或 "橙子"。

### 为什么这样做？——事件委托的优势

你提到：“n个 li 事件节省为一个事件监听”，这正是事件委托（Event Delegation） 的核心思想：

传统方式                             事件委托方式
给每个 <li> 单独加监听器（n 个）        只给 <ul> 加一个监听器（1 个）
动态添加的 <li> 需要重新绑定            新增的 <li> 自动生效（无需额外操作）
内存占用高、性能差                     内存少、性能好、易维护

### 其他常用 event 属性（补充）

属性                        说明
event.currentTarget         当前绑定监听器的元素（这里是 <ul id="list">）
event.target                实际被点击的元素（比如 <li>）
event.type                  事件类型，如 'click'
event.stopPropagation()     阻止事件继续冒泡
event.preventDefault()      阻止默认行为（比如链接跳转）

