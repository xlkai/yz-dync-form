import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'

import YzDyncForm from '../src/index.js'

import 'element-ui/packages/theme-chalk/lib/index.css'
import '../packages/styles/src/index.scss'

Vue.use(Element)
Vue.use(YzDyncForm)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
