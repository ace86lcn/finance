import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// iconfont
import '@/assets/iconfont/iconfont.css'

// style
import '@/assets/scss/reset.scss'

// element-ui
import './plugins/element.js'
// 自定义message弹窗
import message from '@/utils/validate'
Vue.prototype.$msg = message
import '@/assets/scss/element-variables.scss'

// request，封装axios
import request from './utils/request'
Vue.prototype.$http = request

// api
import api from './api'
Vue.prototype.$api = api

Vue.config.productionTip = false

// 公共组件
Vue.component('HandleDialog', () => import('@/components/HandleDialog'))
Vue.component('Pages', () => import('@/components/Pages'))
Vue.component('Search', () => import('@/components/Search'))

// 过滤器
import filters from './filters/filters'
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// 指令
// import importDirective from './directive/directive'
// importDirective(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
