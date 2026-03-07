<script setup lang="ts">
// composition api 组合式 API
import PictureCard from './components/PictureCard.vue';
import { ref } from 'vue';
const word = ref('请上传图片');
const audio = ref('');
const update = async (imageDate: string) => {
  console.log(imageDate);
}
const submit = (imageData: string) => {
  console.log(imageData);
}
</script>

<template>
  <div class="container">
    <PictureCard :word="word" :audio="audio" @update-image="submit" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  font-size: .85rem; /* 相对于根元素的1rem */
  background: linear-gradient(180deg, rgb(235, 189, 161) 0%, rgb(71, 49, 32) 100%);
}
</style>
