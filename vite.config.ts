import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({})],
  resolve: {
    alias: {
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      '@': path.resolve(__dirname, 'src/')
    }
  },
  server: {
    proxy: {
      '/JJ': {
        target: 'https://api.juejin.cn',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/JJ/, '')
      }
    }
  }
})
