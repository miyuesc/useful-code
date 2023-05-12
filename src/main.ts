import { createApp } from 'vue'
import App from './App.vue'

import '@/assets/styles/normalize.css'

import '@/assets/styles/global.scss'
import '@/assets/styles/translations.scss'

import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'

const app = createApp(App)

import i18n from '@/i18n'
app.use(i18n)

import router from './router'
app.use(router)

app.mount('#app')
