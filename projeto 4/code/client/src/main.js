import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import vuetify from './vuetify'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'

// Crie a instância do Pinia primeiro
const pinia = createPinia()
const app = createApp(App)

// Use o Pinia antes de qualquer outro plugin que possa usar stores
app.use(pinia)
// Depois os outros plugins
app.use(vuetify)
app.use(router)

app.mount('#app')
