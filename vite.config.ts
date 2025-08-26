import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  plugins: [vue(), vueJsx({})],
  resolve: {
    alias: {
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      '@': path.resolve(__dirname, 'src/')
    }
  },
  server: {
    host: '0.0.0.0'
  },
  build: {
    // 处理Cesium的大文件
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {}
    }
  }
})
