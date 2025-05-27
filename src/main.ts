import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


// Vue Toast
import Toast, { type PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 10,
  newestOnTop: true,
  position: POSITION.BOTTOM_RIGHT,
  containerClassName: 'toast-container',
  bodyClassName: 'toast-body',
  toastClassName: 'toast',
  icon: false,
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, options)

app.mount('#app')

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (token && (to.path === "/")) {
    next("/support");
  } else if (!token && to.path !== "/") {
    next("/");
  } else {
    next();
  }
});
