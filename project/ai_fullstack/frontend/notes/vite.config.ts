import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// node 需要单独添加类型声明文件
import path from 'path' // node 的内置模块
import {
  viteMockServe
} from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  // 插件
  plugins: [
    react(),
    tailwindcss(),
    viteMockServe({ 
      mockPath: 'mock'
    }),
  ],

  "resolve": {
    // 路径别名
    alias: {
      // __dirname：Node.js 内置变量，表示当前配置文件所在的目录（通常是项目根目录）。
      // 配置路径别名，@ 指向 src 目录
      '@': path.resolve(__dirname, 'src'),
    }
  }
})