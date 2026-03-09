<script setup lang="ts">
import { ref } from 'vue';
import defaultCameraImg from '../assets/camera.png';
import voiceIcon from '../assets/voice.png';

const imgPreview = ref(defaultCameraImg);

const props = defineProps({
  word: {
    type: String,
    default: ''
  },
  audio: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['updateImage']);

const updateImageDate = async (e: Event): Promise<any> => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  return new Promise((resolve, reject) => {
    // 多模态需要的base64编码
    const reader = new FileReader();
    // 读取文件内容，转换为 base64 编码的字符串，异步的
    reader.readAsDataURL(file);
    // 读完后会触发 onload 事件
    reader.onload = () => {
      const data = reader.result as string;  // 读取结果，类型断言
      imgPreview.value = data;               // 更新预览图（<img :src="imgPreview"> 会显示）
      emit('updateImage', data);             // 把 base64 传给父组件
      resolve(data);                         // Promise 成功完成
    }
  })
}

const playAudio = () => {
  const audio = new Audio(props.audio);
  audio.play();
}
</script>

<template>
  <div class="card">
    <input type="file" id="selecteImage" class="input" accept="image/*" @change="updateImageDate">
    <label for="selecteImage" class="upload">
      <img :src="imgPreview" alt="camera" class="img">
    </label>
    <div class="word">
      {{ props.word }}
    </div>
    <div class="playAudio" v-if="props.audio" @click="playAudio">
      <img :src="voiceIcon" alt="play" width="20px" />
    </div>
  </div>
</template>

<style scoped>
#selecteImage {
  display: none;
}

.card {
  border-radius: 8px;
  padding: 20px;
  margin-top: 40px;
  height: 280px;
  box-shadow: rgb(63, 38, 21) 0 3px 0px 0;
  background-color: rgb(105, 78, 62);
  box-sizing: border-box;
}

.upload {
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.word {
  margin-top: 20px;
  font-size: 16px;
  color: rgb(255, 255, 255);
}

.playAudio {
  margin-top: 16px;
}

.playAudio img {
  cursor: pointer;
}
</style>
