import Vue from 'vue'
import App from './App.vue'

import { VueCronEditorPlugin } from '../lib'
Vue.use(VueCronEditorPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import '@tenrok/bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
