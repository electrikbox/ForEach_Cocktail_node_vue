import './assets/main.scss'

import App from './App.vue'
import Toast, { POSITION } from 'vue-toastification'
import { router } from './router/router'
import { createApp } from 'vue'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

const toastOptions = {
  position: POSITION.BOTTOM_CENTER,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
};

app.use(router)
app.use(Toast, toastOptions)
app.mount('#app')
