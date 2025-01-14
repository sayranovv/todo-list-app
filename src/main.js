import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { MdClose } from "oh-vue-icons/icons";

addIcons(MdClose);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#app");
