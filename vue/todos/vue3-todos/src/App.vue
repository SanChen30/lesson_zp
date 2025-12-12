<template>
   <div>
    <!-- 数据绑定 -->
    <h2>{{ title }}</h2>
    <!-- 双向数据绑定 -->
     <!-- @ 是 v-on: 的简写语法，用于监听 DOM 事件。 -->
      <!-- @event-name.enter 是监听键盘事件，按下 enter 键时调用 addTodo 函数 -->
    <input type="text" v-model="title" @keydown.enter="addTodo">
    <!-- 条件渲染指令 v-if -->
     <!-- 只有当 todos 数组非空（即长度大于 0）时，才渲染 <ul> 元素及其子内容。 -->
    <ul v-if="todos.length">
      <!-- key 唯一属性 -->
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.done">
        <!-- : 是 v-bind: 的简写语法，用于绑定元素的属性。 -->
         <!-- vue 会根据 todo.done 的值，动态添加或移除 done 类名 -->
        <span :class="{done: todo.done}">{{ todo.title }}</span>
      </li>
    </ul>
    <div v-else>
      <span>暂无任务</span>
    </div>
    <div>
      <!-- 全选复选框 -->
      全选<input type="checkbox" v-model="allDone">
      <!-- {{ 数据绑定 表达式结果绑定 }} -->
      <!-- 过滤出未完成的任务数量 --> 
      <!-- {{ todos.filter(todo => !todo.done).length }} -->
      {{ active }}
      /
      {{ todos.length }}
    </div>
   </div>
</template>

<script setup>
// 业务是页面上要动态展示标题，且编辑标题
// vue focus 标题数据业务，修改数据，余下的 DOM 更新 vue 替我们做了
// setup 函数，vue 3 新特性，组件初始化时调用，只调用一次
// vue3 composition 组合式 API
// vue2 options API 选项式 API
import { ref, computed } from 'vue'
// 响应式数据
const title = ref("");
const todos = ref([
  {
    id: 1,
    title: '睡觉',
    done: true
  },
  {
    id: 2,
    title: '吃饭',
    done: false
  }
]);

// 创建一个响应式的计算属性
// 当 todos 中任意一项的 done 状态发生变化时，active 会自动更新，依赖于 todos 的响应数据
// 形式上是函数（计算过程），计算结果是一个响应式数据
// computed 有缓存，性能优化，只有 todos 变化时才会重新计算
const active = computed(() => {
  return todos.value.filter(todo => !todo.done).length
})

const addTodo = () => {
  // focus 数据业务
  if(!title.value) return;
  todos.value.push({
    id: todos.value.length + 1,
    title: title.value,
    done: false
  });
  // 清空输入框
  title.value = '';
}

// 这是 computed 的对象形式（带 get 和 set），而非常见的函数形式（只读）,它让 allDone 不仅可以读取值，还能被赋值，并触发自定义逻辑。
const allDone = computed({
  get() {
    return todos.value.every(todo => todo.done)
  },
  set(value) {
    todos.value.forEach(todo => todo.done = value)
  }
})
</script>

<style>
  .done {
    color: gray;
    text-decoration: line-through;
  }
</style>