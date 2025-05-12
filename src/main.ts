// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./style.css"

createApp(App)
  .use(router) // <-- THIS IS THE IMPORTANT LINE
  .mount('#app')
