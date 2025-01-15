import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { router } from './router.js'
import { createPinia } from 'pinia'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { MdClose, MdLogout } from 'oh-vue-icons/icons'

addIcons(MdClose, MdLogout)

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.component('v-icon', OhVueIcon)
app.mount('#app')
