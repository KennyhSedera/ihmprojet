import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './route/routes'
import 'moment/locale/fr'

Vue.config.productionTip = false


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
