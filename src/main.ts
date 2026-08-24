import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// main.css
import './assets/main.css'
import './assets/main.js'
import 'virtual:svg-icons-register'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
