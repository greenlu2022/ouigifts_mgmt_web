import {createApp} from 'vue'
import './style.css'
// @ts-ignore
import App from './App.vue'
import {createPinia} from 'pinia'
import vuetify from './plugins/vuetify'
import router from './router'

import Vuelidate from '@vuelidate/core'

const pinia = createPinia()

createApp(App).use(vuetify).use(pinia).use(router).use(Vuelidate).mount('#app')
