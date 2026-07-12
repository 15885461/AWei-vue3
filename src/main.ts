import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { hasPermiDirective } from '@/directives/permission'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('has-permi', hasPermiDirective)

app.mount('#app')
