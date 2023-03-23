import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
