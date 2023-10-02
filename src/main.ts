import {createApp} from 'vue'
import './style.css'
// @ts-ignore
import App from './App.vue'
import {createPinia} from 'pinia'
import vuetify from './plugins/vuetify'
import router from './router'


// // Vuetify
// import 'vuetify/styles'
// import {createVuetify} from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
// import '@mdi/font/css/materialdesignicons.css'
// import {aliases, mdi} from 'vuetify/iconsets/mdi'
//
// const vuetify = createVuetify({
//     components,
//     directives,
//     icons: {
//         defaultSet: 'mdi',
//         aliases,
//         sets: {
//             mdi,
//         },
//     },
// })

const pinia = createPinia()

createApp(App).use(vuetify).use(pinia).use(router).mount('#app')
