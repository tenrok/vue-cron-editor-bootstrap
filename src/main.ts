import Vue from 'vue'
import App from './App.vue'

import VueCronEditorBootstrap from '../lib'
Vue.use(VueCronEditorBootstrap)

import { BFormInput } from '@tenrok/bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import '@tenrok/bootstrap-vue/dist/bootstrap-vue.css'
Vue.component('BFormInput', BFormInput)

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
}).$mount('#app')
