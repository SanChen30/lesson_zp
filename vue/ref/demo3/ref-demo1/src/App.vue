<script setup>
import{ ref, onMounted } from 'vue'; // 响应式API，将数据包装成响应式对象
// 数据
const users = ref([]);

onMounted(() => {
  console.log('页面已经挂载完成');
  fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(data => {
    users.value = data;
  })
})

setTimeout(() => {
  users.value.push({
    id: 4,
    name: '赵六',
    email: '485@qq.com'
  })
}, 2000)


</script>



<template>
<table>
  <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>email</th>
    </tr>
  </thead>
  <tbody>
<!-- :key="user.id" 是什么？	Vue 的特殊属性，为 v-for 列表项提供唯一标识
为什么需要它？	让 Vue 能精确追踪每个元素的身份，提升性能并避免状态 bug
可以不用吗？	技术上可以，但强烈不建议（官方文档明确要求）
用什么当 key？	唯一、不变的 ID（如数据库主键），不要用 index -->
    <tr v-for="user in users" :key="user.id">
      <td>{{ user.id }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
    </tr>
  </tbody>
</table>
</template>

<style scoped>

</style>
