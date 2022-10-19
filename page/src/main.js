import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import {
  loadFonts
} from './plugins/webfontloader'
import {
  createVuetify
} from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import store from '@/store'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

loadFonts()

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(router)
  .use(vuetify)
  .use(store)
  .mount('#app')